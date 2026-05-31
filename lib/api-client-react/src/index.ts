export * from "./generated/api";
export * from "./generated/api.schemas";
export { setBaseUrl, setAuthTokenGetter } from "./custom-fetch";
export type { AuthTokenGetter } from "./custom-fetch";
export type { InquiryStatusValue, ProjectStatusValue, ContentStatusValue, RoleValue } from "@workspace/api-zod";
export { INQUIRY_STATUS_VALUES, PROJECT_STATUS_VALUES, CONTENT_STATUS_VALUES, ROLE_VALUES } from "@workspace/api-zod";
