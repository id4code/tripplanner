import { quotes } from '../data/mockData'
import { FiDollarSign, FiUsers, FiCheckCircle } from 'react-icons/fi'

const iconMap = {
  'save-money': FiDollarSign,
  'find-partner': FiUsers,
  'stress-free': FiCheckCircle,
}

function Quotes() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {quotes.map((q) => {
          const Icon = iconMap[q.id]
          return (
            <div key={q.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{q.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{q.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Quotes

