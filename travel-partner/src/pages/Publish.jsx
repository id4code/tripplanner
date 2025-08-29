import { useState } from 'react'
import { FiPlus, FiUsers, FiHash, FiEye } from 'react-icons/fi'
import DestinationItem from '../components/DestinationItem'

function Publish() {
  const [pickup, setPickup] = useState('')
  const [primary, setPrimary] = useState({ name: '', dateTime: null })
  const [subs, setSubs] = useState([])
  const [days, setDays] = useState(1)
  const [capacity, setCapacity] = useState(1)
  const [errors, setErrors] = useState({})
  const [showPreview, setShowPreview] = useState(false)

  function updateSub(index, field, value) {
    setSubs(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  function addSub() {
    setSubs(prev => [...prev, { name: '', dateTime: null }])
  }

  function removeSub(index) {
    setSubs(prev => prev.filter((_, i) => i !== index))
  }

  function validate() {
    const newErrors = {}
    if (!pickup.trim()) newErrors.pickup = 'Pickup location is required.'
    if (!primary.name.trim()) newErrors.primaryName = 'Primary destination is required.'
    if (!primary.dateTime) newErrors.primaryDate = 'Primary date & time is required.'
    subs.forEach((s, i) => {
      if (s.name && !s.dateTime) {
        newErrors[`sub-${i}-date`] = 'Please select date & time for this destination.'
      }
    })
    if (days < 1) newErrors.days = 'Number of days must be at least 1.'
    if (capacity < 1) newErrors.capacity = 'Passengers must be at least 1.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setShowPreview(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Publish your trip</h1>
      <p className="mt-1 text-sm text-gray-600">Create a multi-day itinerary with day-wise destinations.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Pickup location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Where are you starting from?"
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${errors.pickup ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200'}`}
          />
          {errors.pickup && <p className="mt-1 text-xs text-red-600">{errors.pickup}</p>}
        </div>

        <DestinationItem
          label="Primary destination"
          name={primary.name}
          dateTime={primary.dateTime}
          onNameChange={(v) => setPrimary(prev => ({ ...prev, name: v }))}
          onDateChange={(v) => setPrimary(prev => ({ ...prev, dateTime: v }))}
          required
          error={{ name: errors.primaryName, dateTime: errors.primaryDate }}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">Add sub-destinations (optional)</h2>
          <button
            type="button"
            onClick={addSub}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <FiPlus /> Add destination
          </button>
        </div>

        {subs.map((s, i) => (
          <DestinationItem
            key={i}
            label={`Destination ${i + 1}`}
            name={s.name}
            dateTime={s.dateTime}
            onNameChange={(v) => updateSub(i, 'name', v)}
            onDateChange={(v) => updateSub(i, 'dateTime', v)}
            onRemove={() => removeSub(i)}
            error={{ dateTime: errors[`sub-${i}-date`] }}
          />
        ))}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Number of days traveling</label>
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${errors.days ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200'}`}>
              <FiHash className="text-gray-500" />
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
              />
            </div>
            {errors.days && <p className="mt-1 text-xs text-red-600">{errors.days}</p>}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Passengers you can take</label>
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${errors.capacity ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200'}`}>
              <FiUsers className="text-gray-500" />
              <input
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
              />
            </div>
            {errors.capacity && <p className="mt-1 text-xs text-red-600">{errors.capacity}</p>}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => setShowPreview(true)} className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FiEye /> Preview
          </button>
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Next
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="text-sm text-gray-800">{pickup || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Days</p>
              <p className="text-sm text-gray-800">{days}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Passengers</p>
              <p className="text-sm text-gray-800">{capacity}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700">Destinations</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-800">
              <li>
                <span className="font-medium">Primary:</span> {primary.name || '-'} {primary.dateTime ? `— ${primary.dateTime.toLocaleString()}` : ''}
              </li>
              {subs.map((s, i) => (
                <li key={i}>
                  <span className="font-medium">Sub {i + 1}:</span> {s.name || '-'} {s.dateTime ? `— ${s.dateTime.toLocaleString()}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Publish

