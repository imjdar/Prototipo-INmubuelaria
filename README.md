# PROPIEDADES PREMIER (VALLE & URBE) — PLATAFORMA PROPTECH FULLSTACK
### Arquitectura Empresarial SOLID · React 19 · Node.js 22 · SQLite WAL · Docker & Nginx

Plataforma PropTech de alto rendimiento para el mercado inmobiliario de **Quito y sus valles** (*Cumbayá, Puembo, Tumbaco, González Suárez, La Carolina, Nayón*). Desarrollada siguiendo los principios de diseño de software **SOLID**, arquitectura limpia por capas (Clean Architecture / Hexagonal), ciberseguridad defensiva **OWASP Top 10**, persistencia transaccional ACID y containerización lista para despliegue en servidores de producción mediante **Docker & Docker Compose**.

---

## 1. Arquitectura de Software & Principios SOLID

El sistema implementa una separación rigurosa de responsabilidades tanto en el Backend como en el Frontend:

```
Prototipo-INmubuelaria/
├── Dockerfile                    # Multi-stage build de Frontend (Node 22 -> Nginx Alpine)
├── docker-compose.yml            # Orquestación de producción (Frontend, Backend, Redes, Volúmenes)
├── docker-compose.dev.yml        # Orquestación para desarrollo con Hot Reloading
├── nginx/
│   └── nginx.conf                # Servidor Web Nginx, compresión Gzip, caché inmutable y reverse proxy /api/
├── .env.example                  # Plantilla de configuración de variables de entorno seguras
├── database/
│   └── premier.db                # Base de datos relacional SQLite (WAL Mode, claves foráneas activas)
├── server/
│   ├── Dockerfile                # Multi-stage build del Backend en Node 22 Alpine (usuario no-root)
│   └── src/
│       ├── types/                # Interfaces de dominio, DTOs y contratos abstractos (ISP)
│       │   ├── domain.types.ts
│       │   ├── repository.types.ts
│       │   └── service.types.ts
│       ├── repositories/         # Capa de Acceso a Datos (DAL) con sentencias SQL preparadas (SRP, OCP)
│       │   ├── sqlitePropertyRepository.ts
│       │   ├── sqliteUserRepository.ts
│       │   ├── sqliteSubscriptionRepository.ts
│       │   ├── sqliteFavoriteRepository.ts
│       │   └── sqliteRefreshTokenRepository.ts
│       ├── services/             # Capa de Lógica de Negocio (BLL) desacoplada (SRP, DIP)
│       │   ├── propertyService.ts
│       │   ├── authService.ts
│       │   ├── subscriptionService.ts
│       │   └── favoriteService.ts
│       ├── container.ts          # Composition Root / Inversión de Dependencias (DIP)
│       ├── controllers/          # Controladores HTTP desacoplados con validación Zod (SRP)
│       │   ├── propertyController.ts
│       │   ├── authController.ts
│       │   ├── subscriptionController.ts
│       │   └── favoritesController.ts
│       ├── middleware/           # Middleware de ciberseguridad, JWT y Rate Limiting
│       │   ├── auth.ts
│       │   └── security.ts
│       ├── routes/               # Enrutamiento modular RESTful v1
│       └── index.ts              # Inicialización de Express y arranque del servidor API
├── src/                          # Frontend en React 19 + TypeScript
│   ├── components/               # Componentes UI atómicos y modulares (Stitch Design System)
│   ├── hooks/                    # Custom Hooks reactivos aislados (useUserFavorites, usePropertyComparison)
│   ├── services/                 # Clientes de servicios frontend (authService, propertyService, mortgageService)
│   ├── views/                    # Vistas dedicadas de la plataforma (Ventas, Rentas, Proyectos, Servicios)
│   ├── types/                    # Tipos fuertemente tipados de TypeScript
│   ├── App.tsx                   # Coordinador de interfaz y estado reactivo
│   ├── main.tsx                  # Bootstrap de React 19
│   └── index.css                 # Tokens de diseño institucionales (#FEA004 Oro, #213145 Azul Corporativo)
└── tests/                        # Suites de Certificación QA Integral (227 tests + E2E Puppeteer)
    ├── run-all-qa.ts             # Ejecutor maestro de pruebas automatizadas
    └── real-world-e2e-and-stress.ts # Pruebas 100% reales en Chrome Headless y Autocannon (1000+ req/s)
```

### Cumplimiento de Principios SOLID:

1. **S — Single Responsibility Principle (SRP):**
   - **Controladores:** Manejan exclusivamente la serialización HTTP, validación con Zod y códigos de respuesta.
   - **Servicios:** Gestionan reglas de negocio, validación de cuotas de inventario y políticas comerciales.
   - **Repositorios:** Encapsulan consultas SQL preparadas y mapeo relacional a objetos de dominio.
   - **Custom Hooks (Frontend):** Separan la persistencia y estado de favoritos o comparador de la capa visual.

2. **O — Open/Closed Principle (OCP):**
   - La arquitectura utiliza interfaces (`IPropertyRepository`, `IUserRepository`, etc.). Cambiar el motor de base de datos de SQLite a PostgreSQL o MySQL solo requiere agregar un nuevo adaptador en `repositories/` sin tocar controladores ni servicios.

3. **L — Liskov Substitution Principle (LSP):**
   - Todas las implementaciones de repositorios y servicios respetan los contratos tipados de `server/src/types/`, garantizando sustituibilidad completa sin efectos secundarios.

4. **I — Interface Segregation Principle (ISP):**
   - Se diseñaron interfaces pequeñas y específicas en lugar de interfaces monolíticas (`IPropertyRepository`, `IFavoriteRepository`, `ISubscriptionRepository`).

5. **D — Dependency Inversion Principle (DIP):**
   - Los módulos de alto nivel (Controladores y Servicios) no dependen de detalles de bajo nivel (`sqlite3` directo). Dependen de abstracciones. El Composition Root en `server/src/container.ts` ensambla las instancias.

---

## 2. Despliegue con Docker (Frontend + Backend + Nginx)

El proyecto está 100% preparado para desplegarse en cualquier servidor Linux (Ubuntu, Debian, RedHat, AWS, DigitalOcean) con un solo comando.

### Requisitos Previos:
- Docker Engine >= 24.0
- Docker Compose >= 2.20

### Pasos para Desplegar en Producción:

1. **Clonar el repositorio y configurar variables de entorno:**
   ```bash
   git clone https://github.com/imjdar/Prototipo-INmubuelaria.git
   cd Prototipo-INmubuelaria
   cp .env.example .env
   # Editar .env para colocar claves de producción (JWT_SECRET, etc.)
   ```

2. **Construir y levantar los contenedores:**
   ```bash
   docker compose up -d --build
   ```

3. **Verificar el estado de los contenedores:**
   ```bash
   docker compose ps
   ```

4. **Acceso a la plataforma:**
   - **Aplicación Web (Frontend):** `http://tu-servidor` o `http://localhost` (Puerto 80)
   - **API Backend Healthcheck:** `http://localhost:4000/api/v1/health` o `http://localhost/api/v1/health`
   - **Persistencia de Datos:** El volumen `premier-db-data` preserva la base de datos `database/premier.db` entre reinicios y actualizaciones.

---

## 3. Comandos de Desarrollo y Verificación QA

```bash
# 1. Iniciar Frontend en modo desarrollo (Vite)
npm run dev

# 2. Iniciar Backend en modo desarrollo (Express API en puerto 4000)
npm run server

# 3. Compilación estricta y verificación de tipos (Frontend + Backend)
npm run build

# 4. Ejecutar Suite Maestra de QA (227 Pruebas: Caja Blanca, Gris, Negra, Concurrencia, SOLID, IHC)
npm run test:qa

# 5. Ejecutar Pruebas 100% Reales (Google Chrome Puppeteer + Autocannon HTTP Load Test)
npm run test:real
```

---

## 4. Medidas de Ciberseguridad Defensiva (OWASP Top 10)

- **A01: Broken Access Control:** RBAC estricto (`BUYER`, `AGENT`, `SUPER_ADMIN`). Validación de cuota de publicaciones antes de permitir inserciones.
- **A02: Cryptographic Failures:** Contraseñas hasheadas con **Bcrypt (12 rondas de sal)**. Firma de tokens con **JWT de 15 minutos** y rotación forzada de **Refresh Tokens** con detección de ataques de reproducción (Replay Attack Prevention).
- **A03: Injection (SQL Injection):** 100% de consultas parametrizadas mediante SQLite Prepared Statements y validación estricta de esquemas de entrada con **Zod**.
- **A04: Insecure Design:** Límites estrictos de tamaño de payload (10MB), validación en servidor independiente del cliente.
- **A05: Security Misconfiguration:** Cabeceras de seguridad HTTP completas con **Helmet** (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **A07: Identification & Authentication Failures:** **Rate Limiting** por IP para prevenir ataques de fuerza bruta en `/api/v1/auth/login` y `/api/v1/auth/register`.
- **Contenedores no-root:** El Dockerfile del backend ejecuta el proceso bajo el usuario de sistema `node`, previniendo escalada de privilegios en el host.

---

## 5. Planes de Membresía Oficiales ($29, $49, $99)

- **Dueño Directo / Individual ($29/3 meses):** 1 publicación activa, verificación notarial y atención por WhatsApp.
- **Agente Pro ($49/3 meses):** Hasta 15 propiedades simultáneas, feed vertical 9:16 estilo TikTok, Bot Guardián IA y 3 destaques.
- **Inmobiliaria VIP ($99/3 meses):** Hasta 40 proyectos, tours 3D, CRM de leads y banners patrocinados.
