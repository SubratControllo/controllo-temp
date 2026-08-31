import { useEffect } from "react";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Controllo`;
    const upsert = (selector, attribute, key, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    upsert('meta[name="description"]', "name", "description", description);
    upsert(
      'meta[property="og:title"]',
      "property",
      "og:title",
      `${title} | Controllo`
    );
    upsert(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );
    upsert('meta[property="og:type"]', "property", "og:type", "website");
    const canonicalUrl = `https://controllo.ai${window.location.pathname}`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    let structured = document.head.querySelector("#controllo-structured-data");
    if (!structured) {
      structured = document.createElement("script");
      structured.id = "controllo-structured-data";
      structured.type = "application/ld+json";
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Controllo",
      applicationCategory: "BusinessApplication",
      url: canonicalUrl,
      description,
    });
  }, [title, description]);
  return null;
}
