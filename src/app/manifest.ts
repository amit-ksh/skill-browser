import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Skill Browser — WebMCP Skill Registry",
    short_name: "Skill Browser",
    description:
      "Discover, curate, and expose AI skills to browser-based AI agents via WebMCP.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
