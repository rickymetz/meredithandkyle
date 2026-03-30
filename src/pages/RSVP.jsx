import { EXTERNAL_LINKS } from '../config/links.js'

function RSVP() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-wine mb-6">
        RSVP
      </h1>

      <p className="text-brown font-sans leading-relaxed max-w-lg mx-auto mb-4">
        We can&rsquo;t wait to celebrate with you! Please let us know if
        you&rsquo;ll be joining us by RSVPing through our Joy page.
      </p>

      <p className="text-brown-light font-sans text-sm mb-10">
        Kindly respond by May 1, 2026.
      </p>

      <a
        href={EXTERNAL_LINKS.rsvp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-3.5 px-10 rounded-full bg-wine text-cream-light font-sans font-semibold tracking-wide text-base hover:bg-maroon hover:scale-[1.02] hover:shadow-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream-light"
      >
        RSVP Now
      </a>
    </div>
  )
}

export default RSVP
