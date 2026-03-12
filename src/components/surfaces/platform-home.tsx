import Link from "next/link";
import { demoTenants } from "@/lib/tenancy/registry";
import type { ResolvedTenantContext } from "@/lib/tenancy/resolve-tenant";

const architecturePillars = [
  "Shared Postgres with tenant_id + RLS",
  "Host-based tenant resolution",
  "Better Auth for back-office admins",
  "Email OTP scaffold for voters",
  "Immutable vote ledger + async aggregates",
  "Cloudflare/OpenNext deployment path",
];

export function PlatformSurfaceHome({
  context,
}: {
  context: ResolvedTenantContext;
}) {
  return (
    <main>
      <section className="gradient-hero grid-lines border-b border-white/10">
        <div className="container-shell py-24">
          <div className="max-w-4xl">
            <p className="eyebrow mb-4">Platform Surface</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
              Multi-tenant voting infrastructure ready for branded client portals.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/88">
              This foundation implements the first platform layer for a multi-tenant voting SaaS:
              tenant-aware hosting, domain contracts, auth scaffolding, schema design, API shapes, and
              the documentation pack needed before full feature delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-foreground)]"
              >
                Open Back Office Shell
              </Link>
              <a
                href="/api/health"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/90"
              >
                View Health Endpoint
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-200/80">
              <span className="accent-chip">Marketing host: {context.marketingHost}</span>
              <span className="accent-chip">Admin host: {context.appHost}</span>
              <span className="accent-chip">Base domain: {context.baseDomain}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {architecturePillars.map((pillar) => (
            <article key={pillar} className="card-surface rounded-3xl p-6">
              <p className="eyebrow mb-3">Foundation</p>
              <h2 className="text-2xl font-semibold">{pillar}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                This is implemented either as running code, an interface contract, or a documented
                architecture decision in the repository.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="card-surface rounded-3xl p-8">
            <p className="eyebrow mb-3">Demo Tenants</p>
            <h2 className="text-3xl font-semibold">Seeded hostnames for local and architecture work</h2>
            <div className="mt-6 grid gap-4">
              {demoTenants.map((tenant) => (
                <div key={tenant.tenantId} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{tenant.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {tenant.slug}.{context.baseDomain}
                      </p>
                    </div>
                    <span className="accent-chip">{tenant.activeCampaign.votingRule.mode}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{tenant.tagline}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="card-surface rounded-3xl p-8">
            <p className="eyebrow mb-3">What Exists Now</p>
            <ul className="space-y-4 text-sm leading-7 text-[var(--muted-foreground)]">
              <li>Tenant-aware root page with host-based surface switching.</li>
              <li>Cloudflare/OpenNext, Wrangler, and R2 incremental cache configuration.</li>
              <li>Drizzle schema for tenancy, campaigns, voting, analytics, fraud, and payments.</li>
              <li>Better Auth server bootstrap and Next.js auth route.</li>
              <li>Working email OTP request/confirm scaffold and in-memory vote submission path.</li>
              <li>Pre-development docs pack under <code>docs/</code>.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
