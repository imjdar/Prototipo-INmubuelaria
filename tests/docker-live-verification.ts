/**
 * VERIFICACIÓN EN VIVO DE CONTENEDORES DOCKER
 * PROPIEDADES PREMIER / Producción Nginx + Backend Express + SQLite
 * 
 * 1. Comprueba conectividad HTTP y Reverse Proxy Nginx en http://localhost:8080
 * 2. Carga la SPA de producción con Google Chrome Puppeteer en http://localhost:8080
 * 3. Ejecuta test de estrés Autocannon contra el contenedor Nginx + Backend
 * 4. Valida persistencia ACID y captura screenshot de producción
 */

import puppeteer from 'puppeteer';
import autocannon from 'autocannon';
import fs from 'fs';
import path from 'path';

const DOCKER_URL = 'http://localhost:8080';

async function main() {
  console.log('\n====================================================================');
  console.log('🐳 VERIFICACIÓN DE DESPLIEGUE EN PRODUCCIÓN DOCKER (NGINX + BACKEND)');
  console.log('   URL de Pruebas: ' + DOCKER_URL);
  console.log('====================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, name: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ [DOCKER PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ❌ [DOCKER FAIL] ${name} ${detail ? `- ${detail}` : ''}`);
      failed++;
    }
  }

  // --- 1. Verificación de Healthcheck y Nginx Reverse Proxy ---
  console.log('--- 1. Pruebas de Red y Reverse Proxy Nginx ---');
  try {
    const healthRes = await fetch(`${DOCKER_URL}/health`);
    assert(healthRes.status === 200, 'Nginx Healthcheck /health responde HTTP 200 OK');

    const apiHealthRes = await fetch(`${DOCKER_URL}/api/v1/health`);
    const apiHealthJson = await apiHealthRes.json();
    assert(apiHealthRes.status === 200 && apiHealthJson.status === 'healthy', 'Proxy Reverso /api/v1/health responde desde Backend en Docker');

    const plansRes = await fetch(`${DOCKER_URL}/api/v1/subscriptions/plans`);
    const plansJson = await plansRes.json();
    assert(plansJson.data.length >= 3, `Planes de Membresía ($29, $49, $99) obtenidos de SQLite (${plansJson.data.length} planes)`);
  } catch (err: any) {
    assert(false, 'Conexión a Docker Nginx', err.message);
  }

  // --- 2. Pruebas de Carga HTTP Real con Autocannon en Docker ---
  console.log('\n--- 2. Estrés HTTP con Autocannon contra Contenedor Docker Nginx ---');
  try {
    const result = await autocannon({
      url: `${DOCKER_URL}/api/v1/properties`,
      connections: 50,
      duration: 3,
      pipelining: 1
    });

    console.log(`     ➔ Rendimiento Docker: ${result.requests.total} reqs procesadas, ${result.requests.average} req/s, latencia promedio: ${result.latency.average}ms`);
    assert(result.errors === 0, 'Cero errores de red en Docker Nginx Gateway');
    assert(result.non2xx === 0, '100% de respuestas fueron HTTP 2xx exitosas');
    assert(result.requests.average > 100, `Rendimiento de alto throughput: ${result.requests.average} req/s`);
  } catch (err: any) {
    assert(false, 'Test de carga Autocannon en Docker', err.message);
  }

  // --- 3. Navegación Real con Google Chrome (Puppeteer) contra Docker SPA ---
  console.log('\n--- 3. Verificación de Interfaz y Renderizado SPA en Docker con Chrome ---');
  let browser: any;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const response = await page.goto(DOCKER_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    assert(response?.status() === 200, 'SPA de React 19 cargada exitosamente desde Nginx Docker (HTTP 200)');

    // Verificar que el header oficial y catálogo se renderizan
    const headerTitle = await page.$eval('header', el => el ? true : false);
    assert(headerTitle, 'Header oficial y navegación institucional renderizados en el DOM');

    // Verificar tarjetas de propiedades renderizadas desde la API
    await page.waitForSelector('article.premier-property-card', { timeout: 10000 });
    const propertyCardCount = await page.$$eval('article.premier-property-card', cards => cards.length);
    assert(propertyCardCount >= 1, `Catálogo inmobiliario cargado reactivamente en Docker (${propertyCardCount} inmuebles renderizados)`);

    // Captura de pantalla de producción
    const screenshotDir = path.resolve(process.cwd(), 'tests/screenshots');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    const screenshotPath = path.join(screenshotDir, '05-docker-production-live.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    assert(fs.existsSync(screenshotPath), `Screenshot de Producción Docker guardada: ${screenshotPath}`);

  } catch (err: any) {
    assert(false, 'Navegación Puppeteer en Docker', err.message);
  } finally {
    if (browser) await browser.close();
  }

  // --- 4. Verificación de Transacciones y Escritura en Base de Datos de Docker ---
  console.log('\n--- 4. Escritura y Persistencia en Base de Datos SQLite Docker ---');
  try {
    const timestamp = Date.now();
    const testEmail = `test.docker.${timestamp}@propiedadespremier.ec`;

    // Registro
    const regRes = await fetch(`${DOCKER_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'PasswordDocker2026!',
        fullName: 'Agente Docker QA',
        phone: '+593 99 111 2233',
        role: 'AGENT'
      })
    });
    assert(regRes.status === 201, 'Usuario registrado con éxito en SQLite dentro de Docker (HTTP 201)');

    // Login
    const loginRes = await fetch(`${DOCKER_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'PasswordDocker2026!' })
    });
    const loginJson = await loginRes.json();
    assert(loginRes.status === 200, 'Login autenticado y sesión JWT emitida en Docker');
    const token = loginJson.data.tokens.accessToken;

    // Publicación
    const createPropRes = await fetch(`${DOCKER_URL}/api/v1/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Penthouse Terraza Panorámica Cumbayá (Docker Test)',
        description: 'Penthouse exclusivo con generador eléctrico 100% y acabados de lujo.',
        price: 345000,
        operation: 'VENTA',
        propertyType: 'Penthouse',
        sector: 'Cumbayá',
        microzone: 'San Juan Alto',
        areaBuild: 220,
        bedrooms: 3,
        bathrooms: 3.5,
        parking: 2,
        hoaFee: 120,
        image: '/images/cumbaya_villa.jpg',
        features: {
          hasGenerator: true,
          hasMetro: false,
          hasDoubleGate: true,
          isValleyClimate: true,
          biessEligible: true,
          isAirbnb: true,
          hasMatterport: true
        }
      })
    });
    assert(createPropRes.status === 201, 'Propiedad persistida exitosamente en el volumen Docker (HTTP 201)');

    // Consulta de verificación
    const listRes = await fetch(`${DOCKER_URL}/api/v1/properties?limit=50`);
    const listJson = await listRes.json();
    assert(listJson.data.pagination.total >= 13, `Conteo total de propiedades actualizado a ${listJson.data.pagination.total} en base de datos Docker`);
  } catch (err: any) {
    assert(false, 'Escritura transaccional en Docker', err.message);
  }

  // --- 5. Resumen ---
  console.log('\n====================================================================');
  console.log(`🏆 RESULTADO DOCKER: ${passed} pasadas, ${failed} fallidas`);
  console.log('====================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error fatal durante verificación Docker:', err);
  process.exit(1);
});
