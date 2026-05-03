interface InstagramEmbeds {
  process(): void;
}

interface Window {
  instgrm?: {
    Embeds: InstagramEmbeds;
  };
}
