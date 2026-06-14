import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export function ExteriorSection() {
  return (
    <section className="py-[88px] relative overflow-hidden" style={{ background: '#F7FAF9' }}>
      <Container>
        <div className="grid md:grid-cols-[1fr_400px] gap-12 items-center max-w-[1056px] mx-auto">
          {/* Texto Principal */}
          <div>
            <p
              className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: '#3D5C5F' }}
            >
              Atendimento Internacional
            </p>
            <h2
              className="font-display font-semibold mb-5 text-[#111111]"
              style={{
                fontFamily: 'var(--font-display), Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 46px)',
                lineHeight: 1.15,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              Você mora fora do Brasil?
            </h2>
            <p className="text-[16.5px] leading-[1.7] mb-8" style={{ color: '#333333', textWrap: 'pretty' } as React.CSSProperties}>
              Conte com uma assessoria especializada em acordos previdenciários internacionais,
              soma de tempo de contribuição e planejamento para aposentadoria em múltiplos países.
              Entendemos a realidade de quem mora na Europa, Américas e Ásia, com fuso horário alinhado
              e atendimento 100% digital e seguro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/brasileiros-no-exterior"
                className="inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: '#3D5C5F',
                  color: '#FFFFFF',
                  padding: '16px 36px',
                  borderRadius: 4,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Como funciona para o exterior →
              </Link>
            </div>
          </div>

          {/* Destaque Visual / Miniatura */}
          <div className="relative flex justify-center">
            {/* Globo Icon / Grafismo */}
            <div className="relative z-10 w-full aspect-square max-w-[320px] rounded-full flex items-center justify-center" style={{ background: '#BDE4DA', border: '1px solid #89B0AF' }}>
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#3D5C5F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.8 }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            
            {/* Elemento de decoração flutuante */}
            <div className="absolute top-10 right-0 md:-right-8 bg-white p-4 rounded shadow-lg border border-[#EDF1F0] z-20 flex items-center gap-3 animate-pulse" style={{ animationDuration: '4s' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#89B0AF" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider font-semibold m-0 leading-tight">Atendimento</p>
                <p className="text-sm text-[#111111] font-medium m-0 leading-tight">Via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
