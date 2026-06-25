export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-bg-elevated text-text-secondary border border-border",
    accent: "bg-accent/10 text-accent-light border border-accent/20",
  };

  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
