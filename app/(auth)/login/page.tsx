"use client";

import { createClient } from "@/lib/supabase/client";
import { LoginForm } from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";

const Page = () => {
  const supabase = createClient();
  const router = useRouter();

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

    if (data.user) {
      router.push("/");
    }
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

export default Page;

