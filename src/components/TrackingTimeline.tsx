import type { TimelineStep, TimelineStatus } from '../data/orders'

interface Props {
  steps: TimelineStep[]
}

const iconFor = (status: TimelineStatus) => {
  if (status === 'done') return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
  if (status === 'problem') return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
  if (status === 'active') return (
    <span className="block w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" aria-hidden="true" />
  )
  // pending
  return <span className="block w-2.5 h-2.5 bg-gray-300 rounded-full" aria-hidden="true" />
}

const ringFor = (status: TimelineStatus) => ({
  done: 'bg-green-500 text-white border-green-500',
  active: 'bg-blue-50 text-blue-600 border-blue-400',
  pending: 'bg-gray-100 text-gray-400 border-gray-300',
  problem: 'bg-amber-500 text-white border-amber-500',
}[status])

const connectorFor = (status: TimelineStatus) => ({
  done: 'bg-green-400',
  active: 'bg-blue-300',
  pending: 'bg-gray-200',
  problem: 'bg-amber-300',
}[status])

export default function TrackingTimeline({ steps }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Shipment Timeline</h2>
      <ol aria-label="Order tracking timeline">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <li key={step.label} className="flex gap-3 sm:gap-4">
              {/* dot + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${ringFor(step.status)}`}
                  aria-hidden="true"
                >
                  {iconFor(step.status)}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 min-h-[2rem] my-1 ${connectorFor(steps[i + 1].status === 'pending' || steps[i + 1].status === 'active' ? step.status : steps[i + 1].status)}`} />
                )}
              </div>

              {/* text */}
              <div className={`pb-5 flex-1 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className={`text-sm font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {step.label}
                  </span>
                  {step.status === 'problem' && (
                    <span className="text-xs font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      Delayed
                    </span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto">{step.date}</span>
                </div>
                {step.detail && (
                  <p className={`text-xs mt-0.5 ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {step.detail}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
