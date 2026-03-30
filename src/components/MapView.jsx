import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom marker icon matching wine/maroon theme
function createMarkerIcon(category) {
  const colors = {
    event: '#5c1a1a',
    hotel: '#8B6914',
    attraction: '#4a2c2a',
  }
  const color = colors[category] || colors.event

  return L.divIcon({
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    html: `<div style="
      width: 28px;
      height: 28px;
      background: ${color};
      border: 3px solid #faf3e6;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
  })
}

// Component to fly to new center when city changes
function FlyToCenter({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [map, center, zoom])
  return null
}

// Inject CSS to desaturate + warm-tint the map tiles
const STYLE_ID = 'leaflet-cream-style'
function injectMapStyle() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .leaflet-tile-pane {
      filter: saturate(0.3) sepia(0.25) brightness(1.05) contrast(0.95);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: 'Inter', sans-serif;
    }
    .leaflet-popup-tip {
      box-shadow: none;
    }
    .leaflet-control-zoom a {
      color: #5c1a1a !important;
      border-color: #e8d5a8 !important;
    }
    .leaflet-control-zoom a:hover {
      background: #faf3e6 !important;
    }
  `
  document.head.appendChild(style)
}

function MapView({ center, zoom, markers = [] }) {
  useEffect(() => {
    injectMapStyle()
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-[60vh] md:h-[50vh] rounded-lg overflow-hidden shadow-md border border-cream-dark z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToCenter center={center} zoom={zoom} />

      {markers.map((loc) => (
        <Marker
          key={loc.name}
          position={[loc.coordinates[1], loc.coordinates[0]]}
          icon={createMarkerIcon(loc.category)}
        >
          <Popup>
            <div style={{ padding: '2px 0' }}>
              <strong style={{ fontFamily: "'Playfair Display', serif", color: '#5c1a1a', fontSize: '14px' }}>
                {loc.name}
              </strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4a2c2a' }}>
                {loc.address}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapView
