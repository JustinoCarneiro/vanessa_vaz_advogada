import fs from 'fs'
import path from 'path'
import { META_DOMAIN_VERIFICATION } from '@/lib/metaDomainVerification'

const root = path.resolve(__dirname, '../../..')

describe('M08 — verificação do domínio no Business Manager da Meta', () => {
  it('usa o código gerado pela Meta para vanessavazadv.com.br', () => {
    expect(META_DOMAIN_VERIFICATION).toBe('dan0rpptj618givpi13s3y9ptc4qpr')
  })

  it('o layout do site (que serve a página inicial) põe a metatag direto no <head>, não pelo metadata do Next', () => {
    const layout = fs.readFileSync(path.join(root, 'src/app/(site)/layout.tsx'), 'utf-8')
    expect(layout).toMatch(/<head>[\s\S]*<meta name="facebook-domain-verification" content=\{META_DOMAIN_VERIFICATION\} \/>[\s\S]*<\/head>/)
    // pelo metadata, no `next dev` (e em páginas dinâmicas) o Next a manda no corpo (streaming)
    expect(layout).not.toMatch(/other:\s*\{\s*'facebook-domain-verification'/)
  })
})
