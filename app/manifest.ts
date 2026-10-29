import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "Shiny Adventures",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f3",
    theme_color: "#0b2238",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
