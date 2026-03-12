export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-10">
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
    </main>
  );
}
