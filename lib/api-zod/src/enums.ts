export const SERVICE_VALUES = ["vip", "wedding", "events"] as const;
export type ServiceValue = (typeof SERVICE_VALUES)[number];

export const CATEGORY_VALUES = ["wedding", "conference", "private", "corporate", "coffee", "vip"] as const;
export type CategoryValue = (typeof CATEGORY_VALUES)[number];

export const LEAD_STATUS_VALUES = ["new", "contacted", "confirmed", "completed", "cancelled"] as const;
export type LeadStatusValue = (typeof LEAD_STATUS_VALUES)[number];

export const ROLE_VALUES = ["user", "admin"] as const;
export type RoleValue = (typeof ROLE_VALUES)[number];
