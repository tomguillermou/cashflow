'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'

import ExpenseForm from '@/components/ExpenseForm'
import FeedbackButton from '@/components/FeedbackButton'
import { Expense, deleteExpense, fetchExpenses, filterExpenses, sumExpenses } from '@/lib/expense'
import { fetchIncome, storeIncome } from '@/lib/income'

import BudgetCard from '../components/BudgetCard'

export default function Home() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const income = fetchIncome()
    const expenses = fetchExpenses()

    setIncome(income)
    setExpenses(expenses)
  }, [])

  useEffect(() => {
    setFilteredExpenses(expenses)
  }, [expenses])

  function onIncomeChange(event: ChangeEvent<HTMLInputElement>): void {
    const income = Number(event.target.value)

    storeIncome(income)
    setIncome(income)
  }

  function onDeleteExpense(index: number): void {
    deleteExpense(index)

    setExpenses(fetchExpenses())
  }

  function onFilterExpenses(event: ChangeEvent<HTMLSelectElement>): void {
    let filteredExpenses: Expense[]

    if (
      event.target.value === 'needs' ||
      event.target.value === 'wants' ||
      event.target.value === 'savings'
    ) {
      filteredExpenses = filterExpenses(expenses, event.target.value)
    } else {
      filteredExpenses = [...expenses]
    }

    setFilteredExpenses(filteredExpenses)
  }

  return (
    <main className='flex flex-col p-8 gap-8 mx-auto max-w-xl'>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl font-bold'>Cashflow</h1>

        <FeedbackButton />
      </div>

      <div className='flex flex-col p-6 gap-4 rounded-box border shadow bg-base-100'>
        <label className='font-bold'>Monthly Income</label>
        <input
          type='text'
          className='input input-bordered'
          onChange={onIncomeChange}
          value={income}
        />
      </div>

      <BudgetCard
        title='Needs'
        income={income}
        ratio={0.5}
        spent={sumExpenses(filterExpenses(expenses, 'needs'))}
        tooltip='These are essential expenses for your daily life, such as rent, energy bills, phone bill, transportation, groceries, insurance, etc.'
      />
      <BudgetCard
        title='Wants'
        income={income}
        ratio={0.3}
        spent={sumExpenses(filterExpenses(expenses, 'wants'))}
        tooltip='These are non-essential expenses related to your leisure activites, such as restaurants, vacations, subscriptions (Netflix, Spotify, etc.), shopping, etc.'
      />
      <BudgetCard
        title='Savings'
        income={income}
        ratio={0.2}
        spent={sumExpenses(filterExpenses(expenses, 'savings'))}
        tooltip='This is the amount you set aside for unforeseen expenses, investments, or loan repayments.'
      />

      <ExpenseForm />

      <div className='flex items-center  mt-6'>
        <p className='text-2xl font-bold'>Recuring Expenses</p>
        <select className='select select-bordered ml-auto' onChange={onFilterExpenses}>
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
              <BsX className='w-6 h-6 text-error' onClick={onDeleteExpense.bind(null, index)} />
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
