export const INQUIRY_STATUS_VALUES = ["new", "in_progress", "qualified", "closed", "archived"] as const;
export type InquiryStatusValue = (typeof INQUIRY_STATUS_VALUES)[number];

export const PROJECT_STATUS_VALUES = ["draft", "published", "archived"] as const;
export type ProjectStatusValue = (typeof PROJECT_STATUS_VALUES)[number];

export const CONTENT_STATUS_VALUES = ["draft", "published", "archived"] as const;
export type ContentStatusValue = (typeof CONTENT_STATUS_VALUES)[number];

export const ROLE_VALUES = ["user", "admin"] as const;
export type RoleValue = (typeof ROLE_VALUES)[number];
