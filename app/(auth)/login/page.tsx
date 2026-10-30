"use client";
import { createClient } from "@/lib/supabase/client";
import { LoginForm } from "@/components/login/LoginForm";

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

  return <LoginForm onSubmit={handleSubmit} />;
};

export default page;
