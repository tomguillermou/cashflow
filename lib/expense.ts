import { z } from 'zod'

import { uuid } from './uuid'

const expenseSchema = z.object({
  id: z.string(),
  category: z.enum(['needs', 'wants', 'savings']),
  name: z.string(),
  amount: z.number().positive(),
})

export type Expense = z.infer<typeof expenseSchema>

export function createExpense(props: { category: string; name: string; amount: number }): Expense {
  const id = uuid()

  return expenseSchema.parse({
    ...props,
    id,
  })
}

export function storeExpense(expense: Expense): void {
  const expenses = fetchExpenses()

  expenses.push(expense)

  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export function fetchExpenses(): Expense[] {
  const expenses = JSON.parse(localStorage.getItem('expenses') ?? '[]')

  return sortExpenses(expenses)
}

export function deleteExpense(id: string): void {
  const expenses = fetchExpenses().filter((expense) => expense.id !== id)

  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function sortExpenses(expenses: Expense[]): Expense[] {
  return expenses.sort((a, b) => b.amount - a.amount)
}

export function filterExpenses(expenses: Expense[], category: Expense['category']): Expense[] {
  return expenses.filter((expense) => expense.category === category)
}
