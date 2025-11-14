import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const navItem = ({ isActive }) =>
    isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Katia Scichilone
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={navItem} end>
            Home
          </NavLink>
          <NavLink to="/portfolio" className={navItem}>
            Portfolio
          </NavLink>
          <NavLink to="/nuovo-lavoro" className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-black">
            Aggiungi Lavoro
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
