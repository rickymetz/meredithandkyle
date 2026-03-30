import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Gradient placeholder background (will be replaced with photo) */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-brown to-wine opacity-90" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white leading-tight tracking-wide mb-4">
            Meredith
            <span className="block text-3xl sm:text-4xl md:text-5xl text-cream-dark my-2 font-sans font-light tracking-widest">
              &amp;
            </span>
            Kyle
          </h1>

          <p className="text-cream text-lg sm:text-xl md:text-2xl font-sans font-light mt-6 leading-relaxed">
            Join us for our celebrations in London &amp; Toledo!
          </p>

          <p className="text-gold font-serif text-2xl sm:text-3xl mt-8 tracking-wider">
            June 27–30, 2026
          </p>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 z-10 animate-bounce">
          <a href="#details" aria-label="Scroll down">
            <svg
              className="w-8 h-8 text-cream opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Venue Preview Section */}
      <section id="details" className="bg-cream-light py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brown-light font-sans text-sm tracking-widest uppercase mb-4">
            London Ceremony
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-wine mb-6 leading-snug">
            The Old Marylebone Town Hall
          </h2>
          <p className="text-brown font-sans text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            An intimate civil ceremony in one of London's most beloved and historic venues, followed by celebrations in Toledo, Spain.
          </p>

          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 bg-wine text-cream px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide uppercase hover:bg-maroon hover:scale-[1.02] hover:shadow-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream-light"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Unlock Guest Details
          </Link>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center py-4 bg-cream">
        <div className="h-px w-16 bg-gold" />
        <svg className="w-5 h-5 mx-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="h-px w-16 bg-gold" />
      </div>

      {/* Registry Preview Section */}
      <section className="bg-cream py-16 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-brown-light font-sans text-sm tracking-widest uppercase mb-4">
            Registry
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-wine mb-8">
            A Note on Gifts
          </h2>
          <p className="text-brown font-sans text-base sm:text-lg leading-relaxed mb-10">
            Your presence at our wedding is the greatest gift we could ask for. We're so grateful to everyone making the journey to celebrate with us. If you would like to give a gift, we've created house &amp; honeymoon funds for our future together. Please know that your presence is more than enough.
          </p>

          <Link
            to="/registry"
            className="inline-block border-2 border-wine text-wine px-8 py-3 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide uppercase hover:bg-wine hover:text-cream hover:scale-[1.02] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream"
          >
            View Registry
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
