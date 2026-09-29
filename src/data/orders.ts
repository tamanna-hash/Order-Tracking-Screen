// ─── Shared types ────────────────────────────────────────────────────────────

export type TimelineStatus = 'done' | 'active' | 'pending' | 'problem'

export interface TimelineStep {
  label: string
  date: string
  detail: string
  status: TimelineStatus
}

export interface OrderItem {
  name: string
  qty: number
  price: number
  image: string // emoji stand-in for a product image
}

export interface OrderData {
  orderId: string
  placedDate: string
  carrier: string
  trackingNumber: string
  estimatedDelivery: string | null
  shippingAddress: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  timeline: TimelineStep[]
}

// ─── Scenario 1 — Delayed Order ───────────────────────────────────────────────

export const delayedOrder: OrderData = {
  orderId: 'ORD-20240892',
  placedDate: 'Sep 18, 2026',
  carrier: 'FedEx',
  trackingNumber: '7748 9201 3344 5566',
  estimatedDelivery: 'Oct 3, 2026',
  shippingAddress: '142 Maple Street, Austin, TX 78701',
  items: [
    { name: 'Wireless Noise-Cancelling Headphones', qty: 1, price: 219.99, image: '🎧' },
    { name: 'USB-C Charging Dock (3-port)', qty: 1, price: 49.99, image: '🔌' },
    { name: 'Braided USB-C Cable 2m', qty: 2, price: 14.99, image: '🔋' },
  ],
  subtotal: 299.96,
  shipping: 0,
  tax: 24.75,
  timeline: [
    { label: 'Order Placed', date: 'Sep 18 · 10:42 AM', detail: 'Payment confirmed', status: 'done' },
    { label: 'Processing', date: 'Sep 18 · 2:15 PM', detail: 'Warehouse picked & packed', status: 'done' },
    { label: 'Shipped', date: 'Sep 20 · 8:30 AM', detail: 'Handed to FedEx — Austin hub', status: 'done' },
    { label: 'In Transit', date: 'Sep 23 · 11:05 PM', detail: 'Weather delay at Memphis sorting facility', status: 'problem' },
    { label: 'Out for Delivery', date: 'Est. Oct 3', detail: 'Revised estimate after delay', status: 'pending' },
    { label: 'Delivered', date: '—', detail: '', status: 'pending' },
  ],
}

// ─── Scenario 2 — Delivered but Not Received ─────────────────────────────────

export const deliveredNotReceivedOrder: OrderData = {
  orderId: 'ORD-20241103',
  placedDate: 'Sep 22, 2026',
  carrier: 'UPS',
  trackingNumber: '1Z 999 AA1 01 2345 6784',
  estimatedDelivery: 'Sep 27, 2026',
  shippingAddress: '88 Riverwalk Drive, Chicago, IL 60601',
  items: [
    { name: 'Standing Desk Mat (Anti-fatigue)', qty: 1, price: 79.99, image: '🟫' },
    { name: 'Monitor Light Bar', qty: 1, price: 59.99, image: '💡' },
  ],
  subtotal: 139.98,
  shipping: 7.99,
  tax: 12.25,
  timeline: [
    { label: 'Order Placed', date: 'Sep 22 · 9:10 AM', detail: 'Payment confirmed', status: 'done' },
    { label: 'Processing', date: 'Sep 22 · 3:00 PM', detail: 'Warehouse picked & packed', status: 'done' },
    { label: 'Shipped', date: 'Sep 24 · 7:45 AM', detail: 'Picked up by UPS', status: 'done' },
    { label: 'In Transit', date: 'Sep 26 · 6:30 AM', detail: 'Arrived at Chicago distribution center', status: 'done' },
    { label: 'Delivered', date: 'Sep 27 · 1:22 PM', detail: 'Left at front door — photo taken', status: 'done' },
  ],
}

// ─── Scenario 3 — Tracking Not Available Yet ─────────────────────────────────

export const trackingPendingOrder: OrderData = {
  orderId: 'ORD-20241215',
  placedDate: 'Sep 29, 2026',
  carrier: 'USPS',
  trackingNumber: '—',
  estimatedDelivery: 'Oct 7 – Oct 10, 2026',
  shippingAddress: '301 Ocean Blvd, Miami, FL 33101',
  items: [
    { name: 'Mechanical Keyboard (TKL, Blue switches)', qty: 1, price: 129.99, image: '⌨️' },
    { name: 'Desk Organiser Set', qty: 1, price: 34.99, image: '🗂️' },
    { name: 'Microfibre Screen Cloth (5-pack)', qty: 1, price: 9.99, image: '🧹' },
  ],
  subtotal: 174.97,
  shipping: 5.99,
  tax: 14.45,
  timeline: [
    { label: 'Order Placed', date: 'Sep 29 · 8:03 AM', detail: 'Payment confirmed', status: 'done' },
    { label: 'Processing', date: 'Expected within 24 hrs', detail: 'Being prepared in our warehouse', status: 'active' },
    { label: 'Shipped', date: '—', detail: 'Tracking number will be emailed once shipped', status: 'pending' },
    { label: 'In Transit', date: '—', detail: '', status: 'pending' },
    { label: 'Delivered', date: '—', detail: '', status: 'pending' },
  ],
}
