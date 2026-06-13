import Image from 'next/image'

type LogoVariant = 'dourado' | 'branco'

interface LogoProps {
  variant?: LogoVariant
  /** Altura em px — largura é calculada automaticamente (width: auto) */
  height?: number
  className?: string
  priority?: boolean
}

const variantMap: Record<LogoVariant, { src: string }> = {
  /** Logo dourado — uso: header sobre fundo branco ou claro */
  dourado: { src: '/logo-dourado.png' },
  /** Logo branco — uso: header/footer sobre fundo teal escuro */
  branco: { src: '/logo-teal.png' },
}

const alt = 'Vanessa Vaz Marschallinger — Advocacia Previdenciária'

export function Logo({
  variant = 'branco',
  height = 52,
  className,
  priority = false,
}: LogoProps) {
  const { src } = variantMap[variant]

  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={240}
      style={{ height: `${height}px`, width: 'auto' }}
      className={className}
      priority={priority}
    />
  )
}
