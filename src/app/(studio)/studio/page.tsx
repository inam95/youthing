import { PAGINATION_DEFAULT_LIMIT } from "@/constants";
import { StudioView } from "@/modules/studio/ui/views/studio-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions({ limit: PAGINATION_DEFAULT_LIMIT })
  );

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}
