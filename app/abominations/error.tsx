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
        Failed to load abominations
      </h2>
      <p className="text-md text-default-500 max-w-lg">
        We could not load the abomination data. Please try refreshing the page.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-danger hover:bg-danger-dark text-white font-semibold rounded-lg transition"
        type="button"
      >
        Try Again
      </button>
    </section>
  );
}
