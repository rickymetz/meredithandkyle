import { useState } from 'react'
import MapView from '../components/MapView.jsx'
import { londonLocations, toledoLocations } from '../data/mapLocations.js'

const CITIES = {
  london: {
    label: 'London',
    center: [-0.1470, 51.5150],
    zoom: 13,
    locations: londonLocations,
  },
  toledo: {
    label: 'Toledo',
    center: [-4.0300, 39.8540],
    zoom: 13,
    locations: toledoLocations,
  },
}

const CATEGORY_LABELS = {
  event: 'Event',
  hotel: 'Hotel',
  attraction: 'Things to Do',
}

const CATEGORY_BADGE_CLASSES = {
  event: 'bg-wine text-cream',
  hotel: 'bg-gold text-cream',
  attraction: 'bg-brown text-cream',
}

function Maps() {
  const [activeCity, setActiveCity] = useState('london')
  const city = CITIES[activeCity]

  const eventLocations = city.locations.filter((l) => l.category === 'event')
  const hotelLocations = city.locations.filter((l) => l.category === 'hotel')
  const attractionLocations = city.locations.filter((l) => l.category === 'attraction')

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
      <h1 className="font-serif text-3xl md:text-4xl text-wine mb-2 text-center">
        Maps & Venues
      </h1>
      <p className="text-brown font-sans text-center mb-8">
        Explore the locations for our celebrations.
      </p>

      {/* City Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full bg-cream border border-cream-dark overflow-hidden">
          {Object.entries(CITIES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveCity(key)}
              className={`px-6 py-2 text-sm font-sans font-medium transition-colors duration-200 cursor-pointer ${
                activeCity === key
                  ? 'bg-wine text-cream'
                  : 'text-brown hover:bg-cream-dark'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <MapView
        center={city.center}
        zoom={city.zoom}
        markers={city.locations}
      />

      {/* Location Cards */}
      <div className="mt-10 space-y-8">
        {/* Events */}
        {eventLocations.length > 0 && (
          <LocationSection title="Events" locations={eventLocations} category="event" />
        )}

        {/* Hotels */}
        {hotelLocations.length > 0 && (
          <LocationSection title="Where to Stay" locations={hotelLocations} category="hotel" />
        )}

        {/* Attractions */}
        {attractionLocations.length > 0 && (
          <LocationSection title="Things to Do" locations={attractionLocations} category="attraction" />
        )}
      </div>
    </div>
  )
}

function LocationSection({ title, locations, category }) {
  return (
    <div>
      <h2 className="font-serif text-xl md:text-2xl text-wine mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <LocationCard key={loc.name} location={loc} category={category} />
        ))}
      </div>
    </div>
  )
}

function LocationCard({ location, category }) {
  const badgeClass = CATEGORY_BADGE_CLASSES[category] || CATEGORY_BADGE_CLASSES.event

  return (
    <div className="bg-cream rounded-lg border border-cream-dark p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-serif text-lg text-charcoal leading-snug">
          {location.name}
        </h3>
        <span className={`shrink-0 text-xs font-sans font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
          {CATEGORY_LABELS[category]}
        </span>
      </div>
      <p className="text-brown text-sm font-sans mb-1">{location.description}</p>
      <p className="text-brown-light text-xs font-sans">{location.address}</p>
    </div>
  )
}

export default Maps
