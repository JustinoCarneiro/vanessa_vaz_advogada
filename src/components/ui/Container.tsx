interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** Largura máxima. Padrão 1168px (conteúdo de seção). Use 'wide' para 1280px (outer). */
  size?: 'default' | 'wide'
}

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  const maxW = size === 'wide' ? 'max-w-[1280px]' : 'max-w-[1168px]'
  return (
    <div className={`${maxW} mx-auto px-6 md:px-14 ${className}`}>
      {children}
    </div>
  )
}
