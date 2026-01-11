"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export default function PageClient() {
  const trpc = useTRPC();

  const greeting = useSuspenseQuery(trpc.hello.queryOptions({ text: "Inam" }));

  return <div>{greeting.data.greeting}</div>;
}
