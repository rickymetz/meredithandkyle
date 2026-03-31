function ThingsToDo() {
  const sections = [
    { title: 'London', count: 3 },
    { title: 'Toledo', count: 3 },
  ]

  return (
    <>
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
        <img src="/photos/hero-sitting.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
        <h1 className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 font-serif text-3xl sm:text-4xl md:text-5xl text-wine drop-shadow-sm">
          Things to Do
        </h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
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
    </>
  )
}

export default ThingsToDo
