"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    stack: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${params.id}`);
      const data = await res.json();
      if (data.job) {
        setForm({
          title: data.job.title,
          description: data.job.description,
          location: data.job.location,
          stack: data.job.stack.join(", "),
          salary: data.job.salary || "",
        });
      }
      setLoading(false);
    }
    fetchJob();
  }, [params.id]);

  async function handleSubmit() {
    const res = await fetch(`/api/jobs/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        stack: form.stack.split(",").map((s) => s.trim()),
      }),
    });

    if (res.ok) {
      setSuccess("Job updated successfully! ✅");
      setTimeout(() => {
        router.push(`/jobs/${params.id}`);
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <p className="text-gray-600 mt-2">Update your job listing</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mt-2">{success}</p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tech Stack (e.g. React, Node.js)"
            value={form.stack}
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, stack: e.target.value })}
          />
          <input
            type="text"
            placeholder="Salary Range"
            value={form.salary}
            className="border rounded-lg p-3"
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <textarea
            placeholder="Job Description"
            value={form.description}
            className="border rounded-lg p-3 min-h-36"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white rounded-lg p-3"
          >
            Update Job
          </button>
        </div>
      </div>
    </main>
  );
}
