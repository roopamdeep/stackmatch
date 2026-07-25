"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobCard({ job, role }: { job: any; role?: string }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600 mt-1">
        {job.company.name} • {job.location}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">
        {job.stack.map((tech: string) => (
          <span key={tech} className="bg-gray-100 px-3 py-1 rounded text-sm">
            {tech}
          </span>
        ))}
      </div>

      {job.salary && <p className="text-gray-600 mt-3 text-sm">{job.salary}</p>}

      <div className="flex gap-3 mt-5">
        <Link href={`/jobs/${job.id}`}>
          <button className="bg-black text-white px-4 py-2 rounded">
            View Job
          </button>
        </Link>
        {role === "COMPANY" && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
