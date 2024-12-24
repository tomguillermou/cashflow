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
