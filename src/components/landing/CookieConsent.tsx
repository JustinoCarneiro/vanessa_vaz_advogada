'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { readConsent, saveConsent } from '@/lib/consent'
import { clearPixelCookies, isPixelActive, loadPixel } from '@/lib/metaPixel'
import { OPEN_PREFERENCES_EVENT } from './CookiePreferencesButton'
import styles from './CookieConsent.module.css'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [managing, setManaging] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const focusOnOpen = useRef(false)

  useEffect(() => {
    const consent = readConsent()
    if (consent?.marketing) loadPixel()
    setMarketing(Boolean(consent?.marketing))
    setOpen(!consent)

    const reopen = () => {
      setMarketing(Boolean(readConsent()?.marketing))
      setManaging(true)
      focusOnOpen.current = true
      setOpen(true)
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false
      titleRef.current?.focus()
    }
  }, [open, managing])

  function decide(accepted: boolean) {
    const hadPixel = isPixelActive()
    saveConsent(accepted)
    setMarketing(accepted)
    setOpen(false)
    setManaging(false)
    if (accepted) {
      loadPixel()
    } else if (hadPixel) {
      // o pixel já rodou nesta abertura: limpa os cookies e recarrega sem ele
      clearPixelCookies()
      window.location.reload()
    }
  }

  if (!open) return null

  return (
    <section className={styles.banner} role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <h2 id="cookie-title" ref={titleRef} tabIndex={-1} className={styles.title}>Cookies e privacidade</h2>
      <p className={styles.text}>
        Usamos cookies de marketing (Meta Pixel) para medir os acessos e os cliques no WhatsApp. Eles só
        são ativados se você aceitar. Saiba mais na <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      {managing ? (
        <>
          <fieldset className={styles.options}>
            <legend className={styles.legend}>Escolha os cookies</legend>
            <label className={styles.option}>
              <input type="checkbox" checked disabled readOnly />
              <span>
                <strong>Cookies necessários</strong>
                <small>Guardam a sua escolha neste aparelho. Sempre ativos.</small>
              </span>
            </label>
            <label className={styles.option}>
              <input type="checkbox" checked={marketing} onChange={event => setMarketing(event.target.checked)} />
              <span>
                <strong>Cookies de marketing (Meta Pixel)</strong>
                <small>Medem visitas e cliques no botão de WhatsApp para melhorar os anúncios.</small>
              </span>
            </label>
          </fieldset>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => decide(marketing)}>Salvar preferências</button>
            <button type="button" className={styles.link} onClick={() => setManaging(false)}>Voltar</button>
          </div>
        </>
      ) : (
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => decide(true)}>Aceitar</button>
          <button type="button" className={styles.button} onClick={() => decide(false)}>Recusar</button>
          <button type="button" className={styles.link} onClick={() => setManaging(true)}>Gerenciar preferências</button>
        </div>
      )}
    </section>
  )
}
