export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[18.625rem] items-center border-b border-line bg-surface-2">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-steel-600">
          {children}
        </p>
      </div>
    </section>
  );
}
