export type ProjectLocalizedText={ar:string;en:string};
export type ProjectLocalizedList={ar:string[];en:string[]};
export type ProjectVisualKind="brand"|"platform"|"campaign"|"commerce"|"launch"|"automation"|"dashboard"|"story";
export type ProjectAssetLayout="wide"|"standard"|"tall";
export type ProjectContentBlocks={overview?:ProjectLocalizedText;challenge?:ProjectLocalizedText;direction?:ProjectLocalizedText;solution?:ProjectLocalizedText;features?:ProjectLocalizedList;journey?:ProjectLocalizedList};
export type ProjectGalleryItem={url:string;label?:ProjectLocalizedText;caption?:ProjectLocalizedText;kind?:ProjectVisualKind;layout?:ProjectAssetLayout};
