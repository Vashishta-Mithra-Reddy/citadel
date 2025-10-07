"use client";

import { useEffect, useState, useMemo } from "react";
import { useEncryption } from "@/app/providers/EncryptionProvider";
import { decryptData } from "@/lib/crypto";
import VaultItemForm, { VaultItemData } from "@/components/vault/VaultItemForm";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  Pencil,
  CopyIcon,
} from "lucide-react";
import { DeleteVaultButton } from "./DeleteVaultItemButton";
import { motion, AnimatePresence } from "framer-motion";

interface VaultProps {
  encryptedItems: { _id: string; ciphertext: string; iv: string }[];
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
} as const;

export default function Vault({ encryptedItems }: VaultProps) {
  const { encryptionKey } = useEncryption();
  const [decryptedItems, setDecryptedItems] = useState<VaultItemData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<VaultItemData | undefined>(
    undefined,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (encryptionKey) {
      const decryptAll = async () => {
        try {
          const items = await Promise.all(
            encryptedItems.map(async (item) => {
              const decryptedJson = await decryptData(
                item.ciphertext,
                item.iv,
                encryptionKey,
              );
              const decryptedData = JSON.parse(decryptedJson);
              return { ...decryptedData, _id: item._id };
            }),
          );
          setDecryptedItems(items);
        } catch (error) {
          toast.error("Decryption failed. The key may be incorrect.");
          console.error("Decryption error:", error);
        }
      };
      decryptAll();
    }
  }, [encryptionKey, encryptedItems]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    decryptedItems.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [decryptedItems]);

  const filteredItems = useMemo(() => {
    let items = decryptedItems;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      items = items.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const username = item.username?.toLowerCase() || "";
        const url = item.url?.toLowerCase() || "";
        return (
          title.includes(lowerSearch) ||
          username.includes(lowerSearch) ||
          url.includes(lowerSearch)
        );
      });
    }

    if (selectedTag) {
      items = items.filter((item) => item.tags?.includes(selectedTag));
    }

    return items;
  }, [searchTerm, selectedTag, decryptedItems]);

  const handleEdit = (item: VaultItemData) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setItemToEdit(undefined);
    setIsFormOpen(true);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username);
    toast.success("Username copied to clipboard!");
  };

  return (
    <>
      <AnimatePresence>
        {isFormOpen && (
          <VaultItemForm
            itemToEdit={itemToEdit}
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="p-6 rounded-xl border-2 border-dashed border-foreground/20 w-full font-outfit"
      >
        <div className="flex flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Your Vault</h2>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background/90 rounded-xl hover:opacity-90 transition-all cursor-pointer font-medium"
          >
            <Plus size={18} /> Add New Item
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 px-6 bg-card border border-foreground/20 rounded-xl focus:ring-2 focus:ring-foreground/30 focus:border-transparent outline-none transition-all duration-300"
          />
        </div>

        {allTags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-lg cursor-pointer ${
                !selectedTag
                  ? "bg-foreground text-background"
                  : "bg-card border border-foreground/20 hover:bg-foreground/10"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm rounded-lg cursor-pointer ${
                  selectedTag === tag
                    ? "bg-foreground text-background"
                    : "bg-card border border-foreground/20 hover:bg-foreground/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={item._id}
                  className="group bg-card p-6 rounded-2xl border border-foreground/10 hover:shadow-sm transition-shadow duration-300 flex flex-col justify-start will-change-[transform,opacity]"
                >
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xl mb-1 truncate">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <DeleteVaultButton id={item._id!} />
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-blue-500/5 text-blue-500 border border-blue-500/20 rounded-md hover:bg-blue-500/10 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-between gap-2"
                        title="Edit item"
                      >
                        Edit
                        <Pencil size={16} />
                      </button>
                    </div>
                  </div>

                  {item.username && (
                    <div className="flex items-center gap-2 mt-4">
                      <span className="font-mono text-sm bg-background px-2 py-1 rounded-md border border-foreground/10 flex-1 truncate">
                        {item.username}
                      </span>
                      <button
                        onClick={() => handleCopyUsername(item.username!)}
                        className="p-1 hover:opacity-70 cursor-pointer"
                      >
                        <CopyIcon size={18} />
                      </button>
                    </div>
                  )}

                  {item.password && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="font-mono text-sm bg-background px-2 py-1 rounded-md border border-foreground/10 flex-1 truncate">
                        {showPasswords[item._id!]
                          ? item.password
                          : "••••••••••"}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(item._id!)}
                        className="p-1 hover:opacity-70 cursor-pointer"
                      >
                        {showPasswords[item._id!] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyPassword(item.password!)}
                        className="p-1 hover:opacity-70 cursor-pointer"
                      >
                        <CopyIcon size={18} />
                      </button>
                    </div>
                  )}

                  {item.url && (
                    <a
                      href={
                        item.url.startsWith("http")
                          ? item.url
                          : `https://${item.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-500 hover:underline mt-3 overflow-hidden"
                    >
                      <ExternalLink size={14} className="flex-shrink-0" />
                      <span className="truncate">{item.url}</span>
                    </a>
                  )}

                  {item.notes && (
                    <p className="text-sm text-foreground/70 mt-3 line-clamp-2">
                      {item.notes}
                    </p>
                  )}

                  {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-foreground/10 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              className="text-center text-foreground/60 py-6"
            >
              {searchTerm
                ? "No items match your search."
                : "Your vault is empty. Add a new item to get started."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}