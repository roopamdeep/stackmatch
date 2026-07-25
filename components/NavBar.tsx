"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex gap-6 p-4 bg-gray-100">
      <Link href="/">Home</Link>
      <Link href="/jobs">Jobs</Link>
      {isLoggedIn ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/company/post-job">Post Job</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
