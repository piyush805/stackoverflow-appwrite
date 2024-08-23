"use client";

import { useAuthStore } from "@/store/Auth";
import React from "react";

function LoginPage() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // validate
    if (!email || !password) {
      setError(() => "Please fill out all the fields");
      return;
    }

    // call the store
    setIsLoading(() => true);
    setError("");

    const response = await login(email.toString(), password.toString());
    if (response.error) {
      setError(() => response.error!.message);
    }
    setIsLoading(false);
  };
  return <div>Login Page</div>;
}

export default LoginPage;
