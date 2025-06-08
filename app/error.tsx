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
    <section className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-danger">Something went wrong</h1>
      <p className="text-default-500 max-w-md">
        An unexpected error occurred. Try reloading the page or coming back
        later.
      </p>
      <Button color="danger" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
