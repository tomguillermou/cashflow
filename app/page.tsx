'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'

import { addExpense } from '@/actions/add-expense'
import {
  Budget,
  Expense,
  computeBudget,
  computeExpensesByCategory,
  deleteExpense,
  fetchExpenses,
  fetchIncome,
  storeIncome,
} from '@/lib/budget'

import BudgetCard from './components/BudgetCard'

export default function Home() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [needsExpenses, setNeedsExpenses] = useState<number>(0)
  const [wantsExpenses, setWantsExpenses] = useState<number>(0)
  const [budget, setBudget] = useState<Budget | null>(null)

  useEffect(() => {
    const income = fetchIncome()

    setIncome(income)
    setBudget(computeBudget(income))
    updateExpenses()
  }, [])

  if (!budget) return

  function onIncomeChange(event: ChangeEvent<HTMLInputElement>): void {
    const income = Number(event.target.value)
    const budget = computeBudget(income)

    storeIncome(income)
    setIncome(income)
    setBudget(budget)
  }

  function onOpenModal(): void {
    const expenseModal = document.getElementById('expenseModal') as HTMLDialogElement
    expenseModal.showModal()
  }

  function onDeleteExpense(name: string): void {
    deleteExpense(name)
    updateExpenses()
  }

  function updateExpenses(): void {
    setExpenses(fetchExpenses())
    setNeedsExpenses(computeExpensesByCategory('needs'))
    setWantsExpenses(computeExpensesByCategory('wants'))
  }

  return (
    <main className='flex flex-col p-8'>
      <h1 className='text-5xl font-bold'>Cashflow</h1>

      <section className='flex flex-col max-w-lg gap-4'>
        <h2 className='text-3xl mt-8'>Budget</h2>

        <div className='flex flex-col p-6 gap-4 rounded-box border shadow'>
          <label className='font-bold'>Income</label>
          <div className='input input-bordered flex items-center'>
            <input type='text' className='grow' onChange={onIncomeChange} value={income} />
            <span>€</span>
          </div>
        </div>

        <BudgetCard
          title='Needs'
          value={budget.needs}
          tooltip='These are essential expenses for your daily life, such as rent, energy bills, phone bill, transportation, groceries, insurance, etc.'
        />
        <BudgetCard
          title='Wants'
          value={budget.wants}
          tooltip='These are non-essential expenses related to your leisure activites, such as restaurants, vacations, subscriptions (Netflix, Spotify, etc.), shopping, etc.'
        />
        <BudgetCard
          title='Savings'
          value={budget.savings}
          tooltip='This is the amount you set aside for unforeseen expenses, investments, or loan repayments.'
        />
      </section>

      <section className='flex flex-col max-w-lg gap-4 mt-12'>
        <h2 className='text-3xl'>Recurring expenses</h2>

        <div className='stats rounded-box border shadow'>
          <div className='stat'>
            <div className='stat-title'>Needs</div>
            <div className='stat-value'>{needsExpenses.toLocaleString()} €</div>
            <div className='stat-desc'>
              {(budget.needs - needsExpenses).toLocaleString()} € can be spent
            </div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Wants</div>
            <div className='stat-value'>{wantsExpenses.toLocaleString()} €</div>
            <div className='stat-desc'>
              {(budget.wants - wantsExpenses).toLocaleString()} € can be spent
            </div>
          </div>
        </div>

        <button className='btn btn-primary' onClick={onOpenModal}>
          Add recurring expense
        </button>

        <ul className='flex flex-col gap-4'>
          {expenses.map((expense, index) => (
            <li key={index} className={`flex items-center p-4 rounded-box border shadow`}>
              <p className='font-bold'>{expense.name}</p>
              <p className='badge ml-2'>{expense.category}</p>
              <p className='ml-auto'>{expense.amount} €</p>
              <BsX
                className='w-6 h-6 text-error cursor-pointer ml-2'
                onClick={onDeleteExpense.bind(null, expense.name)}
              />
            </li>
          ))}
        </ul>
      </section>

      <dialog id='expenseModal' className='modal'>
        <form className='modal-box flex flex-col gap-4 max-w-md' action={addExpense}>
          <div className='flex gap-4'>
            <p>Category</p>
            <label className='inline-flex items-center gap-2'>
              <input type='radio' name='category' value='needs' className='radio' defaultChecked />
              <span>Needs</span>
            </label>
            <label className='inline-flex items-center gap-2'>
              <input type='radio' name='category' value='wants' className='radio' />
              <span>Wants</span>
            </label>
          </div>
          <label className='input input-bordered inline-flex items-center gap-2'>
            <span>Name</span>
            <input name='name' type='text' className='grow' placeholder='Internet' />
          </label>
          <label className='input input-bordered inline-flex items-center gap-2'>
            <span>Amount</span>
            <input name='amount' type='text' className='grow' placeholder='19.99' />
            <span>€</span>
          </label>
          <div className='flex justify-end gap-2'>
            <button type='submit' className='btn btn-primary'>
              Add expense
            </button>
          </div>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </main>
  )
}
