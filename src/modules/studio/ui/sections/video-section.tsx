"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { InfiniteScroll } from "@/components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGINATION_DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";

export function VideoSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <VideoSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
}

function VideoSectionSuspense() {
  const trpc = useTRPC();
  const router = useRouter();

  const query = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      {
        limit: PAGINATION_DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  const onSelect = (videoId: string) => {
    router.push(`/studio/videos/${videoId}`);
  };

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px] pl-6">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="pr-6 text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.data.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <TableRow
                  key={video.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelect(video.id)}
                >
                  <TableCell>{video.title}</TableCell>
                  <TableCell>Visibility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Likes</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
}
