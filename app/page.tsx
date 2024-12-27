'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsX } from 'react-icons/bs'

import ExpenseForm from '@/components/ExpenseForm'
import {
  Expense,
  deleteExpense,
  fetchExpenses,
  filterExpensesByCategory,
  sumExpenses,
} from '@/lib/expense'
import { fetchIncome, storeIncome } from '@/lib/income'

import BudgetCard from '../components/BudgetCard'

export default function Home() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])

  useEffect(() => {
    loadIncome()
    loadExpenses()
  }, [])

  function onIncomeChange(event: ChangeEvent<HTMLInputElement>) {
    const income = Number(event.target.value)

    setIncome(income)
    storeIncome(income)
  }

  function onFilterExpenses(event: ChangeEvent<HTMLSelectElement>) {
    const filter = event.target.value

    if (filter === 'needs' || filter === 'wants' || filter === 'savings') {
      setFilteredExpenses(filterExpensesByCategory(expenses, filter))
    } else {
      setFilteredExpenses(expenses)
    }
  }

  function onDeleteExpense(expense: Expense) {
    deleteExpense(expense.id)
    toast.success(`Deleted ${expense.name} from ${expense.category}`)

    loadExpenses()
  }

  function onAddExpense(expense: Expense) {
    toast.success(`Added ${expense.name} to ${expense.category}`)

    loadExpenses()
  }

  function loadIncome() {
    const income = fetchIncome()

    setIncome(income)
  }

  function loadExpenses() {
    const expenses = fetchExpenses()

    setExpenses(expenses)
    setFilteredExpenses(expenses)

    const filterElement = document.getElementById('filter') as HTMLSelectElement | null

    if (filterElement) {
      filterElement.selectedIndex = 0
    }
  }

  return (
    <main className='flex flex-col p-8 gap-8 mx-auto max-w-3xl'>
      <h1 className='text-5xl font-bold text-center'>Cashflow</h1>

      <p className='text-lg text-center'>
        Plan your budget. Track monthly expenses. Achieve your financial goals.
      </p>

      <div className='flex flex-col mt-6 p-6 gap-4 rounded-box border shadow bg-base-100'>
        <label className='font-bold'>Monthly Income</label>
        <input
          type='text'
          className='input input-bordered'
          onChange={onIncomeChange}
          value={income}
        />
      </div>

      <section className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <BudgetCard
          title='Needs'
          income={income}
          ratio={0.5}
          spent={sumExpenses(filterExpensesByCategory(expenses, 'needs'))}
          tooltip='These are essential expenses for your daily life, such as rent, energy bills, phone bill, transportation, groceries, insurance, etc.'
        />
        <BudgetCard
          title='Wants'
          income={income}
          ratio={0.3}
          spent={sumExpenses(filterExpensesByCategory(expenses, 'wants'))}
          tooltip='These are non-essential expenses related to your leisure activites, such as restaurants, vacations, subscriptions (Netflix, Spotify, etc.), shopping, etc.'
        />
        <BudgetCard
          title='Savings'
          income={income}
          ratio={0.2}
          spent={sumExpenses(filterExpensesByCategory(expenses, 'savings'))}
          tooltip='This is the amount you set aside for unforeseen expenses, investments, or loan repayments.'
        />
      </section>

      <ExpenseForm onExpenseAdded={onAddExpense} />

      <div className='flex items-center mt-6'>
        <p className='text-2xl font-bold'>Monthly Expenses</p>
        <select
          id='filter'
          className='select select-bordered ml-auto'
          onChange={onFilterExpenses}
          defaultValue={'all'}>
          <option value='all'>All</option>
          <option value='needs'>Needs</option>
          <option value='wants'>Wants</option>
          <option value='savings'>Savings</option>
        </select>
      </div>

      <ul className='flex flex-col gap-4'>
        {filteredExpenses.map((expense, index) => (
          <li key={index} className={`flex items-center p-4 rounded-box border shadow bg-base-100`}>
            <p className='font-bold'>{expense.name}</p>
            <p className='badge ml-2'>{expense.category}</p>
            <p className='ml-auto'>{expense.amount} €</p>

            <div className='tooltip cursor-pointer ml-2 ' data-tip='Delete'>
              <BsX className='w-6 h-6 text-error' onClick={onDeleteExpense.bind(null, expense)} />
            </div>
          </li>
        ))}
      </ul>

      <p className='mt-8 text-sm text-center'>
        All your data is stored exclusively in your browser, making it inaccessible to Cashflow.
      </p>
    </main>
  )
}
