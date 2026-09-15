import Link from "next/link";
import type { CompatibilityTier } from "@/data/compatibility";
import { tierOf } from "@/data/compatibility";

const tierClasses: Record<CompatibilityTier, string> = {
  playable: "border-playable/40 bg-playable/10 text-playable",
  ingame: "border-ingame/40 bg-ingame/10 text-ingame",
  intro: "border-intro/40 bg-intro/10 text-intro",
  boots: "border-boots/40 bg-boots/10 text-boots",
};

export function TierBadge({
  tier,
  className = "",
}: {
  tier: CompatibilityTier;
  className?: string;
}) {
  const meta = tierOf(tier);
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tierClasses[tier]} ${className}`}
    >
      {meta.shortLabel}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl" id={id}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-accent-500 text-ink-950 hover:bg-accent-400",
    secondary:
      "border border-ink-600 bg-ink-850 text-ink-100 hover:border-ink-400 hover:bg-ink-800",
    ghost: "text-ink-200 hover:text-accent-400",
  } as const;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Notice({
  tone = "warning",
  title,
  children,
}: {
  tone?: "warning" | "info";
  title: string;
  children: React.ReactNode;
}) {
  const tones = {
    warning: "border-intro/35 bg-intro/[0.07]",
    info: "border-accent-500/35 bg-accent-500/[0.07]",
  } as const;
  return (
    <div className={`rounded-xl border px-5 py-4 ${tones[tone]}`}>
      <p className="text-sm font-semibold text-ink-100">{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-ink-300">
        {children}
      </div>
    </div>
  );
}

export function Stat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="surface px-5 py-5">
      <p className="text-3xl font-semibold tracking-tight text-ink-100">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-ink-200">{label}</p>
      {hint ? <p className="mt-1 text-xs text-ink-400">{hint}</p> : null}
    </div>
  );
}
