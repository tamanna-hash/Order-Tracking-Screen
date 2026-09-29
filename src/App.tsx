import { useState } from 'react'
import DelayedOrder from './pages/DelayedOrder'
import DeliveredNotReceived from './pages/DeliveredNotReceived'
import TrackingNotAvailable from './pages/TrackingNotAvailable'

type State = 'delayed' | 'delivered-missing' | 'tracking-pending'

const tabs: { id: State; label: string; short: string; dot: string }[] = [
  {
    id: 'delayed',
    label: 'Delayed Order',
    short: 'Delayed',
    dot: 'bg-amber-500',
  },
  {
    id: 'delivered-missing',
    label: 'Delivered · Not Received',
    short: 'Not Received',
    dot: 'bg-red-500',
  },
  {
    id: 'tracking-pending',
    label: 'Tracking Not Available',
    short: 'No Tracking',
    dot: 'bg-blue-500',
  },
]

export default function App() {
  const [active, setActive] = useState<State>('delayed')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
            <span className="font-bold text-gray-900 text-base">TrackIt</span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">Assessment demo — order tracking states</span>
        </div>
      </header>

      {/* Scenario switcher */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex" role="tablist" aria-label="Order tracking scenarios">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-medium border-b-2 transition-colors focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap
                  ${active === tab.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tab.dot} ${active === tab.id ? 'opacity-100' : 'opacity-40'}`} aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6" id="main-content">
        {active === 'delayed' && <DelayedOrder />}
        {active === 'delivered-missing' && <DeliveredNotReceived />}
        {active === 'tracking-pending' && <TrackingNotAvailable />}
      </main>
    </div>
  )
}
