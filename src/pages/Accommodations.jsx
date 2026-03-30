function Accommodations() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-wine text-center mb-4">
        Accommodations
      </h1>

      <p className="text-brown font-sans text-center mb-12">
        Details coming soon...
      </p>

      {/* Skeleton hotel cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-cream-dark bg-cream overflow-hidden animate-pulse"
          >
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-cream-dark" />

            {/* Text placeholders */}
            <div className="p-5 space-y-3">
              <div className="h-5 bg-cream-dark rounded w-3/4" />
              <div className="h-3 bg-cream-dark rounded w-full" />
              <div className="h-3 bg-cream-dark rounded w-5/6" />
              <div className="h-8 bg-cream-dark rounded-full w-1/2 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accommodations
