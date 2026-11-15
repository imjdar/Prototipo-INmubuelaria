/**
 * PROPIEDADES PREMIER - SPRINT 2 SCREENSHOT GENERATOR
 * Captura capturas de alta definición de:
 * 1. Checkout y Facturación Electrónica SRI Ecuador con desglose IVA 15% y clave 49 dígitos
 * 2. Perfil público integral del anunciante/agente certificado DMQ
 * 3. Directorio corporativo de Inmobiliarias & Constructoras
 */

import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';

async function run() {
  console.log('🚀 Iniciando Puppeteer para capturar vistas de Sprint 2...');

  const screenshotsDir = path.resolve(process.cwd(), 'tests/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    console.log('📡 Navegando a http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

    // 1. Abrir menú de Herramientas y luego Directorio
    console.log('📷 1. Abriendo Herramientas -> Directorio de Agentes...');
    await page.waitForSelector('.tools-trigger');
    await page.click('.tools-trigger');
    await new Promise(r => setTimeout(r, 400));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.dropdown-item'));
      const dirBtn = btns.find(b => b.textContent && b.textContent.includes('Directorio de Agentes'));
      if (dirBtn) (dirBtn as HTMLButtonElement).click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Cambiar a la pestaña de Inmobiliarias & Constructoras
    console.log('🏢 Cambiando a pestaña Inmobiliarias & Constructoras...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const compTab = buttons.find(b => b.textContent && b.textContent.includes('Inmobiliarias & Constructoras'));
      if (compTab) compTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const shotCompanies = path.join(screenshotsDir, '08-inmobiliarias-constructoras.png');
    await page.screenshot({ path: shotCompanies });
    console.log(`✅ Captura 08 guardada: ${shotCompanies}`);

    // 2. Volver a la pestaña de Agentes y abrir el perfil del Agente Mateo Serrano
    console.log('📷 2. Abriendo Ficha Pública Notarial del Agente (Dossier)...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const agentTab = buttons.find(b => b.textContent && b.textContent.includes('Agentes Inmobiliarios'));
      if (agentTab) agentTab.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Click en "Ver Dossier" del primer agente
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const dossierBtn = buttons.find(b => b.textContent && b.textContent.includes('Ver Dossier'));
      if (dossierBtn) (dossierBtn as HTMLButtonElement).click();
    });
    await new Promise(r => setTimeout(r, 800));

    const shotAgent = path.join(screenshotsDir, '07-agent-public-profile.png');
    await page.screenshot({ path: shotAgent });
    console.log(`✅ Captura 07 guardada: ${shotAgent}`);

    // Cerrar modal de agente y directorio
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));

    // 3. Abrir Modal de Membresías y luego Pasarela con Facturación Electrónica SRI
    console.log('📷 3. Abriendo Perfil de Usuario -> Membresías -> Checkout SRI...');
    await page.waitForSelector('.user-profile-compact-btn');
    await page.click('.user-profile-compact-btn');
    await new Promise(r => setTimeout(r, 600));

    // Click en "Gestionar o Mejorar Plan de Membresía"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const planBtn = buttons.find(b => b.textContent && b.textContent.includes('Gestionar o Mejorar Plan'));
      if (planBtn) (planBtn as HTMLButtonElement).click();
    });
    await new Promise(r => setTimeout(r, 600));

    // En el modal de planes, click en "SELECCIONAR" (por ejemplo el de Empresa $99 o Esencial $29)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const selectBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'SELECCIONAR');
      if (selectBtn) (selectBtn as HTMLButtonElement).click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Rellenar datos de facturación SRI en el checkout
    console.log('✍️ Completando datos tributarios RUC / SRI en Checkout...');
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const rucInput = inputs.find(i => i.placeholder && i.placeholder.includes('179'));
      if (rucInput) {
        rucInput.value = '1792948214001';
        rucInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const companyInput = inputs.find(i => i.placeholder && i.placeholder.includes('Inversiones'));
      if (companyInput) {
        companyInput.value = 'Valle & Urbe PropTech S.A.S.';
        companyInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const addressInput = inputs.find(i => i.placeholder && i.placeholder.includes('Interoce'));
      if (addressInput) {
        addressInput.value = 'Av. Interoceánica km 11.5, Edif. Scala Pro';
        addressInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const emailInput = inputs.find(i => i.type === 'email');
      if (emailInput) {
        emailInput.value = 'facturacion@valleyurbe.ec';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    await new Promise(r => setTimeout(r, 600));

    const shotCheckout = path.join(screenshotsDir, '06-sri-facturacion-checkout.png');
    await page.screenshot({ path: shotCheckout });
    console.log(`✅ Captura 06 guardada: ${shotCheckout}`);

    console.log('🎉 Todas las capturas de Sprint 2 generadas con éxito.');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('❌ Error capturando pantallas:', err);
  process.exit(1);
});
