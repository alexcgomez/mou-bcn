import { MetadataRoute } from "next";
import { getMetroLines } from "@/lib/tmb-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/lines`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    // Páginas dinámicas de líneas
    const lines = await getMetroLines();
    const linePages: MetadataRoute.Sitemap = lines.map((line) => ({
      url: `${baseUrl}/lines/${line.code}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...linePages];
  } catch (error) {
    console.error("Error generant sitemap:", error);
    // Si falla, retornar almenys les pàgines estàtiques
    return staticPages;
  }
}
