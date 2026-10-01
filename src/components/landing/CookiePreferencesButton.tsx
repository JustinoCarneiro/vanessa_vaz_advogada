'use client'

export const OPEN_PREFERENCES_EVENT = 'vvm:open-cookie-preferences'

export default function CookiePreferencesButton({ className }: { className: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}>
      Preferências de cookies
    </button>
  )
}
