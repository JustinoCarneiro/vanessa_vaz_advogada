/**
 * Gera /public/og-image.png (1200×630) com a identidade VVM.
 * Usa sharp, que já é dependência do projeto.
 *
 * Uso:  npm run generate-og
 */

import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">

  <!-- Fundo teal escuro -->
  <rect width="1200" height="630" fill="#3D5C5F"/>

  <!-- Bloco decorativo direita -->
  <circle cx="1080" cy="315" r="340" fill="#2F484B"/>
  <circle cx="1120" cy="100" r="130" fill="#89B0AF" opacity="0.18"/>
  <circle cx="980"  cy="530" r="90"  fill="#BDE4DA"  opacity="0.10"/>

  <!-- Barra menta lateral esquerda -->
  <rect x="0" y="0" width="6" height="630" fill="#BDE4DA"/>

  <!-- Nome -->
  <text x="80" y="222"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72"
    font-weight="700"
    fill="#FFFFFF"
    letter-spacing="-1">Vanessa Vaz</text>

  <text x="80" y="308"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72"
    font-weight="700"
    fill="#FFFFFF"
    letter-spacing="-1">Marschallinger</text>

  <!-- Especialidade -->
  <text x="82" y="368"
    font-family="Arial, Helvetica, sans-serif"
    font-size="22"
    font-weight="400"
    fill="#BDE4DA"
    letter-spacing="5">ADVOCACIA PREVIDENCIÁRIA</text>

  <!-- Linha separadora -->
  <rect x="80" y="398" width="100" height="2" fill="#BDE4DA" opacity="0.6"/>

  <!-- Descrição -->
  <text x="80" y="448"
    font-family="Arial, Helvetica, sans-serif"
    font-size="21"
    fill="rgba(255,255,255,0.82)">Aposentadorias · BPC/LOAS · Pensão por Morte</text>

  <text x="80" y="482"
    font-family="Arial, Helvetica, sans-serif"
    font-size="21"
    fill="rgba(255,255,255,0.82)">Benefícios por Incapacidade · Revisão de Benefícios</text>

  <!-- Localização -->
  <text x="80" y="575"
    font-family="Arial, Helvetica, sans-serif"
    font-size="17"
    fill="rgba(255,255,255,0.50)">Florianópolis / SC  ·  Atendimento online em todo o Brasil</text>

</svg>`

const out = resolve(__dirname, '..', 'public', 'og-image.png')

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ quality: 90, compressionLevel: 8 })
  .toFile(out)

console.log(`✅  OG image gerada em: ${out}`)
