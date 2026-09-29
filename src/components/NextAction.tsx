interface Action {
  label: string
  description: string
  onClick: () => void
  variant: 'primary' | 'secondary' | 'danger'
}

interface Props {
  heading: string
  body: string
  actions: Action[]
}

const btn: Record<Action['variant'], string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-500',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus-visible:ring-gray-400',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500',
}

export default function NextAction({ heading, body, actions }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-1">{heading}</h2>
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{body}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex-1 sm:flex-none rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${btn[action.variant]}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
