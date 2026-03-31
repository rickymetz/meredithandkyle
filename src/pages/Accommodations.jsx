function Accommodations() {
  return (
    <>
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
        <img src="/photos/hero-balcony.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
        <h1 className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 font-serif text-3xl sm:text-4xl md:text-5xl text-wine drop-shadow-sm">
          Accommodations
        </h1>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        <p className="text-brown font-sans text-center leading-relaxed mb-6">
          Here are some hotels that are close to the venues, which are both in Central London.
          The Esquivels will be staying at The Athenaeum Hotel &amp; Residences, but there are many
          options. If you need any suggestions, feel free to reach out.
        </p>
        <p className="text-brown font-sans text-center leading-relaxed mb-12">
          In Spain, we are taking care of accommodation and have booked out the Cigarral de las
          Mercedes for everyone. If you prefer to stay elsewhere in Toledo, please let us know
          so we can inform the hotel and provide recommendations.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-cream-dark bg-cream p-6">
            <div className="flex items-start gap-4">
              <img src="/sketches/5 stoop.png" alt="" className="w-12 h-12 object-contain opacity-40 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-xl text-wine mb-1">The Athenaeum Hotel &amp; Residences</h3>
                <p className="text-brown/60 font-sans text-sm mb-2">London &middot; Special Event Rate available</p>
                <p className="text-brown-light font-sans text-sm leading-relaxed">
                  The Esquivels will be staying here in London. A 15% discount is available for our guests.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-cream-dark bg-cream p-6">
            <div className="flex items-start gap-4">
              <img src="/sketches/2 gardenias.png" alt="" className="w-12 h-12 object-contain opacity-40 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-xl text-wine mb-1">Cigarral de las Mercedes</h3>
                <p className="text-brown/60 font-sans text-sm mb-2">Toledo, Spain</p>
                <p className="text-brown-light font-sans text-sm leading-relaxed">
                  We will all be staying here in Spain! Accommodation is taken care of for all guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Accommodations
