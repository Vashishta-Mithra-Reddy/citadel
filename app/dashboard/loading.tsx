"use client";

import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
      <Spinner />
    </div>
  );
}
