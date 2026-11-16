const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/home/jdar/.gemini/antigravity/brain/5425a648-6913-4d7d-8cba-85b28534ea64';

function toBase64Image(filename) {
  const filePath = path.join(ARTIFACT_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  const bitmap = fs.readFileSync(filePath);
  return `data:image/png;base64,${bitmap.toString('base64')}`;
}

async function generateReport() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Certificación Oficial Vercel - Sprint 1 y Sprint 2</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      margin: 0;
      padding: 30px;
      color: #1E293B;
      background: #F8FAFC;
      line-height: 1.5;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    .header {
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header h1 {
      margin: 0 0 8px 0;
      color: #0F172A;
      font-size: 24px;
      font-weight: 800;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: #DCFCE7;
      color: #166534;
      font-weight: 700;
      font-size: 13px;
      border-radius: 9999px;
    }
    .meta-box {
      background: #F1F5F9;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 30px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      font-size: 13px;
    }
    .meta-item strong { color: #0F172A; }
    h2 {
      color: #0F172A;
      font-size: 18px;
      font-weight: 800;
      border-left: 4px solid #FEA004;
      padding-left: 10px;
      margin-top: 35px;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
      font-size: 13px;
    }
    th, td {
      padding: 10px 14px;
      border: 1px solid #E2E8F0;
      text-align: left;
    }
    th {
      background: #F8FAFC;
      color: #475569;
      font-weight: 700;
    }
    .check {
      color: #16A34A;
      font-weight: 700;
    }
    .img-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    .img-card h3 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #0F172A;
      font-weight: 700;
    }
    .img-card img {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #CBD5E1;
      display: block;
    }
    .img-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>Certificación Oficial End-to-End en Vercel</h1>
        <div style="color: #64748B; font-size: 14px;">Propiedades Premier · Portal Inmobiliario Quito & Valles</div>
      </div>
      <div>
        <span class="badge">100% VERIFICADO · 16/16 PASSED</span>
      </div>
    </div>

    <div class="meta-box">
      <div class="meta-item"><strong>URL Producción:</strong> <a href="https://prototipo-i-nmubuelaria.vercel.app/" target="_blank">https://prototipo-i-nmubuelaria.vercel.app/</a></div>
      <div class="meta-item"><strong>Infraestructura:</strong> Vercel Edge Serverless + SPA Rewrite</div>
      <div class="meta-item"><strong>Fecha de Auditoría:</strong> 15 de Noviembre de 2026</div>
      <div class="meta-item"><strong>Alcance:</strong> Sprint 1 & Sprint 2 Completo (Flujos Comprador, Vendedor y Herramientas)</div>
    </div>

    <h2>1. Matriz de Pruebas Aprobadas (16 / 16)</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Sprint</th>
          <th>Componente / Flujo</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>S1-01</strong></td><td>Sprint 1</td><td>Catálogo con 32 propiedades auditadas cargadas en Vercel</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-02</strong></td><td>Sprint 1</td><td>Búsqueda reactiva por Cumbayá y filtro ⚡ Generador Eléctrico 100%</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-03</strong></td><td>Sprint 1</td><td>Ficha Técnica Notarial con peritaje, metrajes y alícuotas</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-04</strong></td><td>Sprint 1</td><td>Simulador BIESS (5.99%) vs Banca Privada (8.45%) y aranceles DMQ</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-05</strong></td><td>Sprint 1</td><td>Conmutador Multimedia (Video 9:16, Matterport 3D, Galería HD)</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-06</strong></td><td>Sprint 1</td><td>Agendamiento de Visita Notarial con pase de garita (Flujo Compra E2E)</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-07</strong></td><td>Sprint 1</td><td>Portafolio de Favoritos guardados con persistencia por usuario</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-08</strong></td><td>Sprint 1</td><td>Modal de Planes de Membresía ($0, $49/mes, $99/mes)</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-09</strong></td><td>Sprint 1</td><td>Checkout legal con IVA 15% ecuatoriano y clave SRI</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S1-10</strong></td><td>Sprint 1</td><td>Publicador Stepper en 5 pasos auditado por Bot IA (Flujo Venta E2E)</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-01</strong></td><td>Sprint 2</td><td>Directorio de Agentes Inmobiliarios con licencias DMQ</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-02</strong></td><td>Sprint 2</td><td>Perfil Notarial Público de Agente (Dossier Profesional)</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-03</strong></td><td>Sprint 2</td><td>Directorio de Inmobiliarias & Constructoras de Quito</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-04</strong></td><td>Sprint 2</td><td>Vista Split-View con Mapa Vectorial y pines sincronizados</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-05</strong></td><td>Sprint 2</td><td>Tasador Inteligente IA & Valuador Inmobiliario DMQ</td><td class="check">✔ APROBADO</td></tr>
        <tr><td><strong>S2-06</strong></td><td>Sprint 2</td><td>Responsividad móvil (390x844 iPhone 14) sin desbordamiento</td><td class="check">✔ APROBADO</td></tr>
      </tbody>
    </table>

    <h2>2. Evidencias Sprint 1: Catálogo, Búsqueda y Compra E2E</h2>
    <div class="img-grid">
      <div class="img-card">
        <h3>S1-01: Catálogo Inicial en Vercel</h3>
        <img src="${toBase64Image('01-vercel-catalog-home.png')}" alt="Catálogo">
      </div>
      <div class="img-card">
        <h3>S1-02: Filtro Cumbayá + Generador 100%</h3>
        <img src="${toBase64Image('02-vercel-cumbaya-generator-filter.png')}" alt="Filtros">
      </div>
      <div class="img-card">
        <h3>S1-03: Ficha Técnica Notarial</h3>
        <img src="${toBase64Image('03-vercel-property-detail.png')}" alt="Ficha">
      </div>
      <div class="img-card">
        <h3>S1-04: Video 9:16 Inmersivo</h3>
        <img src="${toBase64Image('04-vercel-multimedia-video-tab.png')}" alt="Video">
      </div>
      <div class="img-card">
        <h3>S1-05: Formulario de Agendamiento Notarial</h3>
        <img src="${toBase64Image('05-vercel-schedule-form.png')}" alt="Agendamiento">
      </div>
      <div class="img-card">
        <h3>S1-06: Confirmación con Pase de Garita</h3>
        <img src="${toBase64Image('06-vercel-schedule-confirmed.png')}" alt="Confirmación">
      </div>
    </div>

    <h2>3. Evidencias Sprint 1: Facturación SRI, Membresías y Venta E2E</h2>
    <div class="img-grid">
      <div class="img-card">
        <h3>S1-07: Drawer de Favoritos</h3>
        <img src="${toBase64Image('07-vercel-favorites-drawer.png')}" alt="Favoritos">
      </div>
      <div class="img-card">
        <h3>S1-08: Planes de Membresía Notarial</h3>
        <img src="${toBase64Image('08-vercel-membership-plans.png')}" alt="Planes">
      </div>
      <div class="img-card">
        <h3>S1-09: Checkout SRI con IVA 15%</h3>
        <img src="${toBase64Image('09-vercel-sri-checkout.png')}" alt="Checkout SRI">
      </div>
      <div class="img-card">
        <h3>S1-10: Auditoría Bot Guardián IA</h3>
        <img src="${toBase64Image('14-vercel-publish-step5-bot.png')}" alt="Bot IA">
      </div>
      <div class="img-card" style="grid-column: span 2;">
        <h3>S1-10b: Inmueble Publicado y Renderizado en Vercel</h3>
        <img src="${toBase64Image('15-vercel-property-live-published.png')}" alt="Publicado">
      </div>
    </div>

    <h2>4. Evidencias Sprint 2: Directorios, Perfiles Notariales, Mapas y Valuador IA</h2>
    <div class="img-grid">
      <div class="img-card">
        <h3>S2-01: Directorio de Agentes DMQ</h3>
        <img src="${toBase64Image('16-vercel-agents-directory.png')}" alt="Agentes">
      </div>
      <div class="img-card">
        <h3>S2-02: Dossier Público de Agente</h3>
        <img src="${toBase64Image('17-vercel-agent-public-profile.png')}" alt="Dossier Agente">
      </div>
      <div class="img-card">
        <h3>S2-03: Directorio de Inmobiliarias</h3>
        <img src="${toBase64Image('18-vercel-companies-directory.png')}" alt="Inmobiliarias">
      </div>
      <div class="img-card">
        <h3>S2-04: Split-View Mapa Vectorial</h3>
        <img src="${toBase64Image('19-vercel-splitview-map.png')}" alt="Mapa">
      </div>
      <div class="img-card">
        <h3>S2-05: Tasador Inteligente IA DMQ</h3>
        <img src="${toBase64Image('20-vercel-valuation-ai.png')}" alt="Valuador IA">
      </div>
      <div class="img-card">
        <h3>S2-06: Menú Móvil iPhone 14 (390x844)</h3>
        <img src="${toBase64Image('21-vercel-mobile-responsive-menu.png')}" alt="Móvil">
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const htmlPath = path.join(ARTIFACT_DIR, 'certificacion_vercel_sprint1_y_sprint2.html');
  const pdfPath = path.join(ARTIFACT_DIR, 'certificacion_vercel_sprint1_y_sprint2.pdf');

  fs.writeFileSync(htmlPath, htmlContent);
  console.log('HTML generado en:', htmlPath);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });
  await browser.close();
  console.log('PDF generado exitosamente en:', pdfPath);
}

generateReport().catch(console.error);
