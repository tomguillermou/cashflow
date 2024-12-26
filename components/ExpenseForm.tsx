import { addExpense } from '@/actions/add-expense'

export default function ExpenseForm() {
  return (
    <form className='flex flex-col p-6 rounded-box border shadow bg-base-100' action={addExpense}>
      <h2 className='text-2xl font-bold'>Add Expense</h2>

      <label className='mt-6 mb-2 font-bold'>Category</label>
      <select name='category' className='select select-bordered'>
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
        required
      />

      <label className='mt-4 mb-2 font-bold'>Amount</label>
      <input
        name='amount'
        type='number'
        className='input input-bordered'
        placeholder='Enter amount'
        step={0.01}
        required
      />

      <button type='submit' className='btn btn-primary mt-4 text-lg'>
        + Add Expense
      </button>
    </form>
  )
}
