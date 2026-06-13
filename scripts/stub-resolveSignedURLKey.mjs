/**
 * Stub client-side para resolveSignedURLKey.
 *
 * O handler de upload do plugin Vercel Blob (VercelBlobClientUploadHandler) é
 * sempre registrado no importMap do admin. Ele importa `getFileKey` do barrel
 * `@payloadcms/plugin-cloud-storage/utilities`, que também reexporta
 * `resolveSignedURLKey` — e esse último importa `payload/internal` (código
 * server, que arrasta pino → node:assert/worker_threads para o bundle client,
 * quebrando o build do webpack).
 *
 * Como `clientUploads` está desligado, o handler nunca executa no client, então
 * substituímos resolveSignedURLKey por este stub apenas no bundle do browser.
 */
export const resolveSignedURLKey = () => {
  throw new Error('resolveSignedURLKey não está disponível no client (clientUploads desativado).')
}
