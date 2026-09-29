import { useState } from 'react'
import { trackingPendingOrder } from '../data/orders'
import OrderHeader from '../components/OrderHeader'
import TrackingTimeline from '../components/TrackingTimeline'
import OrderSummary from '../components/OrderSummary'
import StatusBanner from '../components/StatusBanner'
import NextAction from '../components/NextAction'

type Toast = { message: string; id: number }

export default function TrackingNotAvailable() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('alex@example.com')
  const [emailStep, setEmailStep] = useState<'idle' | 'editing' | 'done'>('idle')

  const push = (message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { message, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }

  const handleSubscribe = () => {
    setSubscribed(true)
    push(`✓ Tracking updates will be sent to ${emailInput}`)
  }

  const handleEditEmail = () => setEmailStep('editing')

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailStep('done')
    push(`✓ Notification email updated to ${emailInput}`)
  }

  const handleCancelOrder = () => {
    push('⚠ Orders can only be cancelled before they enter processing. Please contact support if needed.')
  }

  const handleContact = () => {
    push('📨 Opening live chat with support…')
  }

  return (
    <div className="min-w-0 space-y-4">
      {/* Toast stack */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 flex flex-col gap-2 pointer-events-none" aria-live="assertive">
        {toasts.map((t) => (
          <div key={t.id} className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg pointer-events-auto">
            {t.message}
          </div>
        ))}
      </div>

      <OrderHeader
        order={trackingPendingOrder}
        badge={
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800" aria-label="Order status: Processing">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
            Processing
          </span>
        }
      />

      <StatusBanner
        variant="info"
        title="Tracking number not assigned yet"
        description="Your order was placed today and is being prepared in our warehouse. A tracking number will be assigned within 24 hours — you'll receive an email the moment it ships."
      />

      {/* Expected timeline card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Expected Timeline</h2>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Order Placed', date: 'Today', sub: 'Sep 29', highlight: true },
            { label: 'Ships by', date: '~24 hrs', sub: 'Sep 30', highlight: false },
            { label: 'Est. Delivery', date: 'Oct 7–10', sub: '8–11 days', highlight: false },
          ].map((col) => (
            <div
              key={col.label}
              className={`rounded-lg p-3 border ${col.highlight ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}
            >
              <p className={`text-xs font-medium mb-1 ${col.highlight ? 'text-blue-700' : 'text-gray-500'}`}>
                {col.label}
              </p>
              <p className={`text-sm font-bold ${col.highlight ? 'text-blue-900' : 'text-gray-800'}`}>
                {col.date}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{col.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email notification opt-in */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-1">Shipping Notifications</h2>
        <p className="text-sm text-gray-500 mb-4">Get notified the moment a tracking number is assigned.</p>

        {emailStep === 'editing' ? (
          <form onSubmit={handleSaveEmail} className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="email-input" className="sr-only">Notification email address</label>
            <input
              id="email-input"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Notification email address"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700 truncate">{emailInput}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleEditEmail}
                className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
              >
                Change
              </button>
              <button
                onClick={handleSubscribe}
                disabled={subscribed}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  subscribed
                    ? 'bg-green-100 text-green-700 cursor-default focus-visible:ring-green-500'
                    : 'bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-500'
                }`}
                aria-pressed={subscribed}
              >
                {subscribed ? '✓ Subscribed' : 'Notify Me'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <TrackingTimeline steps={trackingPendingOrder.timeline} />
          <NextAction
            heading="Need help with this order?"
            body="Tracking numbers are typically assigned within 24 hours of placing an order. If it's been longer than that, our team can look into it."
            actions={[
              {
                label: 'Chat with Support',
                description: '',
                onClick: handleContact,
                variant: 'primary',
              },
              {
                label: 'Cancel Order',
                description: '',
                onClick: handleCancelOrder,
                variant: 'secondary',
              },
            ]}
          />
        </div>
        <div>
          <OrderSummary order={trackingPendingOrder} />
        </div>
      </div>
    </div>
  )
}
