# VALLE & URBE — Plataforma PropTech & Inmobiliaria Contemporánea (Quito, Ecuador)
### Implementación de Producción en React 19 + TypeScript + Vite

Prototipo MVP contemporáneo desarrollado para una firma inmobiliaria en **Quito y sus valles** (*Cumbayá, Puembo, Tumbaco, González Suárez, La Carolina, Nayón*).

Diseñado sobre la base de la investigación de competencia en vivo (`/browser`) y prototipado con el **Stitch Design System 2026** de Google (`projects/3509560871408713969`).

---

## 1. Arquitectura Técnica (React + TypeScript)

La aplicación ha sido reconstruida y estructurada de forma modular con tipado estricto:

```
Prototipo-INmubuelaria/
├── src/
│   ├── types/
│   │   └── property.ts           # Interfaces TypeScript (Property, FilterState, MortgageCalculation, etc.)
│   ├── data/
│   │   └── properties.ts         # Dataset tipado con propiedades curadas de Quito y valles
│   ├── components/
│   │   ├── TopMicroBar.tsx       # Barra superior de confianza y alternador de simulador móvil
│   │   ├── Header.tsx            # Navegación editorial, marca y botón WhatsApp VIP pulsante
│   │   ├── Hero.tsx              # Hero cinematográfico con métricas ($48M+ portafolio, 0 días limbo)
│   │   ├── FilterConsole.tsx     # Consola de filtros esenciales Quito (Generador 100%, Metro, Doble Garita)
│   │   ├── PropertyCard.tsx      # Tarjeta con fotos, precio/m², microclima, badges y acciones
│   │   ├── SplitViewMap.tsx      # Vista dividida con mapa vectorial interactivo de Quito y valles
│   │   ├── PropertyDetailView.tsx# Ficha arquitectónica notarial, galería y tiempos de traslado
│   │   ├── MortgageCalculator.tsx# Calculadora hipotecaria BIESS/Pichincha y aranceles notariales DMQ
│   │   ├── WhatsAppModal.tsx     # Modal con mensaje preformateado e ID notarial de la propiedad
│   │   ├── ScheduleModal.tsx     # Modal de agendamiento para visitas presenciales o tours 3D
│   │   ├── MobileDeviceSimulator.tsx # Simulador de smartphone nativo (390px) con historias de sectores
│   │   └── Footer.tsx            # Pie de página de lujo con oficinas en Cumbayá y González Suárez
│   ├── App.tsx                   # Estado global reactivo y orquestador de vistas
│   ├── main.tsx                  # Punto de entrada de React 19
│   └── index.css                 # Tokens del sistema de diseño Stitch (travertino, basalto, oro)
├── index.html                    # HTML con tipografías Playfair Display y Plus Jakarta Sans
├── package.json                  # Scripts y dependencias (React 19, Lucide React, Vite, TS)
├── tsconfig.json                 # Configuración de compilación TypeScript estricta
└── vite.config.ts                # Configuración optimizada de Vite
```

---

## 2. Los Filtros y Diferenciadores Críticos de Quito ("El Plus 2026")

Frente a la competencia tradicional (Plusvalía, RE/MAX, páginas en Wasi de 2012–2015), este prototipo introduce los factores que realmente le importan a los compradores en Quito hoy:

1. ⚡ **Generador Eléctrico 100% de Respaldo:** Filtra propiedades con planta eléctrica automática que cubre departamentos y bombas durante apagones.
2. 🚇 **Metro de Quito (&lt; 5 min):** Filtra inmuebles con conectividad inmediata a estaciones como La Carolina o San Francisco.
3. 🛡️ **Doble Garita & Urbanización Privada:** Seguridad multicapa para residencias en Cumbayá y Puembo.
4. ☀️ **Microclima de Valle (2,200 msnm):** Distingue el clima templado y soleado de Cumbayá/Puembo (22°C–23°C) del hipercentro urbano (17°C).
5. 📜 **Sello de Auditoría Notarial DMQ:** Certificado de gravámenes al día, sin litigios ni hipotecas ocultas.
6. 💵 **Calculadora Hipotecaria & Notarial:** Calcula la cuota en **BIESS (5.99%)** o **Banca Privada (8.45%)** y transparenta los aranceles notariales, el **Impuesto de Alcabala Municipal (1%)**, la Tasa Provincial (0.11%) y el Registro de la Propiedad del DMQ.
7. 💬 **WhatsApp-First Nativo:** Mensajes dinámicos estructurados con ID notarial para contacto en menos de 15 minutos.

---

## 3. Scripts para Desarrollo y Producción

```bash
# 1. Iniciar servidor de desarrollo en vivo (HMR)
npm run dev

# 2. Compilar y verificar tipos TypeScript (0 errores)
npm run build

# 3. Previsualizar la versión compilada para producción
npm run preview
```

---

## 4. Pantallas Prototipadas en Google Stitch

* **Proyecto:** `projects/3509560871408713969` (*Valle & Urbe - Modern Real Estate Quito*)
* **Design System:** `assets/c205c1e6454e40a4927b717258a315c8`
  * **Screen 1 (Homepage):** `3c11ef980f6744bfb33bd26d55abe161`
  * **Screen 2 (Split Search & Vector Map):** `31246ae7d0f24a558136b9e21abb7c1e`
  * **Screen 3 (Property Details & Due Diligence):** `0bbe176f909d4ad9b9050514e2bc29d0`
  * **Screen 4 (Mobile App 390px):** `76b04fcfe42742f185f91a6eb8790d81`
