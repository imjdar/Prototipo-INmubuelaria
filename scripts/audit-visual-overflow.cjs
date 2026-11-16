const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const SCREENSHOT_DIR = path.join(process.cwd(), 'tests', 'visual-audit');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'Desktop-1920', width: 1920, height: 1080, isMobile: false },
  { name: 'Desktop-1440', width: 1440, height: 900, isMobile: false },
  { name: 'Tablet-768', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'Mobile-390', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'MobileSmall-360', width: 360, height: 740, isMobile: true, hasTouch: true }
];

async function checkOverflow(page, viewName, context) {
  const result = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
    
    // Buscar elementos específicos que causen desbordamiento horizontal
    const allElements = Array.from(document.querySelectorAll('*'));
    const overflowingElements = [];

    for (const el of allElements) {
      // Ignorar scripts, styles, SVGs internos o elementos ocultos
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'HEAD', 'META'].includes(el.tagName)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      // Verificar si el elemento está contenido dentro de un contenedor con overflow:hidden / clip / scroll
      let isClipped = false;
      let parent = el.parentElement;
      while (parent && parent !== document.body && parent !== document.documentElement) {
        const style = window.getComputedStyle(parent);
        const ovX = style.overflowX;
        const ovY = style.overflowY;
        if (['hidden', 'clip', 'scroll', 'auto'].includes(ovX) || ['hidden', 'clip', 'scroll', 'auto'].includes(ovY)) {
          const pRect = parent.getBoundingClientRect();
          // Si el padre está dentro de los límites visibles de la ventana, el hijo está recortado con seguridad
          if (pRect.right <= docWidth + 1.5) {
            isClipped = true;
            break;
          }
        }
        parent = parent.parentElement;
      }

      if (isClipped) continue;

      // Un elemento desborda realmente si no está recortado y su borde derecho excede el ancho visible por más de 1px
      if (rect.right > docWidth + 1.5) {
        overflowingElements.push({
          tag: el.tagName.toLowerCase(),
          className: (typeof el.className === 'string' ? el.className : '').slice(0, 80),
          id: el.id || null,
          rectRight: Math.round(rect.right),
          rectWidth: Math.round(rect.width),
          docWidth: docWidth,
          excessPx: Math.round(rect.right - docWidth),
          textSnippet: (el.innerText || '').slice(0, 40).replace(/\n/g, ' ')
        });
      }
    }

    return {
      hasDocOverflow: scrollWidth > docWidth + 1,
      docWidth,
      scrollWidth,
      bodyScrollWidth,
      overflowCount: overflowingElements.length,
      sampleOverflows: overflowingElements.slice(0, 5)
    };
  });

  if (result.hasDocOverflow || result.overflowCount > 0) {
    console.warn(`⚠️ [DESBORDE DETECTADO] en ${viewName} (${context}):`);
    console.warn(`   Ancho Ventana: ${result.docWidth}px | Ancho Scroll: ${result.scrollWidth}px (Exceso: ${result.scrollWidth - result.docWidth}px)`);
    if (result.sampleOverflows.length > 0) {
      console.warn(`   Elementos culpables:`, JSON.stringify(result.sampleOverflows, null, 2));
    }
    return { ok: false, ...result };
  } else {
    console.log(`✅ [OK SIN DESBORDE] ${viewName} (${context}) - Ancho: ${result.docWidth}px, Scroll: ${result.scrollWidth}px`);
    return { ok: true, ...result };
  }
}

(async () => {
  console.log('====================================================================');
  console.log('🔍 INICIANDO AUDITORÍA VISUAL COMPLETA: CERO DESBORDES & RESPONSIVE');
  console.log('   URL Objetivo: http://localhost:8080 (Docker Producción)');
  console.log('====================================================================');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let totalChecks = 0;
  let passedChecks = 0;
  let failedChecks = 0;
  const issues = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Probando resolución: ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport(vp);
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // 1. Catálogo Principal
    totalChecks++;
    const check1 = await checkOverflow(page, vp.name, 'Catálogo Principal');
    if (check1.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Catálogo', ...check1 }); }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-01-catalogo.png`) });

    // 2. Vista de Mapa Split
    totalChecks++;
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => 
        b.getAttribute('aria-label')?.toLowerCase().includes('mapa vectorial') || 
        b.getAttribute('title')?.toLowerCase().includes('vista mapa') ||
        b.innerText.trim() === 'VER MAPA' || 
        b.innerText.trim() === 'Mapa'
      );
      btn?.click();
    });
    await new Promise(r => setTimeout(r, 800));
    const check2 = await checkOverflow(page, vp.name, 'Vista Mapa');
    if (check2.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Mapa', ...check2 }); }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-02-mapa.png`) });

    // Volver a cuadrícula
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText.includes('VER LISTA') || b.innerText.includes('Cuadrícula') || b.innerText.includes('Catálogo'));
      btn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 3. Ficha Técnica Notarial (Modal Detalle)
    totalChecks++;
    await page.evaluate(() => {
      const card = document.querySelector('.property-card, [data-property-id]');
      const title = card ? card.querySelector('h3, .property-title, button') : null;
      if (title) (title).click();
      else {
        const firstBtn = document.querySelector('.btn-view-details, .property-card button');
        firstBtn?.click();
      }
    });
    await new Promise(r => setTimeout(r, 800));
    const check3 = await checkOverflow(page, vp.name, 'Ficha Notarial Modal');
    if (check3.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Ficha Notarial', ...check3 }); }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-03-modal-detalle.png`) });

    // Cerrar modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Cerrar"], .modal-close-btn');
      closeBtn?.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 4. Directorio de Inmobiliarias
    totalChecks++;
    await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('button, a'));
      const link = navLinks.find(el => el.innerText.trim().includes('Inmobiliarias') || el.innerText.trim().includes('Constructoras'));
      link?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    const check4 = await checkOverflow(page, vp.name, 'Directorio Inmobiliarias');
    if (check4.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Inmobiliarias', ...check4 }); }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-04-inmobiliarias.png`) });

    // 5. Directorio de Agentes
    totalChecks++;
    await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('button, a'));
      const link = navLinks.find(el => el.innerText.trim().includes('Agentes') || el.innerText.trim().includes('Corredores'));
      link?.click();
    });
    await new Promise(r => setTimeout(r, 600));
    const check5 = await checkOverflow(page, vp.name, 'Directorio Agentes');
    if (check5.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Agentes', ...check5 }); }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-05-agentes.png`) });

    // 6. Si es móvil, verificar menú hamburguesa
    if (vp.isMobile) {
      totalChecks++;
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Abrir menú de navegación"], .mobile-hamburger-btn');
        btn?.click();
      });
      await new Promise(r => setTimeout(r, 500));
      const check6 = await checkOverflow(page, vp.name, 'Menú Hamburguesa Móvil');
      if (check6.ok) passedChecks++; else { failedChecks++; issues.push({ vp: vp.name, view: 'Menú Hamburguesa', ...check6 }); }
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-06-hamburger-abierto.png`) });

      // Cerrar menú
      await page.evaluate(() => {
        const closeBtn = document.querySelector('button[aria-label="Cerrar menú"], .mobile-nav-close');
        closeBtn?.click();
      });
      await new Promise(r => setTimeout(r, 300));
    }
  }

  await browser.close();

  console.log('\n====================================================================');
  console.log(`🏆 RESUMEN DE AUDITORÍA VISUAL:`);
  console.log(`   Total de Verificaciones: ${totalChecks}`);
  console.log(`   Pruebas Aprobadas:       ${passedChecks}`);
  console.log(`   Desbordes Detectados:    ${failedChecks}`);
  console.log('====================================================================');

  if (failedChecks === 0) {
    console.log('🌟 ¡PERFECCIÓN VISUAL CERTIFICADA! Cero desbordamientos horizontales en todas las resoluciones (1920px hasta 360px).');
  } else {
    console.warn(`⚠️ Se encontraron ${failedChecks} casos con desborde que requieren ajuste de CSS.`);
  }

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'visual-audit-report.json'), JSON.stringify({ totalChecks, passedChecks, failedChecks, issues }, null, 2));
})();
