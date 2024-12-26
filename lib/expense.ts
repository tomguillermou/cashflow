import { z } from 'zod'

const expenseSchema = z.object({
  category: z.enum(['needs', 'wants', 'savings']),
  name: z.string(),
  amount: z.number().positive(),
})

export type Expense = z.infer<typeof expenseSchema>

export function validateExpense(data: unknown): Expense {
  return expenseSchema.parse(data)
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

export function deleteExpense(index: number): void {
  const expenses = fetchExpenses().filter((_, i) => i !== index)

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
