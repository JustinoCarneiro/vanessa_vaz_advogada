'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
}

export function SearchBar({
  defaultValue = '',
  placeholder = 'Buscar artigos — ex.: aposentadoria, perícia, BPC…',
}: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      if (e.target.value) {
        params.set('q', e.target.value)
      } else {
        params.delete('q')
      }
      params.delete('page')
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="relative max-w-[560px] mx-auto">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3D5C5F"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.5-4.5" />
      </svg>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Buscar artigos"
        className="w-full h-[58px] rounded-md pl-[52px] pr-6 text-[15px] text-[#111111] outline-none focus:ring-[3px] focus:ring-[#3D5C5F] focus:ring-offset-1"
        style={{
          border: '1px solid #FFFFFF',
          background: '#FFFFFF',
          fontFamily: 'var(--font-body), Montserrat, sans-serif',
          boxShadow: '0 6px 18px rgba(61,92,95,0.12)',
        }}
      />
    </div>
  )
}
