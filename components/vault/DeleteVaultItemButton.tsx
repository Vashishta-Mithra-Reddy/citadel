"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteVaultItem } from "@/actions/vault-items";

export function DeleteVaultButton({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteVaultItem(id);
      toast.success("Item deleted", {
        description: "The vault item was successfully removed.",
      });
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm bg-red-500/5 text-red-500 border border-red-500/20 rounded-md hover:bg-red-500/10 transition-all duration-300 active:scale-95 cursor-pointer">
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex-col-center py-8">
        <AlertDialogHeader className="flex-center">
          <AlertDialogTitle className="text-xl md:text-2xl">
            Delete this item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The vault item will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-center pt-2">
          <AlertDialogCancel className="cursor-pointer w-full md:w-fit px-6 py-5.5 rounded-xl">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer w-full md:w-fit px-6 py-5.5 rounded-xl"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
