import { EXTERNAL_LINKS } from '../config/links.js'

function Registry() {
  return (
    <>
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
        <img src="/photos/hero-street.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
        <h1 className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 font-serif text-3xl sm:text-4xl md:text-5xl text-wine drop-shadow-sm">
          Registry
        </h1>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
      <p className="text-brown font-sans text-center leading-relaxed max-w-xl mx-auto mb-12">
        Your presence at our wedding is the greatest gift we could ask for.
        We&rsquo;re so grateful to everyone making the journey to celebrate with us.
        If you would like to give a gift, we&rsquo;ve created house &amp; honeymoon
        funds for our future together. Please know that your presence is more
        than enough.
      </p>

      {/* Fund cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* House Fund card */}
        <div className="rounded-xl border border-cream-dark bg-cream overflow-hidden">
          <div className="aspect-[4/3] bg-cream-dark flex items-center justify-center">
            <img src="/sketches/5 stoop.png" alt="" className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-50" />
          </div>
          <div className="p-5 text-center">
            <h3 className="font-serif text-xl text-wine mb-1">House Fund</h3>
            <p className="text-brown-light font-sans text-sm">Help us build our home together</p>
          </div>
        </div>

        {/* Honeymoon Fund card */}
        <div className="rounded-xl border border-cream-dark bg-cream overflow-hidden">
          <div className="aspect-[4/3] bg-cream-dark flex items-center justify-center">
            <img src="/sketches/1 champagne.png" alt="" className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-50" />
          </div>
          <div className="p-5 text-center">
            <h3 className="font-serif text-xl text-wine mb-1">Honeymoon Fund</h3>
            <p className="text-brown-light font-sans text-sm">Send us on an adventure</p>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="text-center">
        <a
          href={EXTERNAL_LINKS.registry}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-3 px-10 rounded-full border-2 border-wine text-wine font-sans font-semibold tracking-wide hover:bg-wine hover:text-cream-light hover:scale-[1.02] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream-light"
        >
          View Registry
        </a>
      </div>
      </div>
    </>
  )
}

export default Registry
