const schedule = [
  {
    day: 'Saturday, June 27',
    year: '2026',
    location: 'London, England',
    events: [
      {
        time: '4:45 – 5:30 PM',
        name: 'Ceremony',
        description:
          'Westminster Room civil ceremony starts promptly at 5:00 PM. Please arrive by 4:45.',
        dress: 'City Hall Chic',
        venue: 'The Old Marylebone Town Hall',
        address: 'Marylebone Road, London, UK',
        mapQuery: 'The+Old+Marylebone+Town+Hall+London',
      },
      {
        time: '5:30 – 7:00 PM',
        name: 'Photos & Transport',
        description:
          'Confetti on the steps, followed by transportation to dinner.',
        venue: 'The Old Marylebone Town Hall',
        address: 'Marylebone Road, London, UK',
        mapQuery: 'The+Old+Marylebone+Town+Hall+London',
      },
      {
        time: '7:00 – 11:00 PM',
        name: 'Family Dinner',
        description:
          'Celebrate with wine and food at the place where they got engaged.',
        venue: '67 Pall Mall',
        address: 'London, UK',
        mapQuery: '67+Pall+Mall+London',
      },
    ],
  },
  {
    day: 'Sunday, June 28',
    year: '2026',
    location: 'Toledo, Spain',
    events: [
      {
        time: '4:00 PM',
        name: 'Check in to Cigarral de las Mercedes',
        description:
          'You can check in at 4:00 PM. Feel free to leave luggage early and explore the area.',
        venue: 'Cigarral de las Mercedes',
        mapQuery: 'Cigarral+de+las+Mercedes+Toledo',
      },
      {
        time: '6:00 – 10:00 PM',
        name: 'Welcome Party',
        description: 'Dinner and drinks at Casita del Lago.',
        dress: 'Cocktail',
        venue: 'Cigarral de las Mercedes',
        address: 'Carretera Piedrabuena, Toledo, Spain',
        mapQuery: 'Cigarral+de+las+Mercedes+Toledo',
      },
    ],
  },
  {
    day: 'Monday, June 29',
    year: '2026',
    location: 'Toledo, Spain',
    events: [
      {
        time: '12:00 PM',
        name: 'Choose-Your-Own-Toledo-Adventure',
        description:
          'Enjoy hotel breakfast, relax by the pool, or explore Toledo Old Town for incredible sights and marzipan.',
      },
      {
        time: '7:00 – 8:30 PM',
        name: 'Cocktails & Tapas',
        description:
          'Cocktails, appetizers, and a sunset view at the Mirador. Expect a fashionably late entrance from the bride and groom.',
        dress: 'Summer Formal',
        venue: 'Cigarral de las Mercedes',
        address: 'Carretera Piedrabuena, Toledo, Spain',
        mapQuery: 'Cigarral+de+las+Mercedes+Toledo',
      },
      {
        time: '8:30 – 10:00 PM',
        name: 'Reception Dinner',
        description:
          'The legal bit is done — time for dinner and toasts.',
      },
      {
        time: '10:00 PM',
        name: 'Dancing',
        description:
          'Bring comfortable shoes for late-night dancing at Salón de la Luz.',
      },
    ],
  },
  {
    day: 'Tuesday, June 30',
    year: '2026',
    location: 'Toledo, Spain',
    events: [
      {
        time: '12:00 – 3:00 PM',
        name: 'Farewell BBQ',
        description:
          'Casita del Lago for hangover food and hair of the dog.',
        dress: 'Casual — wear sunglasses',
      },
    ],
  },
]

function DressIcon() {
  return (
    <svg
      className="w-4 h-4 text-gold shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3h6l-1 7h-4L9 3zM7 20h10l-2-10H9L7 20z"
      />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg
      className="w-4 h-4 text-wine shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function EventCard({ event }) {
  return (
    <div className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group">
      {/* Timeline connector line */}
      <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-0 w-px bg-cream-dark group-last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 sm:left-1 top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] border-wine bg-cream-light z-10" />

      <div className="bg-white rounded-2xl shadow-sm border border-cream-dark/30 p-5 sm:p-6 hover:shadow-md transition-shadow duration-300">
        {/* Time */}
        <p className="font-sans text-sm sm:text-base font-semibold text-wine tracking-wide mb-1">
          {event.time}
        </p>

        {/* Event Name */}
        <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2 leading-snug">
          {event.name}
        </h3>

        {/* Description */}
        <p className="font-sans text-brown text-sm sm:text-base leading-relaxed mb-3">
          {event.description}
        </p>

        {/* Metadata row */}
        <div className="flex flex-col gap-2">
          {event.dress && (
            <div className="flex items-start gap-2 text-sm text-brown-light">
              <DressIcon />
              <span className="font-sans">{event.dress}</span>
            </div>
          )}

          {event.venue && (
            <div className="flex items-start gap-2 text-sm text-brown-light">
              <LocationIcon />
              <span className="font-sans">
                {event.mapQuery ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${event.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-wine/30 underline-offset-2 hover:text-wine transition-colors"
                  >
                    {event.venue}
                    {event.address ? `, ${event.address}` : ''}
                  </a>
                ) : (
                  <>
                    {event.venue}
                    {event.address ? `, ${event.address}` : ''}
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Schedule() {
  return (
    <div className="bg-cream-light min-h-screen">
      {/* Page Header */}
      <header className="pt-16 pb-10 sm:pt-24 sm:pb-14 px-6 text-center">
        <p className="text-brown-light font-sans text-sm tracking-widest uppercase mb-3">
          Four Days of Celebration
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-wine mb-4">
          Schedule
        </h1>
        <p className="font-sans text-brown text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          From London to Toledo, join us for a weekend of love, food, and dancing.
        </p>
      </header>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto px-6 pb-20 sm:pb-28">
        {schedule.map((day, dayIndex) => (
          <section key={dayIndex} className="mb-12 last:mb-0">
            {/* Day Header */}
            <div className="text-center mb-8">
              <div className="inline-flex flex-col items-center bg-wine text-cream px-6 py-3 rounded-xl shadow-md">
                <span className="font-serif text-xl sm:text-2xl tracking-wide">
                  {day.day}
                </span>
                <span className="font-sans text-xs text-cream-dark tracking-widest uppercase mt-0.5">
                  {day.location}
                </span>
              </div>
            </div>

            {/* Events */}
            <div>
              {day.events.map((event, eventIndex) => (
                <EventCard key={eventIndex} event={event} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Schedule
