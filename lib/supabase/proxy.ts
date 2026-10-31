import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export async function updateSession(request: NextRequest) {
  // 1. Create the response
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Create Supabase client
   const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // 3. Supabase can READ the cookies that came from the browser
        getAll() {
          return request.cookies.getAll();
        },

        // 4. If Supabase refreshes the session,
        //    it gives the new cookies to this function
        setAll(cookiesToSet) {
          // Update the request's copy of the cookies
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // Recreate the response using the now-updated request
          supabaseResponse = NextResponse.next({
            request,
          });

          // Put the refreshed cookies onto the outgoing response
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 4. Check the user's authentication
  const { data: claimsData } = await supabase.auth.getClaims();

if (!claimsData?.claims?.sub) {
  redirect("/login");
}

  // 5. Return the response, including any refreshed cookies
  return supabaseResponse;
}
