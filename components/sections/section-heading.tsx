export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-4 md:mb-6">
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
    </header>
  )
}
