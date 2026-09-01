import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Skillspace: Your agent skill library",
    short_name: "Skillspace",
    description:
      "Create a personal library of skills your WebMCP-enabled agents can discover and use.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
