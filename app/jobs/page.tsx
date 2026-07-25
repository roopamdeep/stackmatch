"use client";
import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [stack, setStack] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data.jobs);
      setLoading(false);
    }
    fetchJobs();
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setRole(data.user.role);
      });
  }, []);

  const filtered = jobs.filter((job: any) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase())) &&
      (stack === "" ||
        job.stack.some((s: string) =>
          s.toLowerCase().includes(stack.toLowerCase()),
        ))
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Developer Jobs</h1>
        <p className="text-gray-600 mt-2">
          Explore opportunities matched to modern tech stacks
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="border rounded-lg p-3"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location..."
              className="border rounded-lg p-3"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tech stack..."
              className="border rounded-lg p-3"
              onChange={(e) => setStack(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center mt-8 text.gray-600">Loading jobs...</p>
        ) : (
          <div className="grid gap-6 mt-8">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-600">No jobs found</p>
            ) : (
              filtered.map((job: any) => (
                <JobCard key={job.id} job={job} role={role} />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
