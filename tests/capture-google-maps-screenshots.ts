/**
 * PROPIEDADES PREMIER - GOOGLE MAPS SCREENSHOT GENERATOR
 * Captura las nuevas vistas de Google Maps real (Calles, Satélite y Ficha de Detalle).
 */

import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';

async function run() {
  console.log('🚀 Iniciando Puppeteer para capturar el nuevo Google Maps...');

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

    // 1. Abrir vista Split de Google Maps
    console.log('🗺️ 1. Abriendo vista Split View Cartografía...');
    await page.evaluate(() => {
      // Buscar botón "VER MAPA" o trigger en la consola
      const buttons = Array.from(document.querySelectorAll('button'));
      const mapBtn = buttons.find(b => b.textContent && b.textContent.includes('VER MAPA'));
      if (mapBtn) {
        mapBtn.click();
      } else {
        // Enlace herramientas -> mapa
        const tools = document.querySelector('.tools-trigger') as HTMLButtonElement;
        if (tools) tools.click();
      }
    });

    await new Promise(r => setTimeout(r, 1500));

    // Si no abrió con VER MAPA, intentar via herramientas
    const isSplit = await page.evaluate(() => document.querySelector('.leaflet-container') !== null);
    if (!isSplit) {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.dropdown-item'));
        const m = btns.find(b => b.textContent && b.textContent.includes('Mapa de Valles'));
        if (m) (m as HTMLButtonElement).click();
      });
      await new Promise(r => setTimeout(r, 1500));
    }

    // Esperar a que se carguen los tiles de Google Maps
    await new Promise(r => setTimeout(r, 2000));

    const shotSplit = path.join(screenshotsDir, '03-vector-map-splitview.png');
    await page.screenshot({ path: shotSplit });
    console.log(`✅ Captura 03 (Google Maps Calles) guardada: ${shotSplit}`);

    // 2. Cambiar a capa Google Satélite Híbrido
    console.log('🛰️ 2. Cambiando a capa Satélite Híbrido...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const satBtn = buttons.find(b => b.textContent && b.textContent.includes('Satélite'));
      if (satBtn) satBtn.click();
    });

    await new Promise(r => setTimeout(r, 2500));

    const shotSat = path.join(screenshotsDir, '09-google-maps-satellite.png');
    await page.screenshot({ path: shotSat });
    console.log(`✅ Captura 09 (Google Maps Satélite) guardada: ${shotSat}`);

    // 3. Abrir ficha de detalle de propiedad para ver el mapa incrustado
    console.log('🏡 3. Abriendo Ficha de Propiedad para capturar mapa de detalle...');
    await page.evaluate(() => {
      const card = document.querySelector('article.premier-property-card') as HTMLElement;
      if (card) card.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Scroll hasta la sección del mapa
    await page.evaluate(() => {
      window.scrollBy({ top: 1200, behavior: 'smooth' });
    });
    await new Promise(r => setTimeout(r, 1500));

    const shotDetail = path.join(screenshotsDir, '10-property-detail-google-maps.png');
    await page.screenshot({ path: shotDetail });
    console.log(`✅ Captura 10 (Google Maps en Ficha de Detalle) guardada: ${shotDetail}`);

    console.log('🎉 Todas las capturas de Google Maps generadas exitosamente.');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('❌ Error capturando pantallas:', err);
  process.exit(1);
});
