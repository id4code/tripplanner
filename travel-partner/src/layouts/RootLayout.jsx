import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TripPartner. All rights reserved.
      </footer>
    </div>
  )
}

export default RootLayout

