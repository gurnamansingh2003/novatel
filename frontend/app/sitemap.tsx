import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://novatel.in",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/about",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/products",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/partners",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/contact",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/service/consulting",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/service/installation",
      lastModified: new Date(),
    },
    {
      url: "https://novatel.in/service/maintenance",
      lastModified: new Date(),
    },
  ];
}
