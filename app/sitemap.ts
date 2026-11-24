import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path || "/", siteConfig.url).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
