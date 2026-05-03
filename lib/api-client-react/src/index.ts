export * from "./generated/api";
export * from "./generated/api.schemas";
export { setBaseUrl, setAuthTokenGetter } from "./custom-fetch";
export type { AuthTokenGetter } from "./custom-fetch";
export type { ServiceValue, CategoryValue, LeadStatusValue, RoleValue, InstagramSectionValue } from "@workspace/api-zod";
export { SERVICE_VALUES, CATEGORY_VALUES, LEAD_STATUS_VALUES, ROLE_VALUES, INSTAGRAM_SECTION_VALUES } from "@workspace/api-zod";
