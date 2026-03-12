const sections = [
  {
    title: "Tenant Ops",
    description: "Campaign CRUD, categories, nominees, rules, media, analytics, and exports.",
  },
  {
    title: "Platform Ops",
    description: "Subscription plans, fraud monitoring, domain onboarding, health, and support tools.",
  },
  {
    title: "Security Posture",
    description: "Better Auth + 2FA, audit events, RLS, signed webhooks, and secret rotation hooks.",
  },
];

export function AppSurfaceHome() {
  return (
    <main className="container-shell py-16">
      <section className="card-surface rounded-[2rem] p-8 md:p-12">
        <p className="eyebrow mb-3">Back Office Surface</p>
        <h1 className="text-4xl font-semibold md:text-6xl">Shared admin shell for platform owners and client admins</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
          The UI foundation is intentionally lightweight for now. The real value already in the repo is the
          surface split, auth bootstrap, domain model, docs pack, and API contracts that will drive the next
          implementation phases.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="card-surface rounded-3xl p-6">
            <p className="eyebrow mb-3">Module</p>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{section.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
