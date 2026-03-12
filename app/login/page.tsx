export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p className="text-gray-600 text-center mt-2">
          Access your StackMatch account
        </p>

        <form className="mt-8 flex flex-col gap-4">
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

          <button className="bg-black text-white rounded-lg p-3">Login</button>
        </form>
      </div>
    </main>
  );
}
