import JobCard from "../../components/JobCard";

export default function JobsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">Developer Jobs</h1>

      <div className="grid gap-6">
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </main>
  );
}
