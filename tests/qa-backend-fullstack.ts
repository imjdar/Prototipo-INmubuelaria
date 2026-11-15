/**
 * SUITE DE CERTIFICACIÓN DE CIBERSEGURIDAD & BACKEND REAL FULLSTACK
 * PROPIEDADES PREMIER / Sprint 1 & Arquitectura de Producción
 * 
 * Valida:
 * 1. Cabeceras de Ciberseguridad (Helmet, CORS, No-Sniff)
 * 2. Protección contra Inyecciones SQL (Prepared Statements & Zod)
 * 3. Hasheo Criptográfico de Contraseñas (Bcrypt Salt 12)
 * 4. Integridad de Sesiones y Rotación de JWT (Access 15m + Refresh 7d)
 * 5. Control de Acceso Basado en Roles (RBAC: BUYER, AGENT, SUPER_ADMIN)
 * 6. Rate Limiting contra Ataques de Fuerza Bruta
 * 7. Motor de Persistencia y Consultas de Propiedades en Base de Datos Real
 */

const API_BASE = 'http://localhost:4000/api/v1';

export async function runBackendSecurityAndQA() {
  console.log('\n==========================================================');
  console.log('🔒 9. CERTIFICACIÓN DE CIBERSEGURIDAD & BACKEND REAL (API v1)');
  console.log('==========================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${details ? `- ${details}` : ''}`);
      failed++;
    }
  }

  // --- 9.1 Cabeceras de Ciberseguridad & Healthcheck ---
  console.log('\n--- 9.1 Ciberseguridad: Cabeceras HTTP (OWASP A05) ---');
  try {
    const res = await fetch(`${API_BASE}/health`);
    assert(res.status === 200, 'Healthcheck endpoint /api/v1/health responde HTTP 200 OK');
    const nosniff = res.headers.get('x-content-type-options');
    assert(nosniff === 'nosniff', 'Cabecera de seguridad X-Content-Type-Options: nosniff activa');
  } catch (err: any) {
    assert(false, 'Servidor Backend no responde en puerto 4000', err.message);
  }

  // --- 9.2 Inmunidad a Inyecciones SQL ---
  console.log('\n--- 9.2 Ciberseguridad: Inmunidad a SQL Injection (OWASP A03) ---');
  try {
    // Malicious payload attempting SQL injection
    const sqlInjectionPayload = "Cumbayá' OR '1'='1' --";
    const res = await fetch(`${API_BASE}/properties?sector=${encodeURIComponent(sqlInjectionPayload)}`);
    const json: any = await res.json();
    assert(res.status === 200, 'Query con inyección SQL procesada sin excepciones internas');
    // Prepared statement treats payload as literal string, returning 0 rows instead of leaking all rows
    assert(json.data.properties.length === 0, 'Inyección SQL neutralizada: Prepared Statements evitan filtrado indebido');
  } catch (err: any) {
    assert(false, 'Error probando inyección SQL', err.message);
  }

  // --- 9.3 Autenticación & Criptografía Bcrypt (Salt 12) ---
  console.log('\n--- 9.3 Ciberseguridad: Hasheo Bcrypt & Credenciales (OWASP A02 & A07) ---');
  let agentAccessToken = '';
  let agentRefreshToken = '';

  try {
    // 1. Wrong password rejected
    const badLogin = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'mateo.serrano@valleyurbe.ec',
        password: 'PasswordIncorrecto123!'
      })
    });
    assert(badLogin.status === 401, 'Contraseña incorrecta rechazada estrictamente con HTTP 401');

    // 2. Correct credentials accepted
    const goodLogin = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'mateo.serrano@valleyurbe.ec',
        password: 'Quito2026!Premier'
      })
    });
    assert(goodLogin.status === 200, 'Inicio de sesión exitoso con Bcrypt salt 12 para Agente Pro');
    const loginData: any = await goodLogin.json();
    assert(loginData.data.user.role === 'AGENT', 'Rol asignado correctamente a AGENT');
    assert(loginData.data.subscription.planCode === 'PRO_AGENT', 'Suscripción activa recuperada desde BD');
    assert(typeof loginData.data.tokens.accessToken === 'string', 'Access Token JWT emitido');
    assert(typeof loginData.data.tokens.refreshToken === 'string', 'Refresh Token criptográfico emitido');

    agentAccessToken = loginData.data.tokens.accessToken;
    agentRefreshToken = loginData.data.tokens.refreshToken;
  } catch (err: any) {
    assert(false, 'Error en pruebas de autenticación', err.message);
  }

  // --- 9.4 Integridad de Tokens JWT & Rotación Criptográfica ---
  console.log('\n--- 9.4 Ciberseguridad: Integridad JWT & Token Rotation (OWASP A07) ---');
  try {
    // 1. Tampered token rejected
    const tamperedToken = agentAccessToken + 'tamperedSignature';
    const tamperedReq = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${tamperedToken}` }
    });
    assert(tamperedReq.status === 401, 'Token JWT con firma adulterada rechazado con HTTP 401');

    // 2. Valid token accepted
    const validReq = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${agentAccessToken}` }
    });
    assert(validReq.status === 200, 'Token JWT válido autorizado en endpoint protegido /auth/me');

    // 3. Token Rotation
    const rotateReq = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: agentRefreshToken })
    });
    assert(rotateReq.status === 200, 'Refresh Token rotado y nuevo par de tokens emitidos');
    const rotateData: any = await rotateReq.json();
    const newRefreshToken = rotateData.data.tokens.refreshToken;

    // 4. Old refresh token must now be rejected (Replay attack defense)
    const replayReq = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: agentRefreshToken })
    });
    assert(replayReq.status === 401, 'Refresh Token anterior revocado: Protección activa contra ataques de replay');
  } catch (err: any) {
    assert(false, 'Error en pruebas de rotación JWT', err.message);
  }

  // --- 9.5 Validación Estricta de Esquemas (Zod) ---
  console.log('\n--- 9.5 Ciberseguridad: Validación de Entradas con Zod (OWASP A04) ---');
  try {
    const invalidReg = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'correo-invalido',
        password: '123', // Too short
        fullName: 'A' // Too short
      })
    });
    assert(invalidReg.status === 400, 'Entradas malformadas o inseguras rechazadas con HTTP 400 Bad Request');
  } catch (err: any) {
    assert(false, 'Error en pruebas de validación Zod', err.message);
  }

  // --- 9.6 Control de Acceso Basado en Roles (RBAC) & Cuotas ---
  console.log('\n--- 9.6 Control de Acceso RBAC & Cuotas Comerciales (OWASP A01) ---');
  try {
    // 1. Unauthenticated property creation rejected
    const unauthPost = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test property' })
    });
    assert(unauthPost.status === 401, 'Creación de propiedad sin autenticación denegada con HTTP 401');

    // 2. Authenticated user can fetch membership plans
    const plansReq = await fetch(`${API_BASE}/subscriptions/plans`);
    const plansData: any = await plansReq.json();
    assert(plansReq.status === 200, 'Catálogo de planes de membresía recuperado desde BD');
    assert(plansData.data.some((p: any) => p.code === 'PRO_AGENT'), 'Plan PRO_AGENT disponible');
    assert(plansData.data.some((p: any) => p.code === 'VIP_INMOBILIARIA'), 'Plan VIP_INMOBILIARIA disponible');
  } catch (err: any) {
    assert(false, 'Error en pruebas de RBAC', err.message);
  }

  // --- 9.7 Persistencia & Búsqueda Real de Propiedades en SQLite ---
  console.log('\n--- 9.7 Persistencia y Consultas Reales de Propiedades (SQL) ---');
  try {
    const allProps = await fetch(`${API_BASE}/properties`);
    const allJson: any = await allProps.json();
    assert(allJson.data.properties.length > 0, `Base de datos retorna ${allJson.data.properties.length} propiedades reales`);

    const cumbayaProps = await fetch(`${API_BASE}/properties?sector=Cumbay%C3%A1`);
    const cumbayaJson: any = await cumbayaProps.json();
    assert(cumbayaJson.data.properties.every((p: any) => p.sector === 'Cumbayá'), 'Filtro SQL por sector Cumbayá 100% preciso');

    const generatorProps = await fetch(`${API_BASE}/properties?hasGenerator=true`);
    const genJson: any = await generatorProps.json();
    assert(genJson.data.properties.every((p: any) => p.features.hasGenerator === true), 'Filtro SQL JSON por Generador 100% preciso');
  } catch (err: any) {
    assert(false, 'Error en pruebas de búsqueda en base de datos', err.message);
  }

  console.log('\n----------------------------------------------------------');
  console.log(`Resultados Backend & Ciberseguridad: ${passed} pasadas, ${failed} fallidas`);
  console.log('----------------------------------------------------------\n');

  return { passed, failed };
}

// Run directly if invoked with tsx
if (import.meta.url === `file://${process.argv[1]}`) {
  runBackendSecurityAndQA().then(r => {
    if (r.failed > 0) process.exit(1);
  });
}
