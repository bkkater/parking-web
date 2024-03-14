import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Parking App",
    short_name: "Parking App",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f7",
    theme_color: "#f7f7f7",
    icons: [
      {
        src: "/icon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
  };
}
