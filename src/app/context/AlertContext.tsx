"use client";

import { useAlert as useAlertFromProvider } from "@/components/providers/AlertProvider";

export type AlertType = "success" | "error" | "info" | "warning";

// Re-export the hook from the provider
export const useAlert = useAlertFromProvider;
