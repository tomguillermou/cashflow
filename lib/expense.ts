import { z } from 'zod'

import { uuid } from './uuid'

const expenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().positive(),
  category: z.enum(['needs', 'wants', 'savings']),
})

export interface Expense {
  id: string
  name: string
  amount: number
  category: string
}

export function createExpense(props: { category: string; name: string; amount: number }): Expense {
  return expenseSchema.parse({
    id: uuid(),
    name: props.name,
    amount: props.amount,
    category: props.category,
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

export function filterExpensesByCategory(expenses: Expense[], category: string): Expense[] {
  return expenses.filter((expense) => expense.category === category)
}
