import Skeleton from "react-loading-skeleton";

export function LoadingDashboard() {
  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:px-6">
      <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Skeleton className="h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
      </section>
      <section className="grid gap-5 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </section>
    </main>
  );
}
