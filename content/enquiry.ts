export const SERVICE_VALUES = [
  "business-strategy-advisory",
  "operational-excellence",
  "financial-advisory",
  "digital-transformation",
  "corporate-growth",
] as const;

export type ServiceValue = (typeof SERVICE_VALUES)[number];

export const serviceOptions: ReadonlyArray<{
  value: ServiceValue;
  label: string;
}> = [
  { value: "business-strategy-advisory", label: "Business Strategy & Advisory" },
  { value: "operational-excellence", label: "Operational Excellence" },
  { value: "financial-advisory", label: "Financial & Operational Advisory" },
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "corporate-growth", label: "Corporate Growth & Development" },
];

export function getServiceLabel(value: string) {
  return serviceOptions.find((option) => option.value === value)?.label ?? "General enquiry";
}

export const ENQUIRY_SUCCESS_MESSAGE =
  "Thank you. Your enquiry has been received. A senior advisor will be in touch shortly.";

export const ENQUIRY_ERROR_MESSAGE =
  "We could not send your enquiry. Please email us directly or try again.";

export const ENQUIRY_NETWORK_ERROR =
  "We could not reach the server. Check your connection and try again, or email us directly.";
