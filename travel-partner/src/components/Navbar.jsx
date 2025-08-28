import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">TP</span>
            <span className="text-lg">TripPartner</span>
          </Link>

        	<div className="hidden md:flex items-center gap-3">
        		<Link to="/publish" className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Publish Your Trip</Link>
        		<button className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100">Login</button>
        		<button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Sign Up</button>
        	</div>

          <button
            aria-label="Toggle Menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <Link onClick={() => setIsOpen(false)} to="/publish" className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700">Publish Your Trip</Link>
              <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 text-left hover:bg-gray-100">Login</button>
              <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white text-left">Sign Up</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

