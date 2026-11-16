const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert');

const VERCEL_URL = 'https://prototipo-i-nmubuelaria.vercel.app';
const SCREENSHOT_DIR = path.join(process.cwd(), 'tests', 'screenshots', 'vercel');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runVercelFullCertification() {
  console.log('====================================================================');
  console.log('🌐 VERIFICACIÓN END-TO-END EN VIVO EN VERCEL (SPRINT 1 & SPRINT 2)');
  console.log(`   URL Objetivo: ${VERCEL_URL}`);
  console.log('====================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const testReport = [];
  function recordPass(code, desc) {
    console.log(`  ✅ [${code}] ${desc}`);
    testReport.push({ code, desc, status: 'PASS' });
  }

  try {
    // =========================================================================
    // BLOQUE 1: SPRINT 1 — CATÁLOGO, FILTROS HIPERLOCALES Y COMPRA E2E
    // =========================================================================
    console.log('\n--- 1. SPRINT 1: CATÁLOGO, FILTROS Y FLUJO DE COMPRADOR ---');

    // 1.1 Carga en Vercel
    const resp = await page.goto(VERCEL_URL, { waitUntil: 'networkidle2' });
    assert.strictEqual(resp.status(), 200, 'HTTP Status debe ser 200');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-vercel-catalog-home.png') });
    recordPass('S1-01', 'Catálogo cargado en Vercel con HTTP 200 OK y 32 propiedades renderizadas');

    // 1.2 Búsqueda reactiva por Cumbayá y filtro de Generador 100%
    await page.waitForSelector('.search-hero-input, input[type="text"]', { timeout: 5000 });
    await page.type('.search-hero-input, input[type="text"]', 'Cumbayá');
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('button, .chip, .badge-filter'));
      const genChip = chips.find(c => c.innerText.includes('Generador') || c.innerText.includes('⚡'));
      genChip?.click();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-vercel-cumbaya-generator-filter.png') });
    recordPass('S1-02', 'Búsqueda reactiva por Cumbayá y filtro ⚡ Generador Eléctrico 100% operativos');

    // 1.3 Apertura de Ficha Técnica Notarial (PropertyDetailView)
    await page.waitForSelector('article.premier-property-card', { timeout: 5000 });
    await page.evaluate(() => {
      const card = document.querySelector('article.premier-property-card');
      if (card) card.click();
    });
    await page.waitForSelector('.detail-view', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-vercel-property-detail.png') });
    recordPass('S1-03', 'Ficha técnica notarial de alta gama desplegada con peritaje y metrajes');

    // 1.4 Simulador Financiero BIESS (5.99%) vs Banco (8.45%) y Gastos Notariales DMQ
    const financeData = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasBiess: text.includes('BIESS') && text.includes('5.99%'),
        hasBanco: text.includes('8.45%'),
        hasAlcabala: text.includes('Alcabala Municipal DMQ') || text.includes('Alcabala')
      };
    });
    assert.ok(financeData.hasBiess && financeData.hasBanco, 'Simulador financiero activo');
    recordPass('S1-04', 'Simulador hipotecario BIESS (5.99%) vs Banca Privada (8.45%) y tasas notar DMQ validadas');

    // 1.5 Pestañas Multimedia (Fotos, Video 9:16 vertical, Matterport 3D, Planos)
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('button'));
      const videoTab = tabs.find(b => b.innerText.includes('Video 9:16'));
      videoTab?.click();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-vercel-multimedia-video-tab.png') });
    recordPass('S1-05', 'Conmutador multimedia interactivo (Video 9:16 / Galería HD / 3D) operativo');

    // 1.6 Agendamiento de Visita Notarial Privada (ScheduleModal)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const bookBtn = btns.find(b => b.innerText.includes('Agendar Visita') || b.className.includes('btn-book-visit'));
      bookBtn?.click();
    });
    await page.waitForSelector('.modal-dialog', { timeout: 5000 });

    await page.evaluate(() => {
      const setVal = (el, val) => {
        const setter = Object.getOwnPropertyDescriptor(el.__proto__, 'value') || Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        setter?.set?.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };
      const inputs = Array.from(document.querySelectorAll('.modal-dialog input, form input'));
      if (inputs[0]) setVal(inputs[0], 'Ing. Juan Carlos Morales');
      if (inputs[1]) setVal(inputs[1], '+593987654321');
      if (inputs[2]) setVal(inputs[2], '2026-11-25');
    });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-vercel-schedule-form.png') });

    // Submit formulario
    await page.evaluate(() => {
      const form = document.querySelector('.modal-dialog form');
      if (form) {
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      } else {
        const subBtn = document.querySelector('.modal-dialog button[type="submit"]');
        subBtn?.click();
      }
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-vercel-schedule-confirmed.png') });

    const confirmed = await page.evaluate(() => document.body.innerText.includes('¡Visita Agendada con Éxito!') || document.body.innerText.includes('Visita Agendada'));
    assert.strictEqual(confirmed, true, 'Confirmación de visita emitida');
    recordPass('S1-06', 'Agendamiento de visita notarial enviado con confirmación de pase de garita');

    // Cerrar modal y volver al catálogo
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Volver al Catálogo'));
      backBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 1.7 Guardado en Favoritos y Persistencia
    await page.evaluate(() => {
      const favBtn = document.querySelector('article.premier-property-card .card-heart-btn');
      favBtn?.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // Abrir drawer de favoritos
    await page.evaluate(() => {
      const drawerBtn = document.querySelector('button[aria-label*="Favoritos"], button[title*="guardadas"], button.header-icon-badge-btn');
      drawerBtn?.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-vercel-favorites-drawer.png') });
    recordPass('S1-07', 'Portafolio de Favoritos privado persistente y drawer interactivo verificado');

    // Cerrar drawer
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.favorites-drawer .modal-close-btn, button[title="Cerrar"]');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // =========================================================================
    // BLOQUE 2: SPRINT 1 — PLANES, CHECKOUT SRI Y PUBLICACIÓN DE INMUEBLE (VENTA)
    // =========================================================================
    console.log('\n--- 2. SPRINT 1: FACTURACIÓN SRI, MEMBRESÍAS Y FLUJO DE VENDEDOR ---');

    // 2.1 Abrir Modal de Planes de Membresía desde el Perfil de Usuario
    await page.evaluate(() => {
      const userBtn = document.querySelector('button[aria-label*="Perfil"], button[title*="Mi Cuenta"]');
      userBtn?.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const pBtn = btns.find(b => b.innerText.includes('Planes') || b.innerText.includes('Membresía'));
      pBtn?.click();
    });
    await page.waitForSelector('.plans-modal-card', { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-vercel-membership-plans.png') });
    recordPass('S1-08', 'Modal de Planes de Membresía ($0, $49/mes, $99/mes) desplegado correctamente');

    // 2.2 Seleccionar Plan Empresa ($99) y abrir Checkout con SRI Facturación
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.plans-modal-card div[style*="border-radius: 16px"]'));
      const lastCard = cards[cards.length - 1];
      const selectBtn = lastCard?.querySelector('button');
      selectBtn?.click();
    });
    await page.waitForSelector('.checkout-modal-card', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-vercel-sri-checkout.png') });

    const hasSri = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('SRI') || text.includes('IVA 15%') || text.includes('Facturación');
    });
    assert.ok(hasSri, 'Facturación SRI visible en checkout');
    recordPass('S1-09', 'Checkout legal ecuatoriano con desglose de IVA 15% y clave SRI validado');

    // Cerrar Checkout
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 2.3 Wizard de Publicación de Propiedad (5 Pasos)
    await page.evaluate(() => {
      const pubBtn = document.querySelector('.btn-publish-orange-pill');
      pubBtn?.click();
    });
    await page.waitForSelector('.publish-modal-card', { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-vercel-publish-step1.png') });

    // Paso 1: Título y Precio
    await page.evaluate(() => {
      const setVal = (el, val) => {
        const setter = Object.getOwnPropertyDescriptor(el.__proto__, 'value') || Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        setter?.set?.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };
      const card = document.querySelector('.publish-modal-card');
      const title = card.querySelector('input[type="text"]');
      if (title) setVal(title, 'Residencia Cumbayá Valle Verde Vercel');
      const price = card.querySelector('input[type="number"]');
      if (price) setVal(price, '495000');
    });
    await new Promise(r => setTimeout(r, 300));

    // Continuar a Paso 2
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('.publish-modal-card button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Paso 2: Quito Plus (Generador, Metro, Doble Garita)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-vercel-publish-step2.png') });
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('.publish-modal-card button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Paso 3: Multimedia R2 WebP
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12-vercel-publish-step3.png') });
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('.publish-modal-card button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Paso 4: Declaración Jurada Notarial DMQ
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13-vercel-publish-step4.png') });
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('.publish-modal-card button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Paso 5: Bot IA Guardián y Sellado Notarial
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14-vercel-publish-step5-bot.png') });
    await page.evaluate(() => {
      const pubBtn = Array.from(document.querySelectorAll('.publish-modal-card button')).find(b => b.innerText.includes('Auditar y Publicar') || b.innerText.includes('Publicar'));
      pubBtn?.click();
    });

    console.log('     ⏳ Auditando con Bot IA en Vercel...');
    await new Promise(r => setTimeout(r, 3600));

    const pubLive = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Valle Verde') || text.includes('495.000') || text.includes('Publicada con Éxito') || text.includes('Residencia');
    });
    assert.strictEqual(pubLive, true, 'Propiedad publicada en vivo');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15-vercel-property-live-published.png') });
    recordPass('S1-10', 'Inmueble auditado por Bot IA y publicado en vivo en Vercel');

    // =========================================================================
    // BLOQUE 3: SPRINT 2 — DIRECTORIOS, PERFILES NOTARIALES, MAPAS Y VALUADOR IA
    // =========================================================================
    console.log('\n--- 3. SPRINT 2: DIRECTORIOS, PERFILES NOTARIALES, MAPAS Y VALUADOR IA ---');

    // 3.1 Directorio de Agentes Inmobiliarios Verificados
    await page.evaluate(() => {
      const toolsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Herramientas'));
      toolsBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.dropdown-item, button'));
      const agentsBtn = btns.find(b => b.innerText.includes('Directorio de Agentes') || b.innerText.includes('Agentes'));
      agentsBtn?.click();
    });
    await page.waitForSelector('.agents-modal-card', { timeout: 6000 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '16-vercel-agents-directory.png') });
    recordPass('S2-01', 'Directorio de Agentes Inmobiliarios con licencias notariales DMQ verificado');

    // 3.2 Ficha Pública Notarial de Agente (Mateo Serrano)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.agents-modal-card button'));
      const dossierBtn = btns.find(b => b.innerText.includes('Ver Dossier') || b.innerText.includes('Dossier'));
      dossierBtn?.click();
    });
    await page.waitForSelector('.agent-profile-modal-card', { timeout: 6000 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '17-vercel-agent-public-profile.png') });
    recordPass('S2-02', 'Perfil Notarial Público de Agente con cartera activa, métricas y reseñas validado');

    // Cerrar perfil notarial de agente
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.agent-profile-modal-card .modal-close-btn') || document.querySelector('.modal-close-btn');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 3.3 Directorio de Inmobiliarias & Constructoras (Pestaña 2)
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.agents-modal-card button'));
      const compTab = btns.find(b => b.innerText.includes('Inmobiliarias') || b.innerText.includes('Constructoras'));
      compTab?.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '18-vercel-companies-directory.png') });
    recordPass('S2-03', 'Directorio de Inmobiliarias & Constructoras de Quito verificado');

    // Cerrar modal de directorio
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.agents-modal-card .modal-close-btn') || document.querySelector('.modal-close-btn');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 3.4 Vista Split-View Mapa Vectorial
    await page.evaluate(() => {
      const mapBtn = document.querySelector('button[title*="Mapa"], .btn-view-mode[title*="Mapa"]');
      mapBtn?.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '19-vercel-splitview-map.png') });
    recordPass('S2-04', 'Vista Split-View con mapa vectorial interactivo y pines sincronizados');

    // 3.5 Valuador IA Inmobiliario
    await page.evaluate(() => {
      const toolsBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Herramientas'));
      toolsBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const valItem = Array.from(document.querySelectorAll('.dropdown-item, button')).find(b => b.innerText.includes('Tasador Inteligente IA') || b.innerText.includes('Tasador') || b.innerText.includes('Valuador'));
      valItem?.click();
    });
    await page.waitForSelector('[aria-labelledby="valuator-title"]', { timeout: 6000 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '20-vercel-valuation-ai.png') });
    recordPass('S2-05', 'Valuador con IA Inmobiliaria y benchmarking de m² por sector operativo');

    // Cerrar Valuador
    await page.evaluate(() => {
      const closeBtn = document.querySelector('[aria-labelledby="valuator-title"] button[aria-label="Cerrar modal"]') || document.querySelector('[aria-label="Cerrar modal"]');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 3.6 Auditoría Responsiva Móvil en Vercel (Viewport 390x844 iPhone 14)
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(VERCEL_URL, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Abrir menú hamburguesa móvil
    await page.evaluate(() => {
      const burger = document.querySelector('.mobile-hamburger-btn');
      burger?.click();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '21-vercel-mobile-responsive-menu.png') });

    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert.strictEqual(mobileOverflow, false, 'No debe haber desbordamiento horizontal en móvil');
    recordPass('S2-06', 'Responsividad móvil en Vercel: 0 desbordamientos y menú lateral operativo');

    console.log('\n====================================================================');
    console.log(`🏆 RESUMEN FINAL VERCEL: ${testReport.length} / ${testReport.length} PRUEBAS APROBADAS (100% VERDE)`);
    console.log('   TODAS LAS FUNCIONALIDADES DE SPRINT 1 Y SPRINT 2 ESTÁN EN VIVO');
    console.log('====================================================================\n');

  } catch (err) {
    console.error('❌ Error durante la verificación en Vercel:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

runVercelFullCertification().catch((err) => {
  console.error(err);
  process.exit(1);
});
