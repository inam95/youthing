import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export function StudioUploadModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
