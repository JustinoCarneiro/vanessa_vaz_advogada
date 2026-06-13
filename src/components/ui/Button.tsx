import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-block font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'text-white rounded-sm focus-visible:ring-[#89B0AF] disabled:bg-[#DDE4E3] disabled:text-[#8A9695]',
  secondary:
    'rounded-sm focus-visible:ring-[#BDE4DA]',
  ghost:
    'underline underline-offset-6 decoration-[1.5px] hover:decoration-[2.5px] focus-visible:ring-[#3D5C5F]',
}

const sizes: Record<Size, string> = {
  md: 'text-sm px-7 py-[13px]',
  lg: 'text-[15px] px-10 py-[17px]',
}

// Inline style maps (exact design values)
const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: { background: '#3D5C5F', color: '#FFFFFF' },
  secondary: { background: '#FFFFFF', color: '#3D5C5F' },
  ghost: { color: '#3D5C5F' },
}

const variantHoverStyles: Record<Variant, string> = {
  primary: 'hover:bg-[#2F484B]',
  secondary: 'hover:bg-[#BDE4DA]',
  ghost: 'hover:text-[#2F484B]',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    variantHoverStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={variantStyles[variant]}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      style={variantStyles[variant]}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
