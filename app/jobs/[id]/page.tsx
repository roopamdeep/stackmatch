export default function JobDetailsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <p className="text-sm text-gray-500">Job Details</p>

        <h1 className="text-3xl font-bold mt-2">Frontend Developer</h1>

        <p className="text-gray-600 mt-2">Shopify • Remote</p>

        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="bg-gray-100 px-3 py-1 rounded text-sm">React</span>
          <span className="bg-gray-100 px-3 py-1 rounded text-sm">
            TypeScript
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded text-sm">Next.js</span>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">About the Role</h2>
          <p className="text-gray-600 mt-3 leading-7">
            We are looking for a frontend developer to build modern, scalable
            user interfaces and collaborate closely with design and backend
            teams.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-600 mt-3 space-y-2">
            <li>2+ years of frontend development experience</li>
            <li>Strong knowledge of React and TypeScript</li>
            <li>Experience with modern UI development practices</li>
          </ul>
        </section>

        <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg">
          Apply Now
        </button>
      </div>
    </main>
  );
}
