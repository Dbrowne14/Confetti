import { Header } from "@/components/layout/Header";
import { BirthdayFormProvider } from "@/components/birthdayForm/BirthdayFormProvider";
import { BirthdayFormModal } from "@/components/birthdayForm/BirthdayFormModal";
import { getCircles } from "@/lib/fetches/getCircles";
import { ProfileProvider } from "@/components/profile/ProfileProvider";
import { Profile } from "@/components/profile/Profile";
import { getPeople } from "@/lib/fetches/getPeople";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
{
  redirect;
}

// Shell for the signed-in app: header, nav and the overlays every page can
// open. Routes outside this group (e.g. /login) render without any of it.
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const circles = await getCircles();
  const people = await getPeople();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims?.sub) {
    redirect("/login");
  }

  return (
    // Below lg the nav floats over the bottom of the page; the bottom
    // padding keeps the end of every page clear of it.
    <div className="flex flex-1 flex-col pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-0">
      <BirthdayFormProvider>
        <ProfileProvider>
          <Header />
          <BirthdayFormModal circles={circles} people={people} />
          <Profile circles={circles} people={people} />
          {children}
        </ProfileProvider>
      </BirthdayFormProvider>
    </div>
  );
}
