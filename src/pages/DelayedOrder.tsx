import { useState } from 'react'
import { delayedOrder } from '../data/orders'
import OrderHeader from '../components/OrderHeader'
import TrackingTimeline from '../components/TrackingTimeline'
import OrderSummary from '../components/OrderSummary'
import StatusBanner from '../components/StatusBanner'
import NextAction from '../components/NextAction'

type Toast = { message: string; id: number }

export default function DelayedOrder() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [notified, setNotified] = useState(false)
  const [contacted, setContacted] = useState(false)

  const push = (message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { message, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }

  const handleNotify = () => {
    setNotified(true)
    push('✓ You\'ll get an email update once your shipment moves.')
  }

  const handleContact = () => {
    setContacted(true)
    push('✓ A support ticket has been opened (ref: TKT-48821). We\'ll respond within 2 hours.')
  }

  const handleTrack = () => {
    push(`Opening FedEx tracking for ${delayedOrder.trackingNumber}…`)
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
        order={delayedOrder}
        badge={
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800" aria-label="Order status: Delayed">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            Delayed
          </span>
        }
      />

      <StatusBanner
        variant="warning"
        title="Your order is running late"
        description="Severe weather at the Memphis sorting facility has caused a delay. Your revised estimated delivery is Oct 3, 2026. We apologise for the inconvenience."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <TrackingTimeline steps={delayedOrder.timeline} />
          <NextAction
            heading="What would you like to do?"
            body="We're actively monitoring your shipment. You can get notified when it moves, track it directly, or open a support case if you need further assistance."
            actions={[
              {
                label: notified ? '✓ Notifications On' : 'Notify Me When It Moves',
                description: 'Get an email when the shipment status updates',
                onClick: handleNotify,
                variant: notified ? 'secondary' : 'primary',
              },
              {
                label: 'Track on FedEx',
                description: 'Open the FedEx tracking page',
                onClick: handleTrack,
                variant: 'secondary',
              },
              {
                label: contacted ? '✓ Ticket Opened' : 'Contact Support',
                description: 'Open a support ticket',
                onClick: handleContact,
                variant: contacted ? 'secondary' : 'danger',
              },
            ]}
          />
        </div>
        <div>
          <OrderSummary order={delayedOrder} />
        </div>
      </div>
    </div>
  )
}
