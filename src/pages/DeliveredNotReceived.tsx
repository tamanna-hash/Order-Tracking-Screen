import { useState } from 'react'
import { deliveredNotReceivedOrder } from '../data/orders'
import OrderHeader from '../components/OrderHeader'
import TrackingTimeline from '../components/TrackingTimeline'
import OrderSummary from '../components/OrderSummary'
import StatusBanner from '../components/StatusBanner'
import NextAction from '../components/NextAction'

type Toast = { message: string; id: number }

export default function DeliveredNotReceived() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [claimStep, setClaimStep] = useState<'idle' | 'confirm' | 'submitted'>('idle')

  const push = (message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { message, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500)
  }

  const handleReportMissing = () => setClaimStep('confirm')

  const handleConfirmClaim = () => {
    setClaimStep('submitted')
    push('✓ Missing-item claim submitted (CLM-20241103-01). Expect a response within 24 hours.')
  }

  const handleCancelClaim = () => setClaimStep('idle')

  const handleViewProof = () => {
    push('📸 Delivery photo requested — will be emailed within 30 minutes.')
  }

  const handleContactCarrier = () => {
    push('☎ Opening UPS claims portal for tracking 1Z 999 AA1 01 2345 6784…')
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
        order={deliveredNotReceivedOrder}
        badge={
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800" aria-label="Order status: Delivered – not received">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
            Delivered · Not Received
          </span>
        }
      />

      <StatusBanner
        variant="error"
        title="Marked delivered but you haven't received it"
        description="UPS logged delivery at 1:22 PM on Sep 27 with a photo confirmation. If you haven't received your package, please report it below so we can investigate."
      />

      {/* Delivery proof card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Delivery Confirmation</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Proof photo placeholder */}
          <button
            onClick={handleViewProof}
            className="w-full sm:w-48 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Request delivery photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium">View Delivery Photo</span>
          </button>
          <div className="flex-1 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Delivered</span>
              <span className="font-medium text-gray-800">Sep 27, 2026 · 1:22 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Location</span>
              <span className="font-medium text-gray-800">Front door</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Signed by</span>
              <span className="font-medium text-gray-800">Left at door</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Carrier</span>
              <span className="font-medium text-gray-800">UPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claim flow */}
      {claimStep === 'confirm' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6" role="dialog" aria-labelledby="claim-heading">
          <h3 id="claim-heading" className="text-base font-semibold text-red-900 mb-2">Confirm Missing-Item Claim</h3>
          <p className="text-sm text-red-700 mb-4 leading-relaxed">
            By submitting this claim you confirm you have not received your package. Our team will contact UPS, review the delivery photo, and follow up within 24 hours. If confirmed missing, we'll issue a replacement or full refund.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmClaim}
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Yes, Submit Claim
            </button>
            <button
              onClick={handleCancelClaim}
              className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <TrackingTimeline steps={deliveredNotReceivedOrder.timeline} />
          {claimStep !== 'confirm' && (
            <NextAction
              heading="Didn't receive your package?"
              body="We'll investigate with UPS, review the delivery confirmation photo, and resolve this within 24 hours. If the package can't be located we'll reship or refund in full."
              actions={
                claimStep === 'submitted'
                  ? [
                      {
                        label: '✓ Claim Submitted',
                        description: '',
                        onClick: () => {},
                        variant: 'secondary' as const,
                      },
                      {
                        label: 'Contact UPS Directly',
                        description: '',
                        onClick: handleContactCarrier,
                        variant: 'secondary' as const,
                      },
                    ]
                  : [
                      {
                        label: 'Report Missing Package',
                        description: '',
                        onClick: handleReportMissing,
                        variant: 'danger' as const,
                      },
                      {
                        label: 'Request Delivery Photo',
                        description: '',
                        onClick: handleViewProof,
                        variant: 'secondary' as const,
                      },
                      {
                        label: 'Contact UPS Directly',
                        description: '',
                        onClick: handleContactCarrier,
                        variant: 'secondary' as const,
                      },
                    ]
              }
            />
          )}
        </div>
        <div>
          <OrderSummary order={deliveredNotReceivedOrder} />
        </div>
      </div>
    </div>
  )
}
