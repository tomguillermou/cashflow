import { redirect } from 'next/navigation'

import { storeExpense } from '@/lib/budget'

export function addExpense(formData: FormData): void {
  const category = formData.get('category')
  const name = formData.get('name')
  const amount = Number(formData.get('amount'))

  if (
    !(typeof category === 'string') ||
    !(typeof name === 'string') ||
    amount < 0 ||
    !['needs', 'wants'].includes(category)
  ) {
    return
  }

  storeExpense({
    category,
    name,
    amount,
  })

  redirect('/')
}
