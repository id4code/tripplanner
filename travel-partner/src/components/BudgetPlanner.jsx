import { budgetCards } from '../data/mockData'

function BudgetPlanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Budget planner (round trip)</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgetCards.map((b) => (
          <div key={b.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">From → To</p>
                <p className="text-base font-medium text-gray-900">{b.from} → {b.to}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Approx budget</p>
                <p className="text-base font-semibold text-green-600">₹{b.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BudgetPlanner

