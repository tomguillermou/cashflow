import { redirect } from 'next/navigation'

import { storeExpense, validateExpense } from '@/lib/expense'

export function addExpense(formData: FormData): void {
  try {
    const expense = validateExpense({
      category: formData.get('category'),
      name: formData.get('name'),
      amount: Number(formData.get('amount')),
    })

    storeExpense(expense)
  } catch (error) {
    console.error(error)
  } finally {
    redirect('/')
  }
}
