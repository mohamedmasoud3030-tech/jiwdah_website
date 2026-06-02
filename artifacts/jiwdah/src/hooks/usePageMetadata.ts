import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

export default function usePageMetadata({ title, description }: PageMetadata) {
  useEffect(() => {
    const resolvedTitle = title === "LENA Digital House" ? title : `${title} | LENA Digital House`;

    document.title = resolvedTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", resolvedTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
  }, [description, title]);
}
