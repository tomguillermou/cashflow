import { sendFeedback } from '@/actions/send-feedback'

export default function FeedbackButton() {
  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-primary btn-outline m-1'>
        Feedback
      </div>
      <form
        tabIndex={0}
        className='dropdown-content flex flex-col gap-4 p-6 z-[1] w-96 bg-base-100 border rounded-box shadow-xl'
        action={sendFeedback}>
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
    </div>
  )
}
