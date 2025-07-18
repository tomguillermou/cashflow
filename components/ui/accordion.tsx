export function Accordion({ children, name }: { name: string; children: React.ReactNode }) {
  return (
    <div className="bg-base-100 border-base-300 collapse-arrow collapse border">
      <input type="radio" name={name} />
      {children}
    </div>
  );
}

export function AccordionTitle({ children }: { children: React.ReactNode }) {
  return <div className="collapse-title font-semibold">{children}</div>;
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div className="collapse-content text-sm">{children}</div>;
}
