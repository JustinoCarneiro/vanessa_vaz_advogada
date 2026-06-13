'use client'
import { useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const ASSUNTO_OPTIONS = [
  'Aposentadoria',
  'Aposentadoria Especial',
  'Benefício por Incapacidade',
  'BPC / LOAS',
  'Pensão por Morte',
  'Revisão de Benefício',
  'Outro assunto',
]

const inputBase: React.CSSProperties = {
  fontFamily: 'var(--font-body), Montserrat, sans-serif',
  fontSize: 15,
  color: '#111111',
  background: '#FFFFFF',
  width: '100%',
  outline: 'none',
}

function fieldBorder(err?: string) {
  return err ? '1.5px solid #B3261E' : '1px solid #C7D2D0'
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <div className="flex items-center gap-[6px] text-[13px]" style={{ color: '#B3261E' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B3261E" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <circle cx="12" cy="16.5" r="0.5" fill="#B3261E" />
      </svg>
      {msg}
    </div>
  )
}

function validate(f: FormState, attempted: boolean): Errors {
  if (!attempted) return {}
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Informe seu nome.'
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    e.email = 'Informe um email válido.'
  }
  if (f.phone.trim()) {
    const digits = f.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) e.phone = 'Telefone inválido — use DDD + número.'
  }
  if (!f.subject) e.subject = 'Selecione o assunto.'
  if (f.message.trim().length < 20) e.message = 'Conte um pouco mais sobre a sua situação (mínimo de 20 caracteres).'
  return e
}

export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
  })
  const [attempted, setAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const errors = validate(form, attempted)
  const hasErrors = Object.keys(errors).length > 0
  const showBanner = attempted && hasErrors && !submitted

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    const errs = validate(form, true)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setServerError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setServerError(data.error ?? 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      setServerError('Falha na conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setForm({ name: '', email: '', phone: '', subject: defaultSubject, message: '' })
    setAttempted(false)
    setSubmitted(false)
    setServerError(null)
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center text-center rounded-sm py-16 px-12"
        style={{ background: '#BDE4DA' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: '#3D5C5F' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h2
          className="font-display font-semibold text-[32px] text-[#111111] mb-3"
          style={{ fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif' }}
        >
          Mensagem enviada!
        </h2>
        <p className="text-[16px] leading-[1.7] text-[#2A3F41] mb-7 max-w-[400px]" style={{ textWrap: 'pretty' } as React.CSSProperties}>
          Obrigada pelo contato. Sua situação será analisada com atenção e você recebe retorno
          em até 1 dia útil no email informado.
        </p>
        <button
          onClick={reset}
          className="text-[14px] font-semibold transition-colors hover:bg-[#F0F4F3]"
          style={{
            color: '#3D5C5F',
            background: '#FFFFFF',
            border: 'none',
            padding: '14px 28px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Banner de erro geral */}
      {(showBanner || serverError) && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-sm px-[18px] py-4"
          style={{ background: '#FBEDEB', border: '1px solid #E5B9B3' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B3261E" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <circle cx="12" cy="16.5" r="0.5" fill="#B3261E" />
          </svg>
          <span className="text-[14px] leading-[1.5]" style={{ color: '#7A1C15' }}>
            {serverError ?? 'Alguns campos precisam de atenção — confira os destaques abaixo.'}
          </span>
        </div>
      )}

      {/* Nome + Email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className="text-[14px] font-semibold text-[#111111]">
            Nome completo *
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Seu nome"
            required
            style={{ ...inputBase, height: 52, border: fieldBorder(errors.name), borderRadius: 6, padding: '0 16px' }}
          />
          <FieldError msg={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className="text-[14px] font-semibold text-[#111111]">
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="voce@email.com"
            required
            style={{ ...inputBase, height: 52, border: fieldBorder(errors.email), borderRadius: 6, padding: '0 16px' }}
          />
          <FieldError msg={errors.email} />
        </div>
      </div>

      {/* Telefone + Assunto */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-phone" className="text-[14px] font-semibold text-[#111111]">
            Telefone <span className="font-normal" style={{ color: '#555555' }}>(opcional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="(48) 99999-0000"
            style={{ ...inputBase, height: 52, border: fieldBorder(errors.phone), borderRadius: 6, padding: '0 16px' }}
          />
          <FieldError msg={errors.phone} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-subject" className="text-[14px] font-semibold text-[#111111]">
            Assunto *
          </label>
          <div className="relative">
            <select
              id="cf-subject"
              value={form.subject}
              onChange={set('subject')}
              required
              style={{
                ...inputBase,
                height: 52,
                border: fieldBorder(errors.subject),
                borderRadius: 6,
                padding: '0 44px 0 16px',
                appearance: 'none',
                cursor: 'pointer',
                color: form.subject ? '#111111' : '#8A9695',
              }}
            >
              <option value="">Selecione o assunto…</option>
              {ASSUNTO_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#3D5C5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            >
              <path d="M6 9.5l6 6 6-6" />
            </svg>
          </div>
          <FieldError msg={errors.subject} />
        </div>
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className="text-[14px] font-semibold text-[#111111]">
          Mensagem *
        </label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={set('message')}
          placeholder="Descreva sua situação: qual benefício, o que aconteceu com o INSS e desde quando."
          rows={6}
          required
          style={{
            ...inputBase,
            border: fieldBorder(errors.message),
            borderRadius: 6,
            padding: '14px 16px',
            lineHeight: 1.6,
            resize: 'vertical',
            minHeight: 140,
          }}
        />
        <FieldError msg={errors.message} />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-5 mt-1">
        <button
          type="submit"
          disabled={loading}
          className="text-[15px] font-semibold tracking-[0.04em] transition-colors hover:bg-[#2F484B] disabled:cursor-not-allowed"
          style={{
            color: loading ? '#8A9695' : '#FFFFFF',
            background: loading ? '#DDE4E3' : '#3D5C5F',
            border: 'none',
            padding: '17px 44px',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Enviando…' : 'Enviar Mensagem'}
        </button>
        <span className="text-[13px]" style={{ color: '#3D5C5F' }}>
          Retorno em até 1 dia útil
        </span>
      </div>
    </form>
  )
}
