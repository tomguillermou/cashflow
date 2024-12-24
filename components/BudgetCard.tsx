import { BsQuestionCircle } from 'react-icons/bs'

export default function BudgetCard({ title, value, tooltip }: BudgetCardProps) {
  return (
    <div className='flex items-center justify-between p-6 rounded-box border shadow'>
      <p className='flex items-center'>
        <span className='font-bold'>{title}</span>
        <span className='tooltip tooltip-right ml-2' data-tip={tooltip}>
          <BsQuestionCircle className='w-4 h-4' />
        </span>
      </p>
      <p>{value.toLocaleString()} €</p>
    </div>
  )
}

interface BudgetCardProps {
  title: string
  value: number
  tooltip: string
}
