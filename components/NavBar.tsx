import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100">
      <Link href="/">Home</Link>
      <Link href="/jobs">Jobs</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
      <Link href="/company/post-job">Post Job</Link>
    </nav>
  );
}
