import { redirect } from 'next/navigation'

import { expenseSchema, storeExpense } from '@/lib/expense'

export function addExpense(formData: FormData): void {
  const expense = expenseSchema.parse({
    category: formData.get('category'),
    name: formData.get('name'),
    amount: formData.get('amount'),
  })

  storeExpense(expense)

  redirect('/')
}
