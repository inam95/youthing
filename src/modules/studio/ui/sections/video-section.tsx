"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";

export function VideoSection() {
  const trpc = useTRPC();

  const { data } = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      {
        limit: PAGINATION_DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  return <div>{JSON.stringify(data)}</div>;
}
