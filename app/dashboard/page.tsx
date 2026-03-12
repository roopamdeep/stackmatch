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
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Resume</h2>
            <p className="text-gray-600 mt-2">Upload your latest resume</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Job Matches</h2>
            <p className="text-gray-600 mt-2">View your recommended jobs</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li>Applied to Frontend Developer at Shopify</li>
            <li>Updated resume yesterday</li>
            <li>Received 3 new job matches</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
