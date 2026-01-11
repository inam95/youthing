import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import PageClient from "./client";

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "Inam" }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
