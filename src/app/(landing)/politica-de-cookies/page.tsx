import type { Metadata } from 'next'
import Link from 'next/link'
import CookieConsent from '@/components/landing/CookieConsent'
import CookiePreferencesButton from '@/components/landing/CookiePreferencesButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Política de Cookies | Vanessa Vaz Marschallinger',
  description: 'Como a página de previdência no exterior usa cookies e como você controla a sua escolha.',
  alternates: { canonical: '/politica-de-cookies' },
  robots: { index: true, follow: true },
}

export default function PoliticaDeCookiesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.back} href="/previdencia-no-exterior">← Voltar para a página</Link>
        <h1>Política de Cookies</h1>
        <p className={styles.updated}>Última atualização: 30 de setembro de 2026.</p>

        <h2>Quem é responsável</h2>
        <p>
          Esta página é mantida por Vanessa Vaz Marschallinger, advogada previdenciária (OAB/RJ 264.772),
          responsável pelo tratamento dos dados descritos aqui. Para falar sobre seus dados, use o
          botão de WhatsApp da página.
        </p>

        <h2>O que são cookies</h2>
        <p>
          Cookies são pequenos arquivos ou registros guardados no seu navegador. Alguns são necessários
          para o site funcionar; outros servem para medir o uso da página e o desempenho de anúncios.
        </p>

        <h2>Quais usamos</h2>
        <h3>Necessários (sempre ativos)</h3>
        <p>
          Guardamos neste aparelho, no armazenamento local do navegador, apenas a sua escolha sobre
          cookies (<code>vvm-consent-v1</code>). Esse registro não identifica você e não é enviado a terceiros.
        </p>
        <h3>Marketing: Meta Pixel (só com o seu aceite)</h3>
        <p>
          Se você aceitar, carregamos o Meta Pixel, da Meta Platforms. Ele grava cookies como o{' '}
          <code>_fbp</code> (identificador do navegador, por até 90 dias) e, quando você chega por um
          anúncio, o <code>_fbc</code>. Registramos somente dois eventos padrão: a visualização da página
          (<code>PageView</code>) e o clique no botão de WhatsApp (<code>Contact</code>).
        </p>
        <p>
          Com isso a Meta recebe identificadores do navegador, o endereço IP, a página acessada e o
          evento. Não enviamos seu nome, telefone nem o conteúdo da conversa no WhatsApp. A Meta pode
          tratar esses dados fora da União Europeia e do Brasil, sob as salvaguardas que ela adota.
          Usamos essas informações para saber quantas pessoas visitam a página e quantas clicam no
          WhatsApp, e para melhorar a campanha.
        </p>

        <h2>Base legal</h2>
        <p>
          O uso do Meta Pixel depende do seu consentimento (art. 6º, 1, “a”, do GDPR, e art. 7º, I, da
          LGPD). Sem o seu aceite, o pixel não é carregado e nenhum cookie de marketing é criado.
        </p>

        <h2>Como mudar a sua escolha</h2>
        <p>
          Você pode recusar, aceitar ou alterar a escolha a qualquer momento em{' '}
          <CookiePreferencesButton className={styles.inlineButton} />, disponível no fim da página.
          Retirar o consentimento não afeta o que foi feito antes. Você também pode apagar os cookies
          nas configurações do navegador.
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode pedir acesso, correção ou eliminação dos seus dados, entre outros direitos previstos
          no GDPR e na LGPD. Também pode reclamar à autoridade de proteção de dados do país onde vive
          (no Brasil, a ANPD).
        </p>

        <h2>Mudanças nesta política</h2>
        <p>Se algo mudar, atualizamos esta página e a data acima.</p>
      </div>
      <CookieConsent />
    </main>
  )
}
