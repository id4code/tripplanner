import ReactDatePicker from 'react-datepicker'
import { FiMapPin, FiTrash2, FiCalendar } from 'react-icons/fi'

function DestinationItem({
  label,
  name,
  dateTime,
  onNameChange,
  onDateChange,
  onRemove,
  required = false,
  error,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-medium text-gray-800">{label}</div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Location</label>
          <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${error?.name ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200'}`}>
            <FiMapPin className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter location name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required={required}
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          {error?.name && <p className="mt-1 text-xs text-red-600">{error.name}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Date & Time</label>
          <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${error?.dateTime ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200'}`}>
            <FiCalendar className="text-gray-500" />
            <ReactDatePicker
              selected={dateTime}
              onChange={(date) => onDateChange(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy h:mm aa"
              placeholderText="Select date & time"
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              wrapperClassName="w-full"
              isClearable
            />
          </div>
          {error?.dateTime && <p className="mt-1 text-xs text-red-600">{error.dateTime}</p>}
        </div>
      </div>

      {onRemove && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default DestinationItem

