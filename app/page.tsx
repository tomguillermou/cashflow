'use client'

import { ChangeEvent, useState } from 'react'
import { LuClapperboard, LuPiggyBank, LuReceiptEuro } from 'react-icons/lu'

import { Budget, computeBudget, fetchIncome, storeIncome } from '@/lib/budget'

import BudgetCard from './components/BudgetCard'
import Collapse from './components/Collapse'

export default function Home() {
  const [income, setIncome] = useState(fetchIncome())
  const [budget, setBudget] = useState<Budget>(computeBudget(income))

  function onIncomeChange(event: ChangeEvent<HTMLInputElement>): void {
    const income = Number(event.target.value)
    const budget = computeBudget(income)

    storeIncome(income)
    setIncome(income)
    setBudget(budget)
  }

  return (
    <main className='flex flex-col p-8'>
      <h1 className='text-5xl font-bold'>Cashflow</h1>

      <section className='flex flex-col justify-around max-w-lg mt-8 gap-4'>
        <h2 className='text-3xl mt-4 mb-4'>Budget</h2>

        <div className='flex flex-col p-6 gap-2 rounded-box shadow bg-base-200'>
          <label className='text-lg font-bold'>Income</label>
          <div className='input input-bordered flex items-center text-xl'>
            <input type='text' className='grow' onChange={onIncomeChange} value={income} />€
          </div>
        </div>

        <BudgetCard title='Needs' description='50% of the budget' value={budget.needs} />
        <BudgetCard title='Wants' description='30% of the budget' value={budget.wants} />
        <BudgetCard title='Savings' description='20% of the budget' value={budget.savings} />

        <h2 className='text-3xl mt-6 mb-4'>Questions</h2>

        <Collapse
          title='What are "Needs"?'
          text='These are essential expenses for your daily life, such as rent, energy bills, phone bill, transportation, groceries, insurance, etc.'
        />
        <Collapse
          title='What are "Wants"?'
          text='These are non-essential expenses related to your leisure activites, such as restaurants, vacations, subscriptions (Netflix, Spotify, etc.), shopping, etc.'
        />
        <Collapse
          title='What are "Savings"?'
          text='This is the amount you set aside for unforeseen expenses, investments, or loan repayments.'
        />
      </section>
    </main>
  )
}
