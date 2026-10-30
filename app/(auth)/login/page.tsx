"use client";

import { createClient } from "@/lib/supabase/client";
import { LoginForm } from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const supabase = createClient();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();

    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.user) {
      router.push("/");
    }
  };

  return <LoginForm onSubmit={handleSubmit} error={error} />;
};

export default Page;