"use client";

import { useEncryption } from "@/app/providers/EncryptionProvider";
import { encryptData } from "@/lib/crypto";
import { createVaultItem, updateVaultItem } from "@/actions/vault-items";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface VaultItemData {
  _id?: string;
  title: string;
  username: string;
  password?: string;
  url: string;
  notes: string;
  tags: string[];
}

interface VaultItemFormProps {
  itemToEdit?: VaultItemData;
  open: boolean;
  onClose: () => void;
}

export default function VaultItemForm({
  itemToEdit,
  open,
  onClose,
}: VaultItemFormProps) {
  const { encryptionKey } = useEncryption();
  const [isLoading, setIsLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!encryptionKey) {
      toast.error("Vault is locked. Cannot save item.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data: VaultItemData = {
      title: formData.get("title") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      url: formData.get("url") as string,
      notes: formData.get("notes") as string,
      tags:
        (formData.get("tags") as string)
          ?.split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0) || [],
    };

    try {
      const jsonString = JSON.stringify(data);
      const { ciphertext, iv } = await encryptData(jsonString, encryptionKey);

      if (itemToEdit?._id) {
        await updateVaultItem(itemToEdit._id, { ciphertext, iv });
        toast.success("Item updated successfully!");
      } else {
        await createVaultItem({ ciphertext, iv });
        toast.success("Item added to vault!");
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-outfit">
        <DialogHeader>
          <DialogTitle>
            {itemToEdit ? "Edit Vault Item" : "Add New Vault Item"}
          </DialogTitle>
          <DialogDescription>
            Securely store your credentials with encryption.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Required Fields */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Website, Application, etc."
              defaultValue={itemToEdit?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username / Email
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Your username or email"
              defaultValue={itemToEdit?.username}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required={!itemToEdit}
            />
          </div>

          {/* Expandable Optional Section */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowOptional((prev) => !prev)}
              className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 cursor-pointer"
            >
              {showOptional ? (
                <>
                  <ChevronUp size={16} /> Hide optional fields
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show optional fields
                </>
              )}
            </button>

            <AnimatePresence initial={false}>
              {showOptional && (
                <motion.div
                  key="optional-fields"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 mt-4"
                >
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium">
                      URL
                    </label>
                    <Input
                      type="url"
                      id="url"
                      name="url"
                      placeholder="https://example.com"
                      defaultValue={itemToEdit?.url}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any additional notes"
                      defaultValue={itemToEdit?.notes}
                      className="h-16 resize-y"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (comma-separated)
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="work, personal, social"
                      defaultValue={itemToEdit?.tags.join(", ")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
