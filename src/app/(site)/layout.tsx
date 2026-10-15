import type { Metadata } from 'next'
import { Montserrat, Cormorant_Garamond } from 'next/font/google'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'
import { NavigationProgress } from '@/components/layout/NavigationProgress'
import '../globals.css'
import { META_DOMAIN_VERIFICATION } from '@/lib/metaDomainVerification'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600'],
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ?? 'https://vvmadvocacia.adv.br'

const siteName = 'Vanessa Vaz Marschallinger — Advocacia Previdenciária'
const siteDescription =
  'Advocacia previdenciária especializada em INSS — aposentadorias, benefícios por incapacidade, pensões e acordos bilaterais. Gunskirchen/Áustria e atendimento internacional.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s | Vanessa Vaz Marschallinger',
  },
  description: siteDescription,
  keywords: [
    'advogada previdenciária',
    'aposentadoria INSS',
    'direito previdenciário',
    'BPC LOAS',
    'pensão por morte',
    'revisão de benefícios',
    'auxílio por incapacidade',
    'previdência social',
    'Gunskirchen',
    'OAB RJ',
  ],
  authors: [{ name: 'Vanessa Vaz Marschallinger' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Vanessa Vaz Marschallinger — Advocacia Previdenciária',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${cormorantGaramond.variable}`}>
      <head>
        {/* Verificação do domínio no Business Manager da Meta. A tag fica literal aqui, e não no
            `metadata`: no `next dev` (e em páginas dinâmicas) o Next manda o metadata no corpo
            da página, e o verificador da Meta lê o HTML bruto procurando a tag dentro do <head>.
            Assim ela vale em qualquer renderização. */}
        <meta name="facebook-domain-verification" content={META_DOMAIN_VERIFICATION} />
      </head>
      <body className="font-body antialiased">
        <NavigationProgress />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
