function ThingsToDo() {
  const sections = [
    { title: 'London', count: 3 },
    { title: 'Toledo', count: 3 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-wine text-center mb-12">
        Things to Do
      </h1>

      {sections.map((section) => (
        <div key={section.title} className="mb-14 last:mb-0">
          <h2 className="font-serif text-2xl md:text-3xl text-wine mb-6">
            {section.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: section.count }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-cream-dark bg-cream overflow-hidden animate-pulse"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-cream-dark" />

                {/* Text placeholders */}
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-cream-dark rounded w-2/3" />
                  <div className="h-3 bg-cream-dark rounded w-full" />
                  <div className="h-3 bg-cream-dark rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ThingsToDo
