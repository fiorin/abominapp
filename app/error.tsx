"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20 px-4 max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold text-danger">Oops!</h1>
      <h2 className="text-3xl font-semibold text-default-900">
        Something went wrong
      </h2>
      <p className="text-md text-default-500 max-w-lg">
        An unexpected error occurred. Please try reloading the page or come back
        later.
      </p>
      <Button color="danger" size="lg" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
