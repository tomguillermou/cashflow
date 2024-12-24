export interface Budget {
  income: number
  needs: number
  wants: number
  savings: number
}

export function computeBudget(income: number): Budget {
  return {
    income,
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
  }
}

export function storeIncome(income: number): void {
  localStorage.setItem('income', income.toString())
}

export function fetchIncome(): number {
  return Number(localStorage.getItem('income') ?? 0)
}

export interface Expense {
  category: 'needs' | 'wants'
  name: string
  amount: number
}

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
