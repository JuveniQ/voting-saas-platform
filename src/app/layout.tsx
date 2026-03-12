import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { platformTheme, toCssVariables } from "@/lib/branding/theme";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

export const metadata: Metadata = {
  title: "Voting SaaS Platform",
  description:
    "Multi-tenant SaaS voting platform foundation for branded awards, competitions, and campaigns.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const resolved = resolveTenant(
    headerStore.get("x-resolved-hostname") ?? headerStore.get("host") ?? "localhost:3000",
  );
  const theme = resolved.tenant?.theme ?? platformTheme;

  return (
    <html lang="en" data-surface={resolved.surface}>
      <body style={toCssVariables(theme)} className="antialiased">
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          {children}
        </div>
      </body>
    </html>
  );
}
