import { site } from "@/lib/site";

type Variant = "primary" | "light" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-600 shadow-sm",
  light:
    "bg-white text-ink hover:bg-surface-2",
  outline:
    "border border-white/40 text-white hover:bg-white/10",
};

export default function CallButton({
  children,
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={site.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-display font-semibold uppercase tracking-wide text-[0.95rem] transition-colors ${styles[variant]} ${className}`}
    >
      <PhoneIcon />
      {children ?? "Call for a Quote"}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
