import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/accommodations', label: 'Accommodations' },
  { to: '/things-to-do', label: 'Things to Do' },
  { to: '/registry', label: 'Registry' },
  { to: '/q-and-a', label: 'Q & A' },
  { to: '/crossword', label: 'Crossword' },
  { to: '/maps', label: 'Maps' },
]

function NavMenu({ mobile = false, onClose }) {
  const linkClass = ({ isActive }) =>
    mobile
      ? `block py-3 px-4 text-lg font-sans transition-colors ${
          isActive
            ? 'text-wine font-semibold'
            : 'text-brown hover:text-wine'
        }`
      : `px-3 py-1.5 text-sm font-sans transition-colors ${
          isActive
            ? 'text-wine font-semibold'
            : 'text-brown hover:text-wine'
        }`

  return (
    <nav>
      {/* Mobile slide-out panel */}
      {mobile && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 pt-16 pb-4 border-b border-cream-dark">
            <h2 className="font-serif text-2xl text-wine tracking-wide">
              Meredith &amp; Kyle
            </h2>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* RSVP button at bottom */}
          <div className="p-6 border-t border-cream-dark">
            <NavLink
              to="/rsvp"
              onClick={onClose}
              className="block text-center py-3 px-6 rounded-full border-2 border-wine text-wine font-sans font-semibold tracking-wide hover:bg-wine hover:text-cream-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30"
            >
              RSVP
            </NavLink>
          </div>
        </div>
      )}

      {/* Desktop horizontal nav */}
      {!mobile && (
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/rsvp"
            className="ml-3 py-1.5 px-5 rounded-full border-2 border-wine text-wine text-sm font-sans font-semibold tracking-wide hover:bg-wine hover:text-cream-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30"
          >
            RSVP
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default NavMenu
