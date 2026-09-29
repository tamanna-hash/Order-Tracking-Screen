import type { OrderData } from '../data/orders'

interface Props {
  order: OrderData
}

export default function OrderSummary({ order }: Props) {
  const total = order.subtotal + order.shipping + order.tax

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>

      <ul className="space-y-3 mb-5" aria-label="Order items">
        {order.items.map((item) => (
          <li key={item.name} className="flex items-center gap-3">
            <span className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0" aria-hidden="true">
              {item.image}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-400">Qty {item.qty}</p>
            </div>
            <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
