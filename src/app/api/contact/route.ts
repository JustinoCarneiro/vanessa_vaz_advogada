import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const { name, email, phone, subject, message } = body as {
    name?: string
    email?: string
    phone?: string
    subject?: string
    message?: string
  }

  // Validação
  const errors: Record<string, string> = {}
  if (!name?.trim()) errors.name = 'Informe seu nome.'
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Informe um email válido.'
  }
  if (phone?.trim()) {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) errors.phone = 'Telefone inválido — use DDD + número.'
  }
  if (!subject?.trim()) errors.subject = 'Selecione o assunto.'
  if (!message?.trim() || message.trim().length < 20) {
    errors.message = 'Conte um pouco mais sobre a sua situação (mínimo de 20 caracteres).'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    // Salva no Payload (ContactMessages) — sempre, independente do email
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-messages',
      data: {
        name: name!.trim(),
        email: email!.trim(),
        phone: phone?.trim() || undefined,
        subject: subject!.trim(),
        message: message!.trim(),
        read: false,
      },
    })

    // Envia email via Resend — falha silenciosamente se a chave não estiver configurada
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_xxx')) {
      console.warn('[api/contact] RESEND_API_KEY não configurada — email não enviado (mensagem salva no painel).')
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.CONTACT_EMAIL_TO ?? 'contato@vvmadvocacia.adv.br'
    await resend.emails.send({
      from: 'Site VVM Advocacia <no-reply@vvmadvocacia.adv.br>',
      to,
      replyTo: email!.trim(),
      subject: `[Site] ${subject} — ${name}`,
      html: `
        <div style="font-family: Montserrat, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #222222;">
          <div style="background: #3D5C5F; padding: 20px 28px; border-radius: 6px 6px 0 0; margin-bottom: 0;">
            <h2 style="font-family: Georgia, serif; font-size: 22px; color: #FFFFFF; margin: 0;">Nova mensagem pelo site</h2>
          </div>
          <div style="border: 1px solid #E4EAE9; border-top: none; border-radius: 0 0 6px 6px; padding: 28px; background: #FFFFFF;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr><td style="padding: 10px 0; color: #555555; width: 120px; font-weight: 600;">Nome</td><td style="padding: 10px 0;">${name}</td></tr>
              <tr><td style="padding: 10px 0; color: #555555; font-weight: 600;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #3D5C5F;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 10px 0; color: #555555; font-weight: 600;">Telefone</td><td style="padding: 10px 0;">${phone}</td></tr>` : ''}
              <tr><td style="padding: 10px 0; color: #555555; font-weight: 600;">Assunto</td><td style="padding: 10px 0;">${subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #EDF1F0; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-weight: 600; color: #555555;">Mensagem:</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #999999; margin-top: 20px; text-align: center;">VVM Advocacia Previdenciária · Florianópolis / SC</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[api/contact] Erro ao processar mensagem:', err)
    return NextResponse.json(
      { error: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
