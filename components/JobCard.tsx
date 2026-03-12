export default function JobCard() {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">Frontend Developer</h2>

      <p className="text-gray-600 mt-1">Shopify • Remote</p>

      <div className="flex gap-2 mt-4">
        <span className="bg-gray-100 px-3 py-1 rounded text-sm">React</span>

        <span className="bg-gray-100 px-3 py-1 rounded text-sm">
          TypeScript
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded text-sm">Next.js</span>
      </div>

      <button className="mt-5 bg-black text-white px-4 py-2 rounded">
        View Job
      </button>
    </div>
  );
}
