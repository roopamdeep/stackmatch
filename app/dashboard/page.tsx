"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userRes = await fetch("/api/auth/me");
      if (!userRes.ok) {
        router.push("/login");
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      const appRes = await fetch("/api/applications");
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData.applications);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.name}!</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Profile Status</h2>
            <p className="text-gray-600 mt-2">Role: {user?.role}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">
              {user?.role === "DEVELOPER"
                ? "My Applications"
                : "Applications Received"}
            </h2>
            <p className="text-gray-600 mt-2">Total: {applications.length}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">
              {user?.role === "DEVELOPER" ? "Resume" : "Post a Job"}
            </h2>
            {user?.role === "DEVELOPER" ? (
              <>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h2 className="text-lg font-semibold">Resume</h2>
                  <p className="text-gray-600 mt-2">
                    Upload your latest resume (PDF only, max 5MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    id="resume-upload"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("resume", file);
                      const res = await fetch("/api/upload/resume", {
                        method: "POST",
                        body: formData,
                      });
                      if (res.ok) {
                        alert("Resume uploaded successfully! ✅");
                      } else {
                        const data = await res.json();
                        alert(data.error);
                      }
                    }}
                  />
                  <button
                    className="mt-4 border px-4 py-2 rounded-lg"
                    onClick={() =>
                      document.getElementById("resume-upload")?.click()
                    }
                  >
                    Upload Resume
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mt-2">Create a new job listing</p>
                <button
                  onClick={() => router.push("/company/post-job")}
                  className="mt-4 border px-4 py-2 rounded-lg"
                >
                  Post Job
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          {user?.role === "DEVELOPER" ? (
            <>
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              {applications.length === 0 ? (
                <p className="text-gray-600 mt-4">No applications yet</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {applications.map((app: any) => (
                    <li key={app.id} className="border rounded-lg p-4">
                      <p className="font-semibold">{app.job?.title}</p>
                      <p className="text-gray-600 text-sm">
                        {app.job?.company?.name}
                      </p>
                      <p className="text-sm mt-1">
                        Status:{" "}
                        <span className="font-medium">{app.status}</span>
                      </p>
                      {app.aiScore && (
                        <p className="text-sm">
                          AI Score:{" "}
                          <span className="font-medium">{app.aiScore}/100</span>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Applications Received</h2>
              {applications.length === 0 ? (
                <p className="text-gray-600 mt-4">
                  No applications received yet
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {applications.map((app: any) => (
                    <li key={app.id} className="border rounded-lg p-4">
                      <p className="font-semibold">{app.developer?.name}</p>
                      <p className="text-gray-600 text-sm">
                        Applied for: {app.job?.title}
                      </p>
                      <p className="text-sm mt-1">
                        Skills:{" "}
                        <span className="font-medium">
                          {app.developer?.skills?.join(", ")}
                        </span>
                      </p>
                      <p className="text-sm mt-1">
                        Status:{" "}
                        <span className="font-medium">{app.status}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
