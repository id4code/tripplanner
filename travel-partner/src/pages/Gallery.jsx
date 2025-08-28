import { useParams, Link } from 'react-router-dom'
import { popularLocations } from '../data/mockData'

function Gallery() {
  const { locationId } = useParams()
  const location = popularLocations.find((l) => l.id === locationId)

  if (!location) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-600">Location not found.</p>
        <Link to="/" className="mt-2 inline-block text-sm text-blue-600 hover:underline">Go back</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{location.name} gallery</h1>
        <Link to="/" className="text-sm text-blue-600 hover:underline">Back to Home</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {location.gallery.map((src, idx) => (
          <img key={idx} src={src} alt={`${location.name} ${idx + 1}`} className="h-52 w-full rounded-xl object-cover" loading="lazy" />
        ))}
      </div>
    </div>
  )
}

export default Gallery

