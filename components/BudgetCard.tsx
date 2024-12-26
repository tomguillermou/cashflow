export default function BudgetCard({ title, income, ratio, spent }: BudgetCardProps) {
  const formatPercentage = (value: number) => value.toFixed() + '%'
  const formatEuro = (value: number) => value.toLocaleString() + ' €'

  const budget = income * ratio
  const spentPercentage = income ? (spent / (income * ratio)) * 100 : 0
  const remaining = Math.max(budget - spent, 0)

  return (
    <div className='flex flex-col items-center text-center p-8 gap-6 rounded-box border shadow bg-base-100'>
      <p>{formatPercentage(ratio * 100)} of income </p>

      <p className='text-3xl font-bold'>{title}</p>

      <div
        className='radial-progress text-primary'
        // @ts-expect-error --value is used by DaisyUI
        style={{ '--value': spentPercentage }}
        role='progressbar'>
        <p className='text-base-content text-lg font-bold'>{formatPercentage(spentPercentage)}</p>
      </div>

      <div>
        <p className='text-gray-400'>Budget</p>
        <p className='text-xl font-bold'>{formatEuro(budget)}</p>
      </div>

      <div>
        <p className='text-gray-400'>Spent</p>
        <p className='text-xl font-bold'>{formatEuro(spent)}</p>
      </div>

      <div>
        <p className='text-gray-400'>Remaining</p>
        <p className={`text-xl font-bold ${remaining > 0 ? 'text-success' : 'text-error'}`}>
          {formatEuro(remaining)}
        </p>
      </div>
    </div>
  )
}

interface BudgetCardProps {
  title: string
  income: number
  ratio: number
  spent: number
  tooltip?: string
}
