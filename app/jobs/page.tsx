import JobCard from "../../components/JobCard";

export default function JobsPage() {
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
            />

            <select className="border rounded-lg p-3">
              <option>All Locations</option>
              <option>Remote</option>
              <option>Toronto</option>
              <option>Vancouver</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>All Stacks</option>
              <option>React</option>
              <option>Node.js</option>
              <option>Next.js</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 mt-8">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </main>
  );
}
