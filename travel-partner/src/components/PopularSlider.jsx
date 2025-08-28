import { Link } from 'react-router-dom'
import { popularLocations } from '../data/mockData'

function PopularSlider() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Popular locations</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-full">
          {popularLocations.map((loc) => (
            <Link key={loc.id} to={`/gallery/${loc.id}`} className="group relative block w-72 shrink-0">
              <img
                src={loc.image}
                alt={loc.name}
                className="h-44 w-72 rounded-xl object-cover shadow-sm"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-xl bg-black/20 opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-sm font-medium text-gray-800">
                {loc.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularSlider

