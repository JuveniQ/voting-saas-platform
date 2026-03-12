import type { CSSProperties } from "react";

export interface TenantThemeTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  heroFrom: string;
  heroTo: string;
  fontDisplay: string;
  fontBody: string;
}

export const platformTheme: TenantThemeTokens = {
  background: "#09111f",
  foreground: "#f8fafc",
  card: "rgba(14, 24, 43, 0.9)",
  cardForeground: "#f8fafc",
  muted: "rgba(15, 23, 42, 0.75)",
  mutedForeground: "#94a3b8",
  border: "rgba(148, 163, 184, 0.18)",
  accent: "#f5b83d",
  accentForeground: "#09111f",
  heroFrom: "#0f172a",
  heroTo: "#1d4ed8",
  fontDisplay: "\"Fraunces\", Georgia, serif",
  fontBody: "\"Inter\", \"Segoe UI\", sans-serif",
};

export function toCssVariables(theme: TenantThemeTokens): CSSProperties {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--card": theme.card,
    "--card-foreground": theme.cardForeground,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--border": theme.border,
    "--accent": theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--hero-from": theme.heroFrom,
    "--hero-to": theme.heroTo,
    "--font-display": theme.fontDisplay,
    "--font-body": theme.fontBody,
  } as CSSProperties;
}
