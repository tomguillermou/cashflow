export function storeIncome(income: number): void {
  localStorage.setItem('income', income.toString())
}

export function fetchIncome(): number {
  return Number(localStorage.getItem('income') ?? 0)
}
