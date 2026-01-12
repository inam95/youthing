"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

export function StudioUploadModal() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createVideo = useMutation(
    trpc.videos.create.mutationOptions({
      onSuccess: async () => {
        toast.success("Video created successfully");
        await queryClient.invalidateQueries(trpc.studio.getMany.infiniteQueryFilter());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <Button
      variant="secondary"
      onClick={() => createVideo.mutate()}
      disabled={createVideo.isPending}
    >
      {createVideo.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
      Create
    </Button>
  );
}
