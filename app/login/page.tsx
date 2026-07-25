"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p className="text-gray-600 text-center mt-2">
          Access your StackMatch account
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white rounded-lg p-3"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
