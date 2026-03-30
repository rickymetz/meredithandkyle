import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import NavMenu from './NavMenu.jsx'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Desktop nav bar - hidden on mobile */}
      <header className="hidden md:block sticky top-0 z-40 bg-cream-light/95 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <NavLink to="/" className="font-serif text-xl text-wine tracking-wide hover:opacity-80 transition-opacity">
            Meredith &amp; Kyle
          </NavLink>
          <NavMenu />
        </div>
      </header>

      {/* Mobile hamburger button - visible only on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-brown bg-cream-light/95 backdrop-blur-sm text-brown hover:bg-cream transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            /* X icon */
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-out overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-charcoal/30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out panel */}
      <div
        className={`md:hidden fixed top-0 left-0 z-45 h-full w-72 bg-cream-light shadow-xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 45 }}
      >
        <NavMenu mobile onClose={() => setMenuOpen(false)} />
      </div>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Mobile floating RSVP button */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <NavLink
          to="/rsvp"
          className="block py-3 px-8 rounded-full border-2 border-brown bg-cream-light/95 backdrop-blur-sm text-brown font-sans font-semibold tracking-wide shadow-lg hover:bg-brown hover:text-cream-light transition-colors"
        >
          RSVP
        </NavLink>
      </div>
    </div>
  )
}

export default Layout
