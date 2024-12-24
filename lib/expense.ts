import { z } from 'zod'

export const expenseSchema = z.object({
  category: z.enum(['needs', 'wants']),
  name: z.string(),
  amount: z.number().positive(),
})

export type Expense = z.infer<typeof expenseSchema>

export function storeExpense(expense: Expense): void {
  const expenses = fetchExpenses()
  expenses.push(expense)

  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export function fetchExpenses(): Expense[] {
  const expenses: Expense[] = JSON.parse(localStorage.getItem('expenses') ?? '[]')

  return expenses.sort((a, b) => b.amount - a.amount)
}

export function deleteExpense(name: string): void {
  const expenses = fetchExpenses().filter((expense) => expense.name !== name)

  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function filterExpenses(expenses: Expense[], category: Expense['category']): Expense[] {
  return expenses.filter((expense) => expense.category === category)
}
