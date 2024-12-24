'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'

import { addExpense } from '@/actions/add-expense'
import { sendFeedback } from '@/actions/send-feedback'
import { Budget, computeBudget } from '@/lib/budget'
import { Expense, deleteExpense, fetchExpenses, filterExpenses, sumExpenses } from '@/lib/expense'
import { fetchIncome, storeIncome } from '@/lib/income'

import BudgetCard from '../components/BudgetCard'

export default function Home() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])

  const [budget, setBudget] = useState<Budget | null>(null)

  useEffect(() => {
    const income = fetchIncome()
    const expenses = fetchExpenses()

    setIncome(income)
    setExpenses(expenses)
    setFilteredExpenses(expenses)
  }, [])

  useEffect(() => {
    const budget = computeBudget(income)

    setBudget(budget)
  }, [income])

  function onIncomeChange(event: ChangeEvent<HTMLInputElement>): void {
    const income = Number(event.target.value)
    const budget = computeBudget(income)

    storeIncome(income)
    setIncome(income)
    setBudget(budget)
  }

  function onSendFeedback(): void {
    const feedbackModal = document.getElementById('feedbackModal') as HTMLDialogElement
    feedbackModal.showModal()
  }

  function onAddExpense(): void {
    const expenseModal = document.getElementById('expenseModal') as HTMLDialogElement
    expenseModal.showModal()
  }

  function onDeleteExpense(name: string): void {
    deleteExpense(name)
  }

  function onViewAllExpenses(): void {
    setFilteredExpenses(expenses)
  }

  function onFilterExpenses(category: Expense['category']): void {
    const filteredExpenses = fetchExpenses().filter((expense) => expense.category === category)

    setFilteredExpenses(filteredExpenses)
  }

  if (!budget) return

  return (
    <main className='flex flex-col p-8 mx-auto max-w-lg'>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl font-bold'>Cashflow</h1>
        <button className='btn' onClick={onSendFeedback}>
          Feedback
        </button>
      </div>

      <p className='text-lg mt-8'>Manage your budget using the 50/30/20 rule.</p>

      <section className='flex flex-col gap-4'>
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
            <div className='stat-value'>
              {sumExpenses(filterExpenses(expenses, 'needs')).toLocaleString()} €
            </div>
            <div className='stat-desc'>
              {(budget.needs - sumExpenses(filterExpenses(expenses, 'needs'))).toLocaleString()} €
              left in the budget
            </div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Wants</div>
            <div className='stat-value'>
              {sumExpenses(filterExpenses(expenses, 'wants')).toLocaleString()} €
            </div>
            <div className='stat-desc'>
              {(budget.wants - sumExpenses(filterExpenses(expenses, 'wants'))).toLocaleString()} €
              left in the budget
            </div>
          </div>
        </div>

        <button className='btn btn-primary' onClick={onAddExpense}>
          Add recurring expense
        </button>

        <div className='flex gap-4 mt-6'>
          <label className='inline-flex items-center gap-2' onClick={onViewAllExpenses}>
            <input
              type='radio'
              name='view'
              value='all'
              className='radio radio-primary'
              defaultChecked
            />
            <span>All</span>
          </label>
          <label
            className='inline-flex items-center gap-2'
            onClick={onFilterExpenses.bind(null, 'needs')}>
            <input type='radio' name='view' value='needs' className='radio radio-primary' />
            <span>Needs</span>
          </label>
          <label
            className='inline-flex items-center gap-2'
            onClick={onFilterExpenses.bind(null, 'wants')}>
            <input type='radio' name='view' value='wants' className='radio radio-primary' />
            <span>Wants</span>
          </label>
        </div>

        <ul className='flex flex-col gap-4'>
          {filteredExpenses.map((expense, index) => (
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

      <p className='mt-8 text-sm text-center'>
        Your data is stored only inside your browser, so only you can access it. No one else can
        have access not even Cashflow.
      </p>

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

      <dialog id='feedbackModal' className='modal'>
        <form className='modal-box flex flex-col gap-4 max-w-md' action={sendFeedback}>
          <div className='flex gap-4'>
            <label className='inline-flex items-center gap-2'>
              <input type='radio' name='nature' value='bug' className='radio' defaultChecked />
              <span>Bug</span>
            </label>
            <label className='inline-flex items-center gap-2'>
              <input type='radio' name='nature' value='feature' className='radio' />
              <span>Feature</span>
            </label>
            <label className='inline-flex items-center gap-2'>
              <input type='radio' name='nature' value='other' className='radio' />
              <span>Other</span>
            </label>
          </div>

          <textarea
            name='content'
            className='textarea textarea-bordered'
            placeholder='Please type here...'
            maxLength={400}
            rows={7}
            style={{ resize: 'none' }}
            required></textarea>

          <button type='submit' className='btn btn-primary'>
            Send feedback
          </button>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </main>
  )
}
