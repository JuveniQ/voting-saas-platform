import type { DemoTenant } from "@/lib/tenancy/registry";
import type { ResolvedTenantContext } from "@/lib/tenancy/resolve-tenant";
import { isLeaderboardVisible, resolveCampaignPhase } from "@/lib/voting/phase-engine";

export function TenantSurfaceHome({
  context,
  tenant,
}: {
  context: ResolvedTenantContext;
  tenant: DemoTenant;
}) {
  const phase = resolveCampaignPhase(new Date(), tenant.activeCampaign.phaseWindow);
  const leaderboardVisible = isLeaderboardVisible(
    new Date(),
    tenant.activeCampaign.phaseWindow,
    tenant.activeCampaign.votingRule.leaderboardHiddenHoursBeforeClose,
  );

  return (
    <main>
      <section className="gradient-hero border-b border-white/10">
        <div className="container-shell py-24">
          <p className="eyebrow mb-4">Tenant Portal</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">{tenant.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/86">{tenant.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="accent-chip">Surface: {context.surface}</span>
            <span className="accent-chip">Public status: {context.publicStatus}</span>
            <span className="accent-chip">Phase: {phase}</span>
            <span className="accent-chip">Leaderboard visible: {leaderboardVisible ? "yes" : "no"}</span>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="card-surface rounded-3xl p-8">
            <p className="eyebrow mb-3">Campaign Snapshot</p>
            <h2 className="text-3xl font-semibold">{tenant.activeCampaign.name}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Voting mode</p>
                <p className="metric-value">{tenant.activeCampaign.votingRule.mode}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Verification</p>
                <p className="metric-value">{tenant.activeCampaign.votingRule.verificationStrategy}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Categories</p>
                <p className="metric-value">{tenant.activeCampaign.categories.length}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Shortlist size</p>
                <p className="metric-value">{tenant.activeCampaign.votingRule.shortlistSize}</p>
              </div>
            </div>
          </article>

          <article className="card-surface rounded-3xl p-8">
            <p className="eyebrow mb-3">Categories and Nominees</p>
            <div className="space-y-4">
              {tenant.activeCampaign.categories.map((category) => (
                <div key={category.id} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                      {category.nominees.length} nominees
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{category.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.nominees.map((nominee) => (
                      <span
                        key={nominee.id}
                        className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/90"
                      >
                        {nominee.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
