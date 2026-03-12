export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to StackMatch</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Profile Status</h2>
            <p className="text-gray-600 mt-2">
              Complete your developer profile
            </p>
            <button className="mt-4 border px-4 py-2 rounded-lg">
              Update Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Resume</h2>
            <p className="text-gray-600 mt-2">Upload your latest resume</p>
            <button className="mt-4 border px-4 py-2 rounded-lg">
              Upload Resume
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Job Matches</h2>
            <p className="text-gray-600 mt-2">View your recommended jobs</p>
            <button className="mt-4 border px-4 py-2 rounded-lg">
              View Matches
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>Applied to Frontend Developer at Shopify</li>
              <li>Updated resume yesterday</li>
              <li>Received 3 new job matches</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold">Recommended Actions</h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>Complete your profile to improve matches</li>
              <li>Add your latest project experience</li>
              <li>Explore remote React roles</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
