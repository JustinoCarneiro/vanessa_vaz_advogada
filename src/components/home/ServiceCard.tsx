interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div
      className="flex flex-col gap-4 transition-all hover:-translate-y-1"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDF1F0',
        borderRadius: 8,
        padding: '36px 32px',
      }}
    >
      <div
        className="w-[52px] h-[52px] flex items-center justify-center rounded-full"
        style={{ background: '#BDE4DA' }}
      >
        {icon}
      </div>
      <h3
        className="font-semibold leading-[1.25] text-[#111111]"
        style={{
          fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
          fontSize: 21,
        }}
      >
        {title}
      </h3>
      <p className="text-[15px] leading-[1.65] text-[#444444] flex-1">{description}</p>
    </div>
  )
}
