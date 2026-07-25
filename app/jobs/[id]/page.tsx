"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("COMPANY");

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${params.id}`);
      const data = await res.json();
      setJob(data.job);
      setLoading(false);
    }
    fetchJob();

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setRole(data.user.role);
      });
  }, [params.id]);

  async function handleApply() {
    setApplying(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: params.id }),
    });

    if (res.ok) {
      setMessage("Application submitted successfully! ✅");
    } else {
      const data = await res.json();
      setMessage(data.error);
    }
    setApplying(false);
  }

  async function handleDelete() {
    const res = await fetch(`/api/jobs/${params.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/jobs");
    }
  }
  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!job) return <p className="text-center mt-8">Job not found</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <p className="text-sm text-gray-500">Job Details</p>
        <h1 className="text-3xl font-bold mt-2">{job.title}</h1>
        <p className="text-gray-600 mt-2">
          {job.company.name} • {job.location}
        </p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {job.stack.map((tech: string) => (
            <span key={tech} className="bg-gray-100 px-3 py-1 rounded text-sm">
              {tech}
            </span>
          ))}
        </div>

        {job.salary && (
          <p className="text-gray-600 mt-3">Salary: {job.salary}</p>
        )}

        <section className="mt-8">
          <h2 className="text-xl font-semibold">About the Role</h2>
          <p className="text-gray-600 mt-3 leading-7">{job.description}</p>
        </section>

        {job.company.description && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold">About the Company</h2>
            <p className="text-gray-600 mt-3">{job.company.description}</p>
          </section>
        )}

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        <div className="flex gap-4 mt-8">
          {role === "DEVELOPER" && (
            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>
          )}

          {role === "COMPANY" && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Delete Job
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
