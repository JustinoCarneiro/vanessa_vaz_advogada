'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Category {
  slug: string
  name: string
}

interface CategoryPillsProps {
  categories: Category[]
  activeSlug?: string
}

export function CategoryPills({ categories, activeSlug }: CategoryPillsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const all = [{ slug: '', name: 'Todas' }, ...categories]

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('cat', slug)
    } else {
      params.delete('cat')
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      className="flex flex-wrap gap-3 justify-center"
      role="group"
      aria-label="Filtrar por categoria"
    >
      {all.map(({ slug, name }) => {
        const selected = slug === (activeSlug ?? '')
        return (
          <button
            key={slug || 'all'}
            type="button"
            onClick={() => handleSelect(slug)}
            aria-pressed={selected}
            className="text-[13px] font-semibold tracking-[0.03em] px-5 py-[10px] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3D5C5F] focus-visible:outline-offset-3"
            style={
              selected
                ? { color: '#FFFFFF', background: '#3D5C5F', border: '1px solid #3D5C5F' }
                : { color: '#3D5C5F', background: '#FFFFFF', border: '1px solid #89B0AF' }
            }
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}
