export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="flex flex-col items-center justify-center text-center p-10 min-h-[80vh]">
        <h1 className="text-5xl font-bold">StackMatch 🚀</h1>

        <p className="mt-4 text-xl text-gray-600 max-w-xl">
          Match developers and companies based on real tech stacks.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Find Jobs
          </button>

          <button className="border px-6 py-3 rounded-lg">Post Jobs</button>
        </div>
      </section>

      <section className="p-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center">Why StackMatch?</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold">Smart Matching</h3>
            <p className="text-gray-600 mt-3">
              Connect developers and recruiters using real tech stack alignment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold">Resume Insights</h3>
            <p className="text-gray-600 mt-3">
              Help candidates present their skills clearly and effectively.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold">Faster Hiring</h3>
            <p className="text-gray-600 mt-3">
              Reduce hiring friction with focused, stack-based discovery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
