import * as React from 'react'

export default function EmailTemplate({ content }: EmailTemplateProps) {
  return (
    <div>
      <p>{content}</p>
    </div>
  )
}

interface EmailTemplateProps {
  content: string
}
