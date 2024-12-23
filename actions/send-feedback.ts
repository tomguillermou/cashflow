'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'

import EmailTemplate from '@/components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendFeedback(formData: FormData) {
  const feedback = feedbackSchema.parse({
    nature: formData.get('nature'),
    content: formData.get('content'),
  })

  const { error } = await resend.emails.send({
    from: 'feedback@daytaflow.com',
    to: 'tomguillermou@gmail.com',
    subject: `Cashflow - ${feedback.nature}`,
    react: EmailTemplate({ content: feedback.content }),
  })

  if (error) {
    throw new Error('Impossible to send feedback')
  }

  redirect('/')
}

const feedbackSchema = z.object({
  nature: z.string(),
  content: z.string(),
})
