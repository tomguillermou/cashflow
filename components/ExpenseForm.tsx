import { useState } from 'react'

import { Expense, storeExpense, validateExpense } from '@/lib/expense'

interface ExpenseFormProps {
  onExpenseAdded: (expense: Expense) => void
}

export default function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const [category, setCategory] = useState('needs')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const expense = validateExpense({
      category,
      name,
      amount: Number(amount),
    })

    storeExpense(expense)

    onExpenseAdded(expense)

    setCategory('needs')
    setName('')
    setAmount('')
  }

  return (
    <form
      className='flex flex-col p-6 rounded-box border shadow bg-base-100'
      onSubmit={handleSubmit}>
      <h2 className='text-2xl font-bold'>Add Expense</h2>

      <label className='mt-6 mb-2 font-bold'>Category</label>
      <select
        name='category'
        className='select select-bordered'
        value={category}
        onChange={(e) => setCategory(e.target.value)}>
        <option value='needs'>Needs</option>
        <option value='wants'>Wants</option>
        <option value='savings'>Savings</option>
      </select>

      <label className='mt-4 mb-2 font-bold'>Description</label>
      <input
        name='name'
        type='text'
        className='input input-bordered'
        placeholder='Enter description'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className='mt-4 mb-2 font-bold'>Amount</label>
      <input
        name='amount'
        type='number'
        className='input input-bordered'
        placeholder='Enter amount'
        step={0.01}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type='submit' className='btn btn-primary mt-4 text-lg'>
        + Add Expense
      </button>
    </form>
  )
}
