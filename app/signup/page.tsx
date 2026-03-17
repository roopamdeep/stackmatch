"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER",
  });
  const [error, setError] = useState("");

  async function handleSubmit() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-gray-600 text-center mt-2">
          Find your next role or hire top developers
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
          <select
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="DEVELOPER">Developer</option>
            <option value="COMPANY">Company</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-black text-white rounded-lg p-3"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
