'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'

import EmailTemplate from '@/components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendFeedback(formData: FormData) {
  const nature = formData.get('nature') as string
  const content = formData.get('content') as string

  const { error } = await resend.emails.send({
    from: 'feedback@daytaflow.com',
    to: 'tomguillermou@gmail.com',
    subject: `Cashflow - ${nature}`,
    react: EmailTemplate({ content }),
  })

  if (error) {
    throw new Error('Impossible to send feedback')
  }

  redirect('/')
}
