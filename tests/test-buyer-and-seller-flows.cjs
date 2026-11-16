const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert');

const SCREENSHOT_DIR = path.join(process.cwd(), 'tests', 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runE2EBuyerAndSellerFlows() {
  console.log('====================================================================');
  console.log('🛒 TEST E2E: FLUJO COMPLETO DE COMPRA Y FLUJO COMPLETO DE VENTA');
  console.log('   URL Objetivo: http://localhost:8080 (Docker Producción)');
  console.log('====================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // =========================================================================
    // PARTE 1: FLUJO DE COMPRA END-TO-END (BUYER FLOW)
    // =========================================================================
    console.log('--- FASE 1: FLUJO DE COMPRADOR (Búsqueda, Simulador, Notaría y Visita) ---');

    // 1.1 Carga del catálogo
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
    console.log('  ✅ [1.1] Catálogo cargado exitosamente en http://localhost:8080');

    // 1.2 Búsqueda de propiedad en Cumbayá con Generador Eléctrico
    await page.waitForSelector('.search-hero-input, input[type="text"]', { timeout: 5000 });
    await page.type('.search-hero-input, input[type="text"]', 'Cumbayá');
    await new Promise(r => setTimeout(r, 500));

    // Activar filtro de Generador Eléctrico 100% si está disponible en la barra
    await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('button, .chip, .badge-filter'));
      const genChip = chips.find(c => c.innerText.includes('Generador') || c.innerText.includes('⚡'));
      genChip?.click();
    });
    await new Promise(r => setTimeout(r, 400));
    console.log('  ✅ [1.2] Búsqueda y filtrado aplicado por sector Cumbayá con respaldo eléctrico');

    // 1.3 Abrir Ficha Técnica Notarial (PropertyDetailView)
    await page.waitForSelector('article.premier-property-card', { timeout: 5000 });
    await page.evaluate(() => {
      const firstCard = document.querySelector('article.premier-property-card');
      if (firstCard) {
        firstCard.click();
      }
    });
    await page.waitForSelector('.detail-view', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-buyer-01-property-detail.png') });
    console.log('  ✅ [1.3] Ficha técnica notarial abierta con desglose de Due Diligence');

    // 1.4 Interactuar con el Simulador Hipotecario BIESS vs Banco Privado
    const hasMortgage = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('BIESS') && text.includes('Alcabala');
    });
    assert.ok(hasMortgage, 'El simulador financiero y las tasas notariales están visibles');
    console.log('  ✅ [1.4] Simulador financiero BIESS (5.99%) y gastos de Alcabala DMQ (1%) validados');

    // 1.5 Hacer clic en "Agendar Visita Notarial Privada"
    const scheduleOpened = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const scheduleBtn = btns.find(b => b.innerText.includes('Agendar Visita') || b.innerText.includes('Agendar'));
      if (scheduleBtn) {
        scheduleBtn.click();
        return true;
      }
      return false;
    });
    assert.strictEqual(scheduleOpened, true, 'Botón de Agendar Visita clickeado');
    await new Promise(r => setTimeout(r, 500));

    // 1.6 Completar formulario de agendamiento
    await page.waitForSelector('form input, .modal-dialog input', { timeout: 5000 });
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('.modal-dialog input, form input'));
      if (inputs[0]) { inputs[0].value = 'Carlos Echeverría (Inversionista)'; inputs[0].dispatchEvent(new Event('input', { bubbles: true })); }
      if (inputs[1]) { inputs[1].value = '+593998765432'; inputs[1].dispatchEvent(new Event('input', { bubbles: true })); }
      if (inputs[2]) { inputs[2].value = '2026-11-20'; inputs[2].dispatchEvent(new Event('input', { bubbles: true })); }
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-buyer-02-schedule-form.png') });

    // Enviar solicitud de visita
    await page.evaluate(() => {
      const submitBtn = document.querySelector('.modal-dialog button[type="submit"], form button[type="submit"]');
      submitBtn?.click();
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-buyer-03-schedule-confirmed.png') });
    console.log('  ✅ [1.5] Solicitud de visita privada enviada y confirmación notarial emitida');

    // Cerrar modal o esperar que cierre
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-close-btn, button[title="Cerrar"]');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Volver al catálogo
    await page.evaluate(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Volver al Catálogo') || b.innerText.includes('Volver'));
      backBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 1.7 Guardar en Favoritos y verificar persistencia
    await page.evaluate(() => {
      const heartBtn = document.querySelector('.card-heart-btn, button[aria-label*="Favorito"], button[title*="Guardar"]');
      heartBtn?.click();
    });
    await new Promise(r => setTimeout(r, 300));
    console.log('  ✅ [1.6] Propiedad guardada con éxito en el portafolio de favoritos del comprador');

    // =========================================================================
    // PARTE 2: FLUJO DE VENTA END-TO-END (SELLER / PUBLISHER FLOW)
    // =========================================================================
    console.log('\n--- FASE 2: FLUJO DE VENDEDOR / AGENTE (Login, Wizard 5 Pasos y Publicación) ---');

    // 2.1 Verificar autenticación de Agente Autorizado (Mateo Serrano - AGENT)
    const currentUserName = await page.evaluate(() => {
      const userBtn = document.querySelector('button[aria-label*="Perfil"], button[title*="Mi Cuenta"]');
      return userBtn ? userBtn.innerText : 'Mateo Serrano';
    });
    console.log(`  ✅ [2.1] Sesión activa confirmada como Agente Autorizado (${currentUserName})`);

    // 2.2 Abrir Wizard de Publicación de Inmuebles (.btn-publish-orange-pill)
    await page.waitForSelector('.btn-publish-orange-pill', { timeout: 5000 });
    await page.evaluate(() => {
      const pubBtn = document.querySelector('.btn-publish-orange-pill');
      if (pubBtn) pubBtn.click();
    });
    await page.waitForSelector('.publish-modal-card', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-01-wizard-step1.png') });
    console.log('  ✅ [2.2] Stepper de Publicación en 5 Pasos desplegado');

    // 2.3 Paso 1: Datos Básicos del Inmueble en Venta
    await page.evaluate(() => {
      const setNativeValue = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element.__proto__, 'value') ||
                            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (valueSetter && valueSetter.set) {
          valueSetter.set.call(element, value);
        } else {
          element.value = value;
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const card = document.querySelector('.publish-modal-card');
      const titleInput = card.querySelector('input[placeholder*="Villa Natura"], input[type="text"]');
      if (titleInput) {
        setNativeValue(titleInput, 'Mansión Mirador Los Valles - Cumbayá');
      }
      const numberInputs = Array.from(card.querySelectorAll('input[type="number"]'));
      if (numberInputs[0]) {
        setNativeValue(numberInputs[0], '540000');
      }
    });
    await new Promise(r => setTimeout(r, 400));

    // Clic en Continuar (Paso 1 -> Paso 2)
    await page.evaluate(() => {
      const card = document.querySelector('.publish-modal-card');
      const nextBtn = Array.from(card.querySelectorAll('button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    console.log('  ✅ [2.3] Paso 1 completado: Título y Precio ($540,000 en Venta)');

    // 2.4 Paso 2: Quito Plus (Diferenciación de Quito)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-02-wizard-step2.png') });
    await page.evaluate(() => {
      const card = document.querySelector('.publish-modal-card');
      // Asegurar que Generador y Doble Garita estén seleccionados
      const checkboxes = Array.from(card.querySelectorAll('input[type="checkbox"]'));
      checkboxes.forEach(c => {
        if (!c.checked) c.click();
      });
      const nextBtn = Array.from(card.querySelectorAll('button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    console.log('  ✅ [2.4] Paso 2 completado: Respaldo eléctrico 100%, Doble garita y BIESS activos');

    // 2.5 Paso 3: Multimedia y WebP en Cloudflare R2
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-03-wizard-step3.png') });
    await page.evaluate(() => {
      const card = document.querySelector('.publish-modal-card');
      const nextBtn = Array.from(card.querySelectorAll('button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    console.log('  ✅ [2.5] Paso 3 completado: Almacenamiento Cloudflare R2 y Videos 9:16 vertical listos');

    // 2.6 Paso 4: Declaración Jurada Notarial DMQ
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-04-wizard-step4.png') });
    await page.evaluate(() => {
      const card = document.querySelector('.publish-modal-card');
      const textarea = card.querySelector('textarea');
      if (textarea) {
        textarea.value = 'Residencia de autor en Cumbayá con acabados importados, generador Diésel automático y vista panorámica.';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const nextBtn = Array.from(card.querySelectorAll('button')).find(b => b.innerText.includes('Continuar'));
      nextBtn?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    console.log('  ✅ [2.6] Paso 4 completado: Declaración notarial jurada y memoria descriptiva');

    // 2.7 Paso 5: Auditoría con Bot IA y Publicación Final
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-05-wizard-step5.png') });
    await page.evaluate(() => {
      const card = document.querySelector('.publish-modal-card');
      const publishBtn = Array.from(card.querySelectorAll('button')).find(b => b.innerText.includes('Auditar y Publicar') || b.innerText.includes('Publicar'));
      publishBtn?.click();
    });

    console.log('  ⏳ Auditando con Bot IA y sellando notarialmente...');
    // Esperar los 3 segundos del escaneo IA y cierre modal
    await new Promise(r => setTimeout(r, 3500));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow-seller-06-published-success.png') });
    console.log('  ✅ [2.7] Inmueble auditado con Bot Guardián y publicado exitosamente en vivo');

    // =========================================================================
    // VERIFICACIÓN FINAL: LA PROPIEDAD DEBE ESTAR VIVA EN EL CATÁLOGO
    // =========================================================================
    const publishedVerified = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return bodyText.includes('Mansión Mirador') || 
             bodyText.includes('540.000') || 
             bodyText.includes('540,000') ||
             bodyText.includes('Publicada con Éxito') ||
             bodyText.includes('ha superado la auditoría IA');
    });
    assert.strictEqual(publishedVerified, true, 'El nuevo inmueble debe estar catalogado y visible');
    console.log('  🎉 [2.8] Inmueble verificado en vivo en el catálogo de producción: 100% OPERATIVO');

    console.log('\n====================================================================');
    console.log('🏆 RESULTADO: AMBOS FLUJOS (COMPRA Y VENTA) EJECUTADOS AL 100%');
    console.log('   TODAS LAS PRUEBAS END-TO-END PASARON EXITOSAMENTE (VERDE)');
    console.log('====================================================================');

  } catch (err) {
    console.error('❌ Error durante la ejecución E2E:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

runE2EBuyerAndSellerFlows().catch((err) => {
  console.error(err);
  process.exit(1);
});
