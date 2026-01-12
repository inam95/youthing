"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

import { StudioUploader } from "./studio-uploader";

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
    <>
      <ResponsiveModal
        open={!!createVideo.data?.url}
        onOpenChange={() => createVideo.reset()}
        title="Upload Video"
      >
        {createVideo.data?.url ? (
          <StudioUploader endpoint={createVideo.data?.url} onSuccess={() => {}} />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </ResponsiveModal>
      <Button
        variant="secondary"
        onClick={() => createVideo.mutate()}
        disabled={createVideo.isPending}
      >
        {createVideo.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
        Create
      </Button>
    </>
  );
}
