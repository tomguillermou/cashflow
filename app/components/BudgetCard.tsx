export default function BudgetCard({ title, description, value }: BudgetCardProps) {
  return (
    <div className='flex items-center justify-between p-6 shadow rounded-box bg-base-200'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-bold'>{title}</p>
        <p>{description}</p>
      </div>
      <p className='text-xl font-bold'>{value.toLocaleString()} €</p>
    </div>
  )
}

interface BudgetCardProps {
  title: string
  description: string
  value: number
}
