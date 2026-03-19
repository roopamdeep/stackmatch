export default function PostJobPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <p className="text-gray-600 mt-2">
          Create a new job listing for StackMatch
        </p>

        <form className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Job Title"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Company Name"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Location"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Tech Stack (e.g. React, Node.js, PostgreSQL)"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Salary Range"
            className="border rounded-lg p-3"
          />

          <textarea
            placeholder="Job Description"
            className="border rounded-lg p-3 min-h-36"
          />

          <button className="bg-black text-white rounded-lg p-3">
            Post Job
          </button>
        </form>
      </div>
    </main>
  );
}
