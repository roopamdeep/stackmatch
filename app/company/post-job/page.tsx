"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    stack: "",
    salary: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.role !== "COMPANY") {
          router.push("/dashboard");
        }
      });
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        stack: form.stack.split(",").map((s) => s.trim()),
      }),
    });

    if (res.ok) {
      setSuccess("Job posted successfully! ✅");
    } else {
      const data = await res.json();
      setError(data.error);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <p className="text-gray-600 mt-2">
          Create a new job listing for StackMatch
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {success && (
          <p className="text-green-600 text-center mt-2">{success}</p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Job Title"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tech Stack (e.g. React, Node.js, PostgreSQL)"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, stack: e.target.value })}
          />
          <input
            type="text"
            placeholder="Salary Range"
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <textarea
            placeholder="Job Description"
            className="border rounded-lg p-3 min-h-36"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white rounded-lg p-3 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </div>
    </main>
  );
}
