export default function Collapse({ title, text }: CollapseProps) {
  return (
    <details className='collapse p-2 shadow bg-base-200'>
      <summary className='collapse-title font-bold'>+ {title}</summary>
      <div className='collapse-content'>
        <p>{text}</p>
      </div>
    </details>
  )
}

interface CollapseProps {
  title: string
  text: string
}
