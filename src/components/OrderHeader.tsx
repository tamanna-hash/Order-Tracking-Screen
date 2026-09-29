import type { OrderData } from '../data/orders'

interface Props {
  order: OrderData
  badge: React.ReactNode
}

export default function OrderHeader({ order, badge }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Order {order.orderId}
            </h1>
            {badge}
          </div>
          <p className="text-sm text-gray-500">Placed on {order.placedDate}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
            {order.carrier} tracking
          </p>
          <p className="text-sm font-mono text-gray-700 break-all">
            {order.trackingNumber}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Ship to: </span>
          <span className="text-gray-800 font-medium">{order.shippingAddress}</span>
        </div>
        {order.estimatedDelivery && (
          <div className="sm:text-right">
            <span className="text-gray-500">Est. delivery: </span>
            <span className="text-gray-800 font-semibold">{order.estimatedDelivery}</span>
          </div>
        )}
      </div>
    </div>
  )
}
