function Registry() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-wine text-center mb-8">
        Registry
      </h1>

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
            <svg className="w-16 h-16 text-brown-light/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <div className="p-5 text-center">
            <h3 className="font-serif text-xl text-wine mb-1">House Fund</h3>
            <p className="text-brown-light font-sans text-sm">Help us build our home together</p>
          </div>
        </div>

        {/* Honeymoon Fund card */}
        <div className="rounded-xl border border-cream-dark bg-cream overflow-hidden">
          <div className="aspect-[4/3] bg-cream-dark flex items-center justify-center">
            <svg className="w-16 h-16 text-brown-light/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.732-3.558" />
            </svg>
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
          href="https://withjoy.com/esquizheng-party"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-3 px-10 rounded-full border-2 border-brown text-brown font-sans font-semibold tracking-wide hover:bg-brown hover:text-cream-light transition-colors"
        >
          View Registry
        </a>
      </div>
    </div>
  )
}

export default Registry
