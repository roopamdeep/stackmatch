export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-gray-600 text-center mt-2">
          Connect deevelopers and companies based on real tech stacks.
        </p>

        <form className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3"
          />

          <select className="border rounded-lg p-3">
            <option>Developer</option>
            <option>Company</option>
          </select>

          <button className="bg-black text-white rounded-lg p-3">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
