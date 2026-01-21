"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20 px-4 max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold text-danger">Oops!</h1>
      <h2 className="text-3xl font-semibold text-default-900">
        Abomination not found
      </h2>
      <p className="text-md text-default-500 max-w-lg">
        The abomination you are looking for does not exist or has been removed.
      </p>
      <a
        href="/abominations"
        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition"
      >
        Back to list
      </a>
    </section>
  );
}
