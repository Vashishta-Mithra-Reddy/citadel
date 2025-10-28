import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Citadel",
    short_name: "Citadel",
    description: "Your personal vault on the web.",
    start_url: "/",
    // scope: "/",
    // id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0e0d16",
    categories: ["productivity", "security", "utilities"],
    icons: [
      {
        src: '/citadel_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/citadel_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcuts: [
      { name: "Dashboard", short_name: "Dashboard", url: "/dashboard" },
      {
        name: "Password Generator",
        short_name: "Generator",
        url: "/password-generator",
      },
    ],
    // display_override: ["standalone", "minimal-ui"],
  };
}