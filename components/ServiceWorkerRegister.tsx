"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = async () => {
        try {
          const reg = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.onstatechange = () => {
              // Optional: notify user of updates
            };
          };
        } catch (err) {
          console.error("Service worker registration failed:", err);
        }
      };

      if (document.readyState === "complete") register();
      else window.addEventListener("load", register);

      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}