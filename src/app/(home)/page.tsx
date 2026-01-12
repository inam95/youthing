import { HomeView } from "@/modules/home/ui/views/home-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    categoryId: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}
