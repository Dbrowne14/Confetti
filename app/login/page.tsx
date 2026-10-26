"use client";
import { createClient } from "@/lib/supabase/client";

const page = async () => {
  const supabase = createClient();
  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("data:", data);
console.log("error:", error);
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="email"> Email:</label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password"> Password:</label>
        <input type="text" id="password" name="password" />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default page;
