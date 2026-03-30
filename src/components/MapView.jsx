import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN =
  import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE'

const CATEGORY_COLORS = {
  event: '#722F37',   // wine/maroon
  hotel: '#8B6914',   // gold-ish brown
  attraction: '#6B4226', // brown
}

function MapView({ center, zoom, markers = [], style = 'mapbox://styles/mapbox/light-v11' }) {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (mapRef.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers when data changes
  useEffect(() => {
    if (!mapRef.current) return

    const addMarkers = () => {
      // Clear existing markers
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      markers.forEach((loc) => {
        // Custom marker element
        const el = document.createElement('div')
        el.className = 'mapview-marker'
        const color = CATEGORY_COLORS[loc.category] || CATEGORY_COLORS.event
        el.style.cssText = `
          width: 28px;
          height: 28px;
          background-color: ${color};
          border: 3px solid #FAF6F0;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: transform 0.15s ease;
        `
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)'
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
        })

        // Popup
        const popup = new mapboxgl.Popup({ offset: 18, closeButton: false })
          .setHTML(
            `<div style="font-family: 'Inter', sans-serif; padding: 4px 2px;">
              <strong style="font-family: 'Playfair Display', serif; color: #722F37; font-size: 14px;">${loc.name}</strong>
              <p style="margin: 4px 0 0; font-size: 12px; color: #5C4033;">${loc.address}</p>
            </div>`
          )

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(loc.coordinates)
          .setPopup(popup)
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      })
    }

    // If map is already loaded, add immediately; otherwise wait
    if (mapRef.current.loaded()) {
      addMarkers()
    } else {
      mapRef.current.on('load', addMarkers)
    }
  }, [markers])

  // Fly to new center when it changes
  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.flyTo({ center, zoom, duration: 1200 })
  }, [center, zoom])

  return (
    <div
      ref={mapContainer}
      className="w-full h-[60vh] md:h-[50vh] rounded-lg overflow-hidden shadow-md border border-cream-dark"
    />
  )
}

export default MapView
