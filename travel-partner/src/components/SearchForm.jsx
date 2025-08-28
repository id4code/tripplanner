import { useState } from 'react'
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi'

function SearchForm() {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    days: '1',
    passengers: 1,
  })

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log('Search params:', form)
    // In a real app, navigate to search results or filter trips
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-xl bg-white p-3 shadow-lg ring-1 ring-gray-200"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            placeholder="Leaving from"
            value={form.from}
            onChange={(e) => updateField('from', e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            placeholder="Going to"
            value={form.to}
            onChange={(e) => updateField('to', e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <FiCalendar className="text-gray-500" />
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <select
            value={form.days}
            onChange={(e) => updateField('days', e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
          >
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <FiUsers className="text-gray-500" />
          <input
            type="number"
            min={1}
            value={form.passengers}
            onChange={(e) => updateField('passengers', Number(e.target.value))}
            className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
          />
        </div>
        <div className="md:col-span-1">
          <button
            type="submit"
            className="h-full w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm

