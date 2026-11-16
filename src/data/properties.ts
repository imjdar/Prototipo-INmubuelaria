import { Property } from '../types/property';

export const PROPERTIES: Property[] = [
  {
    id: 'VU-CUM-048',
    title: 'Villa Natura Contemporánea con Infinity Pool',
    sector: 'Cumbayá',
    microzone: 'San Juan Alto · Urbanización Privada Exclusiva',
    type: 'Casa',
    price: 580000,
    areaBuild: 450,
    areaLot: 820,
    bedrooms: 4,
    bathrooms: 5.5,
    parking: 4,
    hoaFee: 185,
    elevation: 2210,
    temperature: '22°C Subtropical',
    image: '/images/cumbaya_villa.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/nayon_cliff_villa.jpg',
      '/images/tumbaco_chaquinan_casa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Certificado de Gravámenes DMQ al día (Sin Hipotecas)',
    description: 'Obra maestra de arquitectura contemporánea con líneas orgánicas y ventanales acústicos de piso a techo. Piscina temperada sinfín con vista al valle y al volcán Ilaló, cocina de chef con isla en mármol Calacatta, generador eléctrico a diésel 100% de transferencia automática que abastece toda la propiedad y doble filtro de seguridad en garita 24/7.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '6 min',
      usfq: '8 min',
      aeropuerto: '14 min (Ruta Viva)',
      quitoCentro: '18 min (Túnel Guayasamín)'
    },
    coordinates: { x: 74, y: 55, lat: -0.2052, lng: -78.4365 }
  },
  {
    id: 'VU-PUE-019',
    title: 'Quinta Campestre Los Arrayanes & Golf Club',
    sector: 'Puembo',
    microzone: 'Sector Arrayanes Country Club · Urbanización Cerrada',
    type: 'Casa',
    price: 790000,
    areaBuild: 620,
    areaLot: 1800,
    bedrooms: 4,
    bathrooms: 6,
    parking: 6,
    hoaFee: 240,
    elevation: 2150,
    temperature: '23°C Clima Cálido Valle',
    image: '/images/puembo_country.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_villa.jpg',
      '/images/tumbaco_chaquinan_casa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Título de Dominio 100% Saneado · Un solo propietario',
    description: 'Residencia campestre contemporánea en una sola planta con parque privado de 1.800 m². Mampostería en piedra andina volcánica, pérgola exterior con chimenea a gas y horno de leña, piscina privada temperada con bomba de calor, sistema fotovoltaico de 12 paneles solares y generador de respaldo total insonorizado.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '14 min',
      usfq: '15 min',
      aeropuerto: '12 min (Acceso Expreso)',
      quitoCentro: '25 min'
    },
    coordinates: { x: 88, y: 48, lat: -0.2190, lng: -78.3485 }
  },
  {
    id: 'VU-GON-012',
    title: 'Penthouse Dúplex Guápulo Vista con Doble Altura',
    sector: 'González Suárez',
    microzone: 'Av. González Suárez & Orellana · Mirador Panorámico',
    type: 'Penthouse',
    price: 420000,
    areaBuild: 280,
    areaLot: 95,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 220,
    elevation: 2820,
    temperature: '18°C Skyline Andino',
    image: '/images/luxury_interior.jpg',
    subPhotos: [
      '/images/carolina_sky_suite.jpg',
      '/images/nayon_cliff_villa.jpg',
      '/images/cumbaya_villa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Propiedad Horizontal Inscrita · Sin Gravamen ni Hipoteca',
    description: 'Penthouse dúplex de autor con impresionante doble altura revestida en travertino y ventanales corridos hacia el Santuario de Guápulo y la cordillera oriental. Ascensor directo privado, terraza de 45 m² con firepit a gas, cocina de inducción de última generación y edificio con planta eléctrica que abastece al 100% de los departamentos.',
    agent: {
      name: 'Dra. Sofía Alarcón',
      role: 'Especialista en Penthouses & Skyline',
      license: 'Lic. Registro Notarial DMQ #0588',
      phone: '+593998765433',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '12 min (Túnel)',
      usfq: '14 min',
      aeropuerto: '35 min',
      quitoCentro: '5 min a La Carolina'
    },
    coordinates: { x: 38, y: 52, lat: -0.2018, lng: -78.4795 }
  },
  {
    id: 'VU-CAR-005',
    title: 'Sky Suite Inversión La Carolina (2 min Metro)',
    sector: 'La Carolina',
    microzone: 'Av. República de El Salvador & Moscú · Eje Financiero',
    type: 'Suite',
    price: 165000,
    areaBuild: 70,
    areaLot: 70,
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 1,
    hoaFee: 110,
    elevation: 2810,
    temperature: '17°C Urbano Corporativo',
    image: '/images/carolina_sky_suite.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_villa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: true,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Certificado de Gravámenes Libre · Apto Crédito VIP Biess/Banco',
    description: 'Suite ejecutiva de alta rentabilidad ubicada a 180 metros de la Estación La Carolina del Metro de Quito. Torre icónica con diseño biofílico y jardines verticales, generador eléctrico 100% que alimenta departamentos y ascensores durante cortes de red, piscina temperada panorámica en piso 22, coworking y permiso legal para Airbnb con rendimiento proyectado del 11.2% anual.',
    agent: {
      name: 'Dra. Sofía Alarcón',
      role: 'Especialista en Inversión & Rentabilidad',
      license: 'Lic. Registro Notarial DMQ #0588',
      phone: '+593998765433',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '18 min',
      usfq: '20 min',
      aeropuerto: '40 min',
      quitoCentro: '0 min (Corazón Financiero)'
    },
    coordinates: { x: 30, y: 38, lat: -0.1812, lng: -78.4839 }
  },
  {
    id: 'VU-TUM-031',
    title: 'Casa Campestre El Chaquiñán La Viña',
    sector: 'Tumbaco',
    microzone: 'Sector La Viña · Acceso Directo al Chaquiñán',
    type: 'Casa',
    price: 345000,
    areaBuild: 230,
    areaLot: 350,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 2,
    hoaFee: 135,
    elevation: 2240,
    temperature: '22°C Clima Valle Cálido',
    image: '/images/tumbaco_chaquinan_casa.jpg',
    subPhotos: [
      '/images/cumbaya_villa.jpg',
      '/images/luxury_interior.jpg',
      '/images/puembo_country.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: false
    },
    legalStatus: 'Certificado de Gravámenes Limpio DMQ · Listo para Notaría',
    description: 'Casa contemporánea en conjunto privado de solo 12 residencias en La Viña, con portón privado directo hacia la ruta ecológica del Chaquiñán para caminatas y ciclismo. Cuenta con generador para servicios esenciales e iluminación, pérgola con parrilla de acero inoxidable y amplias áreas verdes infantiles.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '8 min',
      usfq: '10 min',
      aeropuerto: '20 min',
      quitoCentro: '22 min'
    },
    coordinates: { x: 80, y: 65, lat: -0.2160, lng: -78.4020 }
  },
  {
    id: 'VU-NAY-017',
    title: 'Residencia Voladizo Mirador de Nayón',
    sector: 'Nayón',
    microzone: 'Rancho San Francisco / Loma de Nayón · Mirador Cumbayá',
    type: 'Casa',
    price: 495000,
    areaBuild: 300,
    areaLot: 600,
    bedrooms: 3,
    bathrooms: 4,
    parking: 3,
    hoaFee: 160,
    elevation: 2400,
    temperature: '21°C Microclima Templado',
    image: '/images/nayon_cliff_villa.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_villa.jpg',
      '/images/puembo_country.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Título Saneado en Notaría DMQ · Sin Hipotecas',
    description: 'Ubicación estratégica inmejorable entre Quito Norte y el Valle de Cumbayá (a 5 minutos del Club Rancho San Francisco y 8 minutos del Túnel Guayasamín). Arquitectura en voladizo sobre el cañón con terraza panorámica de 180°, piscina infinity, paneles solares de respaldo y generador diésel con encendido automático.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '5 min',
      usfq: '6 min',
      aeropuerto: '22 min',
      quitoCentro: '8 min (Túnel Guayasamín)'
    },
    coordinates: { x: 55, y: 46, lat: -0.1885, lng: -78.4520 },
    operationType: 'VENTA'
  },
  {
    id: 'VU-BOS-001',
    title: 'Departamentos de Lujo | El Bosque',
    sector: 'González Suárez',
    microzone: 'El Bosque Alto · Sector Residencial Exclusivo',
    type: 'Departamento',
    operationType: 'VENTA',
    price: 299000,
    areaBuild: 400,
    areaLot: 400,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    hoaFee: 210,
    elevation: 2850,
    temperature: '18°C Fresco Andino',
    image: '/images/luxury_interior.jpg',
    subPhotos: [
      '/images/quito_skyline.jpg',
      '/images/cumbaya_villa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Propiedad Horizontal Registrada DMQ · Libre de Hipoteca',
    description: 'Residencia en piso alto en El Bosque con vista ininterrumpida a la cordillera y ciudad. Acabados importados en pisos de bambú, amplias terrazas con cortinas de cristal y generador 100% de respaldo.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles y Quito',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '20 min',
      usfq: '22 min',
      aeropuerto: '35 min',
      quitoCentro: '12 min'
    },
    coordinates: { x: 38, y: 32, lat: -0.1585, lng: -78.4980 }
  },
  {
    id: 'VU-REP-002',
    title: 'Oficina Corporativa Prime | República del Salvador',
    sector: 'La Carolina',
    microzone: 'Av. República del Salvador · Distrito Financiero',
    type: 'Oficina',
    operationType: 'RENTA',
    price: 1200,
    areaBuild: 120,
    areaLot: 120,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    hoaFee: 140,
    elevation: 2810,
    temperature: '19°C Urbano',
    image: '/images/quito_skyline.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_villa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: false,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: true
    },
    rentalDetails: {
      leaseDurationMonths: 12,
      depositMonths: 2,
      petsAllowed: false,
      includesHoa: true,
      furnished: true
    },
    legalStatus: 'Contrato Notarial Ley de Inquilinato DMQ',
    description: 'Oficina ejecutiva totalmente amoblada con divisiones acústicas de vidrio, sala de reuniones climatizada, fibra óptica simétrica y generador eléctrico para operaciones ininterrumpidas.',
    agent: {
      name: 'Abg. Carlos Vintimilla',
      role: 'Director Notarial & Corporativo',
      license: 'Lic. Registro Notarial DMQ #1084',
      phone: '+593991234567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '16 min',
      usfq: '18 min',
      aeropuerto: '32 min',
      quitoCentro: '10 min'
    },
    coordinates: { x: 42, y: 36, lat: -0.1830, lng: -78.4815 }
  },
  {
    id: 'VU-CUM-003',
    title: 'Casa Contemporánea en Urbanización | Cumbayá',
    sector: 'Cumbayá',
    microzone: 'La Primavera · Valle de Cumbayá',
    type: 'Casa',
    operationType: 'VENTA',
    price: 450000,
    areaBuild: 350,
    areaLot: 500,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    hoaFee: 120,
    elevation: 2200,
    temperature: '22°C Valle Primaveral',
    image: '/images/cumbaya_villa.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/puembo_country.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Título saneado en Notaría Cumbayá · Apto BIESS',
    description: 'Casa independiente en urbanización cerrada con jardines privados, pérgola con parrilla BBQ y acceso directo al Chaquiñán. Cuenta con generador 100% y doble garita de acceso.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '4 min',
      usfq: '5 min',
      aeropuerto: '16 min',
      quitoCentro: '15 min'
    },
    coordinates: { x: 72, y: 52, lat: -0.2095, lng: -78.4290 }
  },
  {
    id: 'VU-BOD-004',
    title: 'Bodega Industrial Logística | Parque Logístico Norte',
    sector: 'Nayón',
    microzone: 'Complejo Industrial & Logístico Nayón - Cumbayá',
    type: 'Bodega',
    operationType: 'RENTA',
    price: 3000,
    areaBuild: 500,
    areaLot: 750,
    bedrooms: 0,
    bathrooms: 2,
    parking: 6,
    hoaFee: 250,
    elevation: 2350,
    temperature: '21°C Seco',
    image: '/images/puembo_country.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/quito_skyline.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: false
    },
    rentalDetails: {
      leaseDurationMonths: 24,
      depositMonths: 2,
      petsAllowed: false,
      includesHoa: true,
      furnished: false
    },
    legalStatus: 'Uso de Suelo Comercial e Industrial Aprobado DMQ',
    description: 'Bodega triple altura (9 metros libres) con piso epóxico de alta resistencia para montacargas, patio de maniobras para camiones pesados, oficinas administrativas y subestación eléctrica con generador de respaldo.',
    agent: {
      name: 'Abg. Carlos Vintimilla',
      role: 'Director Notarial & Comercial',
      license: 'Lic. Registro Notarial DMQ #1084',
      phone: '+593991234567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '8 min',
      usfq: '10 min',
      aeropuerto: '20 min',
      quitoCentro: '14 min'
    },
    coordinates: { x: 58, y: 44, lat: -0.2250, lng: -78.3320 }
  },
  {
    id: 'VU-PROJ-001',
    title: 'Torre Premier Sky Residences (Pre-Venta)',
    sector: 'La Carolina',
    microzone: 'Av. República del Salvador · Frente a La Carolina',
    type: 'Proyecto',
    operationType: 'PROYECTO',
    price: 185000,
    areaBuild: 95,
    areaLot: 95,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    hoaFee: 110,
    elevation: 2810,
    temperature: '19°C Urbano Moderno',
    image: '/images/quito_skyline.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_villa.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    projectDetails: {
      developerName: 'Premier Desarrollos & Uribe Schwarzkopf',
      stage: 'CONSTRUCCION',
      deliveryDate: 'Diciembre 2026',
      progressPercent: 68,
      minDownPaymentPct: 10,
      installmentsCount: 24,
      brochurePdfUrl: '/docs/brochure_torre_premier.pdf'
    },
    legalStatus: 'Fideicomiso Mercantil de Inversión y Construcción Banco Pichincha',
    description: 'Icono arquitectónico de 24 pisos con vista directa al parque La Carolina. Amenities 5 estrellas: piscina semiolímpica en rooftop, sala de cine privada, coworking de doble piso y spa. Financiación directa 10/30/60.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Director de Ventas de Proyectos',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '15 min',
      usfq: '18 min',
      aeropuerto: '30 min',
      quitoCentro: '10 min'
    },
    coordinates: { x: 44, y: 38, lat: -0.1795, lng: -78.4855 }
  },
  {
    id: 'VU-PROJ-002',
    title: 'Botániq Valley Residences (En Planos)',
    sector: 'Cumbayá',
    microzone: 'San Juan Alto · Valle de Cumbayá',
    type: 'Proyecto',
    operationType: 'PROYECTO',
    price: 340000,
    areaBuild: 280,
    areaLot: 400,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 150,
    elevation: 2210,
    temperature: '22°C Valle Cálido',
    image: '/images/cumbaya_villa.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/puembo_country.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    projectDetails: {
      developerName: 'Álvarez Bravo Constructores',
      stage: 'PLANOS',
      deliveryDate: 'Junio 2027',
      progressPercent: 25,
      minDownPaymentPct: 10,
      installmentsCount: 30,
      brochurePdfUrl: '/docs/brochure_botaniq.pdf'
    },
    legalStatus: 'Aprobación Municipal DMQ y Fideicomiso Produbanco',
    description: 'Conjunto residencial boutique de solo 16 casas campestres integradas a la vegetación nativa de Cumbayá. Canchas de pádel, piscina temperada, huerto orgánico comunitario y generador 100%.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista en Proyectos de Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '6 min',
      usfq: '7 min',
      aeropuerto: '15 min',
      quitoCentro: '16 min'
    },
    coordinates: { x: 75, y: 56, lat: -0.2010, lng: -78.4410 }
  },
  {
    id: 'VU-CUM-055',
    title: 'Residencia Lumbisí Privada con Cancha de Pádel',
    sector: 'Cumbayá',
    microzone: 'Lumbisí · Urbanización Privada Rinconada',
    type: 'Casa',
    price: 640000,
    areaBuild: 480,
    areaLot: 950,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 4,
    hoaFee: 210,
    elevation: 2230,
    temperature: '22°C Templado',
    image: '/images/cumbaya_lumbisi_mansion.jpg',
    subPhotos: [
      '/images/modern_kitchen_marble.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Certificado de Gravámenes DMQ al día (Sin Hipotecas)',
    description: 'Residencia contemporánea en condominio privado con cancha de pádel reglamentaria, jardín plano con riego automático y porche social con chimenea de bioetanol. Respaldo eléctrico 100% y pozo de agua propio.',
    agent: {
      name: 'Arq. Valeria Montalvo',
      role: 'Consultora Residencial Cumbayá Elite',
      license: 'Lic. ACBIR-Pichincha #0542',
      phone: '+593995428811',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '5 min',
      usfq: '7 min',
      aeropuerto: '16 min (Ruta Viva)',
      quitoCentro: '15 min (Túnel Guayasamín)'
    },
    coordinates: { x: 70, y: 58, lat: -0.2185, lng: -78.4410 }
  },
  {
    id: 'VU-PUE-027',
    title: 'Villa Golf & Ecuestre Los Arrayanes',
    sector: 'Puembo',
    microzone: 'Arrayanes Country Club · Macrolote Campestre',
    type: 'Casa',
    price: 920000,
    areaBuild: 580,
    areaLot: 2200,
    bedrooms: 5,
    bathrooms: 6,
    parking: 6,
    hoaFee: 250,
    elevation: 2180,
    temperature: '23°C Cálido Seco',
    image: '/images/puembo_golf_residence.jpg',
    subPhotos: [
      '/images/puembo_arrayanes_estate.jpg',
      '/images/puembo_hacienda_quinta.jpg',
      '/images/infinity_pool_terrace.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Escritura Pública Notaría 12 DMQ · Declaratoria de Propiedad Horizontal Aprobada',
    description: 'Mansión campestre frente al hoyo 7 del Club Los Arrayanes. Piscina temperada con paneles solares, caballerizas privadas, pérgola BBQ con horno de leña italiano y doble filtro de seguridad armada.',
    agent: {
      name: 'Dra. Paulina Barahona',
      role: 'Especialista en Fincas & Golf Puembo',
      license: 'Lic. ACBIR-Pichincha #0318',
      phone: '+593993184590',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '12 min',
      usfq: '14 min',
      aeropuerto: '10 min (Conector Alpachaca)',
      quitoCentro: '25 min (Ruta Viva)'
    },
    coordinates: { x: 88, y: 40, lat: -0.1780, lng: -78.3610 }
  },
  {
    id: 'VU-TUM-042',
    title: 'Casa Minimalista La Morita con Pérgola & Piscina',
    sector: 'Tumbaco',
    microzone: 'Sector La Morita · Vía Intervalles',
    type: 'Casa',
    price: 410000,
    areaBuild: 360,
    areaLot: 720,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 120,
    elevation: 2280,
    temperature: '21°C Primaveral',
    image: '/images/tumbaco_morita_modern.jpg',
    subPhotos: [
      '/images/tumbaco_tola_house.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Título de Propiedad Libre de Gravámenes · Listo para Crédito Hipotecario',
    description: 'Vanguardia arquitectónica en una sola planta con techos altos de madera tratada y grandes ventanales. Jardín posterior con piscina temperada y huerto de cítricos. Generador a gas insonorizado 100%.',
    agent: {
      name: 'Ing. Xavier Moncayo',
      role: 'Asesor Residencial Tumbaco & Valles',
      license: 'Lic. ACBIR-Pichincha #0419',
      phone: '+593984197744',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '7 min',
      usfq: '9 min',
      aeropuerto: '18 min',
      quitoCentro: '20 min'
    },
    coordinates: { x: 78, y: 52, lat: -0.2110, lng: -78.4020 }
  },
  {
    id: 'VU-CUM-062',
    title: 'Mansión Miravalle con Vista Panorámica al Cañón',
    sector: 'Cumbayá',
    microzone: 'Miravalle 2 · Doble Garita Blindada',
    type: 'Casa',
    price: 850000,
    areaBuild: 520,
    areaLot: 1100,
    bedrooms: 4,
    bathrooms: 5,
    parking: 5,
    hoaFee: 240,
    elevation: 2320,
    temperature: '21°C Templado',
    image: '/images/cumbaya_pillagua_luxury.jpg',
    subPhotos: [
      '/images/cumbaya_jacaranda_villa.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Certificado Histórico Notarial Registrador de la Propiedad DMQ',
    description: 'Ubicada estratégicamente en Miravalle 2 a solo 8 minutos de Quito y 5 minutos de Cumbayá. Vista imponente al cañón del Guayllabamba, cine en casa, bodega de vinos subterránea y generador Caterpillar 100%.',
    agent: {
      name: 'Ing. Patricio Cárdenas',
      role: 'Consultor Senior Miravalle & Cumbayá',
      license: 'Lic. ACBIR-Pichincha #0910',
      phone: '+593989108822',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '4 min',
      usfq: '5 min',
      aeropuerto: '17 min',
      quitoCentro: '8 min (Túnel Guayasamín)'
    },
    coordinates: { x: 67, y: 50, lat: -0.2030, lng: -78.4550 }
  },
  {
    id: 'VU-GON-021',
    title: 'Penthouse Dúplex Terraza 360° González Suárez',
    sector: 'González Suárez',
    microzone: 'Av. González Suárez & San Ignacio · Edificio Ícono',
    type: 'Penthouse',
    price: 620000,
    areaBuild: 380,
    areaLot: 0,
    bedrooms: 3,
    bathrooms: 4,
    parking: 3,
    hoaFee: 310,
    elevation: 2820,
    temperature: '17°C Fresco Andino',
    image: '/images/gonzalez_suarez_penthouse.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/carolina_luxury_tower.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Sin Gravámenes ni Prohibiciones · Edificio con Administración Centralizada',
    description: 'El penthouse más exclusivo de la Av. González Suárez. Terraza perimetral con chimenea exterior de gas y vista insuperable a Guápulo y los volcanes orientales. Ascensor directo privado con clave biométrica.',
    agent: {
      name: 'Abg. Roberto Noboa',
      role: 'Asesor Patrimonial González Suárez',
      license: 'Lic. Registro Notarial DMQ #0155',
      phone: '+593981559900',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '14 min',
      usfq: '16 min',
      aeropuerto: '32 min',
      quitoCentro: '4 min'
    },
    coordinates: { x: 50, y: 44, lat: -0.1985, lng: -78.4795 }
  },
  {
    id: 'VU-CAR-018',
    title: 'Penthouse Boutique frente a Parque La Carolina',
    sector: 'La Carolina',
    microzone: 'Av. Shyris & Holanda · Torre Qorner',
    type: 'Penthouse',
    price: 385000,
    areaBuild: 220,
    areaLot: 0,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 2,
    hoaFee: 260,
    elevation: 2780,
    temperature: '18°C Templado Urbano',
    image: '/images/carolina_luxury_tower.jpg',
    subPhotos: [
      '/images/carolina_park_loft.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: true,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Fideicomiso Mercantil Mercantil Inmobiliario Produbanco',
    description: 'Ubicado en el piso 22 de Torre Qorner frente al Parque La Carolina y a 200m de la Estación La Carolina del Metro. Spa comunitario, piscina infinity en rooftop y generador eléctrico para todo el edificio.',
    agent: {
      name: 'Ing. Diego Falconí',
      role: 'Especialista en Inversiones La Carolina',
      license: 'Lic. Notarial DMQ #0923',
      phone: '+593999231478',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '15 min',
      usfq: '17 min',
      aeropuerto: '30 min',
      quitoCentro: '6 min (Vía Metro Línea 1)'
    },
    coordinates: { x: 48, y: 39, lat: -0.1840, lng: -78.4830 }
  },
  {
    id: 'VU-NAY-026',
    title: 'Villa Tacuri Voladizo sobre el Risco San Pedro',
    sector: 'Nayón',
    microzone: 'Sector Tacuri · Risco Panorámico Nayón',
    type: 'Casa',
    price: 530000,
    areaBuild: 410,
    areaLot: 860,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 4,
    hoaFee: 160,
    elevation: 2350,
    temperature: '21°C Microclima Templado',
    image: '/images/nayon_tacuri_view.jpg',
    subPhotos: [
      '/images/nayon_cliff_villa.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Gravámenes al Día · Notaría 28 DMQ · Libre de Prohibiciones',
    description: 'Arquitectura bioclimática en voladizo estructural sobre el cañón de Tacuri. Aire puro de valle, temperatura templada y acceso inmediato por la vía Nayón - Cumbayá. Acabados en teca y piedra andina.',
    agent: {
      name: 'Lcda. Andrea Cevallos',
      role: 'Consultora Patrimonial Nayón & Valles',
      license: 'Lic. ACBIR-Pichincha #0681',
      phone: '+593996813322',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '6 min',
      usfq: '8 min',
      aeropuerto: '20 min',
      quitoCentro: '12 min (Vía Simón Bolívar)'
    },
    coordinates: { x: 62, y: 46, lat: -0.1945, lng: -78.4590 }
  },
  {
    id: 'VU-PUE-035',
    title: 'Hacienda Campestre La Palma con Caballerizas',
    sector: 'Puembo',
    microzone: 'La Palma · Fincas San Antonio',
    type: 'Casa',
    price: 995000,
    areaBuild: 720,
    areaLot: 4500,
    bedrooms: 5,
    bathrooms: 6.5,
    parking: 8,
    hoaFee: 220,
    elevation: 2150,
    temperature: '24°C Subtropical Seco',
    image: '/images/puembo_hacienda_quinta.jpg',
    subPhotos: [
      '/images/puembo_arrayanes_estate.jpg',
      '/images/puembo_country.jpg',
      '/images/infinity_pool_terrace.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Cuerpo Cierto Escriturado en Notaría 45 · Afectaciones Viales Cero',
    description: 'Propiedad ecuestre señorial en el corazón agrícola de Puembo. 6 pesebreras de lujo, picadero de arena, casa de huéspedes independiente, lago artificial y microclima cálido los 365 días del año.',
    agent: {
      name: 'Ing. Juan Carlos Peñafiel',
      role: 'Especialista en Fincas Ecuestres Puembo',
      license: 'Lic. Notarial DMQ #0588',
      phone: '+593985883344',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '14 min',
      usfq: '16 min',
      aeropuerto: '12 min',
      quitoCentro: '28 min'
    },
    coordinates: { x: 92, y: 36, lat: -0.1710, lng: -78.3480 }
  },
  {
    id: 'VU-FLO-008',
    title: 'Loft Industrial & Galería de Arte La Floresta',
    sector: 'González Suárez',
    microzone: 'La Floresta · Distrito Creativo Calle Madrid & Coruña',
    type: 'Departamento',
    price: 195000,
    areaBuild: 135,
    areaLot: 0,
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
    hoaFee: 140,
    elevation: 2810,
    temperature: '17°C Bohemio Urbano',
    image: '/images/floresta_boutique_loft.jpg',
    subPhotos: [
      '/images/modern_kitchen_marble.jpg',
      '/images/luxury_interior.jpg',
      '/images/carolina_park_loft.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Propiedad Horizontal Registrada · Alcabala y Plusvalía Pagados',
    description: 'Diseño tipo loft neoyorquino con muros de ladrillo visto, tubería expuesta y techos de 3.80 metros. Ubicado a pasos de cafés de especialidad, galerías de arte y cines independientes en La Floresta.',
    agent: {
      name: 'Arq. María José Terán',
      role: 'Boutique Urbana & Patrimonio',
      license: 'Lic. Notarial DMQ #0762',
      phone: '+593997621199',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '12 min',
      usfq: '14 min',
      aeropuerto: '33 min',
      quitoCentro: '5 min'
    },
    coordinates: { x: 49, y: 47, lat: -0.2070, lng: -78.4870 }
  },
  {
    id: 'VU-TUM-053',
    title: 'Residencia Chaquiñán Tola Chica con Huerto Frutal',
    sector: 'Tumbaco',
    microzone: 'Tola Chica · Acceso Directo al Chaquiñán',
    type: 'Casa',
    price: 365000,
    areaBuild: 320,
    areaLot: 650,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 95,
    elevation: 2290,
    temperature: '21°C Microclima Cálido',
    image: '/images/tumbaco_tola_house.jpg',
    subPhotos: [
      '/images/tumbaco_chaquinan_casa.jpg',
      '/images/tumbaco_morita_modern.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Escritura Pública Notaría 17 DMQ · Certificado Libre de Afectaciones',
    description: 'Hogar familiar con portón de acceso directo para bicicletas al sendero ecológico El Chaquiñán. Amplio jardín con aguacates y chirimoyas en producción, sistema de paneles solares y generador de emergencia.',
    agent: {
      name: 'Lcda. Cristina Samaniego',
      role: 'Consultora Familiar Tumbaco',
      license: 'Lic. ACBIR-Pichincha #0562',
      phone: '+593995623344',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '8 min',
      usfq: '10 min',
      aeropuerto: '19 min',
      quitoCentro: '22 min'
    },
    coordinates: { x: 80, y: 55, lat: -0.2170, lng: -78.3950 }
  },
  {
    id: 'VU-TEN-014',
    title: 'Residencia Diplomática en Quito Tenis Club',
    sector: 'La Carolina',
    microzone: 'Quito Tenis · Sector Diplomático Mariano Echeverría',
    type: 'Casa',
    price: 720000,
    areaBuild: 510,
    areaLot: 680,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    hoaFee: 290,
    elevation: 2830,
    temperature: '17°C Clásico Residencial',
    image: '/images/quito_tenis_residence.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/cumbaya_san_juan_contemporary.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Registro de la Propiedad DMQ al día · Certificación de Seguridad Perimetral',
    description: 'Residencia de estilo señorial con acabados en mármol y maderas nobles andinas. Cerramiento con doble concertina, caseta de guardia privada, sauna, turco y generador eléctrico trifásico.',
    agent: {
      name: 'Lic. Fernando Echeverría',
      role: 'Especialista Sector Diplomático Quito Tenis',
      license: 'Lic. ACBIR-Pichincha #0834',
      phone: '+593998345566',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '16 min',
      usfq: '18 min',
      aeropuerto: '29 min',
      quitoCentro: '6 min'
    },
    coordinates: { x: 43, y: 35, lat: -0.1720, lng: -78.4980 }
  },
  {
    id: 'VU-MON-019',
    title: 'Casa Mirador Panorámica Lomas de Monteserrín',
    sector: 'Nayón',
    microzone: 'Lomas de Monteserrín · Calle De Los Pinos Panorámica',
    type: 'Casa',
    price: 480000,
    areaBuild: 390,
    areaLot: 540,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 3,
    hoaFee: 170,
    elevation: 2720,
    temperature: '18°C Vista Panorámica',
    image: '/images/monteserrin_panoramic.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/cumbaya_san_juan_contemporary.jpg',
      '/images/modern_kitchen_marble.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Certificado de Gravámenes Notaría 31 DMQ · Listo para Escrituración Inmediata',
    description: 'Moderna casa con vistas infinitas al valle de Cumbayá y al volcán Cotopaxi. A escasos minutos de la Academia Cotopaxi y Universidad de Las Américas. Terraza apergolada con jacuzzi exterior.',
    agent: {
      name: 'Arq. Doménica Lasso',
      role: 'Consultora Inmobiliaria Monteserrín',
      license: 'Lic. ACBIR-Pichincha #0715',
      phone: '+593997154488',
      avatar: 'https://images.unsplash.com/photo-1580894732439-6502283cb0f7?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '10 min',
      usfq: '12 min',
      aeropuerto: '25 min',
      quitoCentro: '10 min'
    },
    coordinates: { x: 55, y: 37, lat: -0.1650, lng: -78.4680 }
  },
  {
    id: 'VU-GUA-009',
    title: 'Villa Colonial Bohemia con Jardín en Guápulo',
    sector: 'González Suárez',
    microzone: 'Guápulo · Camino de Orellana & Santuario Histórico',
    type: 'Casa',
    price: 390000,
    areaBuild: 290,
    areaLot: 480,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    hoaFee: 80,
    elevation: 2690,
    temperature: '19°C Microclima Histórico',
    image: '/images/guapulo_boho_villa.jpg',
    subPhotos: [
      '/images/floresta_boutique_loft.jpg',
      '/images/luxury_interior.jpg',
      '/images/modern_kitchen_marble.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Declaratoria Patrimonial Aprobada por el Instituto Nacional de Patrimonio Cultural (INPC)',
    description: 'Joya arquitectónica restaurada con patio central empedrado, fuentes de agua, techos de teja artesanal y terraza privada con vista frontal al Santuario de Guápulo y al valle.',
    agent: {
      name: 'Arq. María José Terán',
      role: 'Boutique Urbana & Patrimonio',
      license: 'Lic. Notarial DMQ #0762',
      phone: '+593997621199',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '11 min',
      usfq: '13 min',
      aeropuerto: '32 min',
      quitoCentro: '4 min'
    },
    coordinates: { x: 52, y: 49, lat: -0.2035, lng: -78.4770 }
  },
  {
    id: 'VU-BEL-015',
    title: 'Departamento Balcón Terraza Bellavista Alta',
    sector: 'González Suárez',
    microzone: 'Bellavista Alta · Pasaje Bosmediano & Capilla del Hombre',
    type: 'Departamento',
    price: 285000,
    areaBuild: 185,
    areaLot: 0,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    hoaFee: 190,
    elevation: 2860,
    temperature: '16°C Vista Valles',
    image: '/images/bellavista_view_apartment.jpg',
    subPhotos: [
      '/images/luxury_interior.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/carolina_park_loft.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Propiedad Horizontal en Notaría 16 · Libre de Gravámenes e Hipotecas',
    description: 'Impresionante vista hacia Cumbayá y Guápulo desde una terraza privada de 35 m². Edificio exclusivo con piscina temperada, sauna, gimnasio y seguridad 24 horas con cámaras perimetrales.',
    agent: {
      name: 'Abg. Roberto Noboa',
      role: 'Asesor Patrimonial González Suárez',
      license: 'Lic. Registro Notarial DMQ #0155',
      phone: '+593981559900',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '12 min',
      usfq: '14 min',
      aeropuerto: '30 min',
      quitoCentro: '7 min'
    },
    coordinates: { x: 51, y: 41, lat: -0.1880, lng: -78.4730 }
  },
  {
    id: 'VU-CHI-022',
    title: 'Quinta Residencial Club Los Chillos & San Rafael',
    sector: 'Tumbaco',
    microzone: 'Valle de Los Chillos · San Rafael Club Residencial',
    type: 'Casa',
    price: 330000,
    areaBuild: 420,
    areaLot: 1250,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 4,
    hoaFee: 130,
    elevation: 2480,
    temperature: '20°C Valle Templado',
    image: '/images/chillos_san_rafael_quinta.jpg',
    subPhotos: [
      '/images/puembo_country.jpg',
      '/images/tumbaco_chaquinan_casa.jpg',
      '/images/modern_kitchen_marble.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Escritura Pública Notaría Rumiñahui · Certificado Catastral al Día',
    description: 'Propiedad campestre en el exclusivo Club Los Chillos con acceso a canchas de tenis, piscina y golf. Terreno plano con árboles frutales consolidados, sistema de alarma inteligente y generador de respaldo.',
    agent: {
      name: 'Lic. Mauricio Alarcón',
      role: 'Especialista Residencial Valle de Los Chillos',
      license: 'Lic. ACBIR-Pichincha #0345',
      phone: '+593983456677',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '18 min',
      usfq: '20 min',
      aeropuerto: '35 min',
      quitoCentro: '20 min (Autopista General Rumiñahui)'
    },
    coordinates: { x: 65, y: 75, lat: -0.2980, lng: -78.4480 }
  },
  {
    id: 'VU-CUM-077',
    title: 'Mansión de Ensueño Pillagua con Domótica Integral',
    sector: 'Cumbayá',
    microzone: 'Pillagua · Urbanización Exclusiva Alta Seguridad',
    type: 'Casa',
    price: 980000,
    areaBuild: 670,
    areaLot: 1600,
    bedrooms: 5,
    bathrooms: 6.5,
    parking: 6,
    hoaFee: 320,
    elevation: 2240,
    temperature: '22°C Cálido',
    image: '/images/cumbaya_san_juan_contemporary.jpg',
    subPhotos: [
      '/images/cumbaya_pillagua_luxury.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/modern_kitchen_marble.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Fideicomiso Patrimonial en Notaría 2 · Sin Gravámenes de Ningún Tipo',
    description: 'Máxima expresión del lujo en Pillagua Cumbayá. Sistema domótico Control4, audio zonificado Bowers & Wilkins, piscina infinita climatizada, cava climatizada para 800 botellas y generador diésel total.',
    agent: {
      name: 'Dra. Camila Guarderas',
      role: 'Gestión de Activos Ultra Prime Cumbayá',
      license: 'Lic. Notarial DMQ #0631',
      phone: '+593996318899',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '5 min',
      usfq: '6 min',
      aeropuerto: '16 min',
      quitoCentro: '16 min'
    },
    coordinates: { x: 72, y: 53, lat: -0.2080, lng: -78.4310 }
  },
  {
    id: 'VU-PRA-011',
    title: 'Departamento Corporativo Estación Metro La Pradera',
    sector: 'La Carolina',
    microzone: 'La Pradera · Av. Eloy Alfaro & República',
    type: 'Departamento',
    price: 235000,
    areaBuild: 160,
    areaLot: 0,
    bedrooms: 2,
    bathrooms: 2.5,
    parking: 2,
    hoaFee: 180,
    elevation: 2790,
    temperature: '18°C Centro Financiero',
    image: '/images/carolina_park_loft.jpg',
    subPhotos: [
      '/images/carolina_sky_suite.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: true,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Escrituras Registradas en Propiedad DMQ · Certificado Negativo de Gravámenes',
    description: 'Conectividad urbana total a 120 metros de la Estación La Pradera del Metro de Quito. Ventanales acústicos con doble vidrio laminado, acabados alemanes y áreas comunales con coworking y pista de trote.',
    agent: {
      name: 'Econ. Daniela Viteri',
      role: 'Asesora Inversiones & Rentas Corporativas',
      license: 'Lic. ACBIR-Pichincha #0299',
      phone: '+593992996677',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '14 min',
      usfq: '16 min',
      aeropuerto: '31 min',
      quitoCentro: '5 min (Metro Directo)'
    },
    coordinates: { x: 47, y: 42, lat: -0.1910, lng: -78.4860 }
  },
  {
    id: 'VU-PUE-044',
    title: 'Villa Campestre Arrayanes con Vistas al Valle del Chiche',
    sector: 'Puembo',
    microzone: 'Cañón del Chiche · Vía a Arrayanes',
    type: 'Casa',
    price: 695000,
    areaBuild: 460,
    areaLot: 1400,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 4,
    hoaFee: 190,
    elevation: 2190,
    temperature: '23°C Clima Subtropical',
    image: '/images/puembo_arrayanes_estate.jpg',
    subPhotos: [
      '/images/puembo_golf_residence.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Título Notarial Limpio · Cuota de Alícuota y Predios 2026 Cancelados',
    description: 'Diseño arquitectónico contemporáneo con espectaculares terrazas suspendidas sobre el cañón del río Chiche. Piscina con jacuzzi integrado, sistema de audio exterior y generador 100% automático.',
    agent: {
      name: 'Dra. Paulina Barahona',
      role: 'Especialista en Fincas & Golf Puembo',
      license: 'Lic. ACBIR-Pichincha #0318',
      phone: '+593993184590',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '11 min',
      usfq: '13 min',
      aeropuerto: '11 min',
      quitoCentro: '24 min'
    },
    coordinates: { x: 86, y: 44, lat: -0.1830, lng: -78.3720 }
  },
  {
    id: 'VU-INA-007',
    title: 'Loft Ejecutivo Inteligente Estación Iñaquito Metro',
    sector: 'La Carolina',
    microzone: 'Iñaquito · Av. Amazonas & Naciones Unidas Metro',
    type: 'Departamento',
    price: 158000,
    areaBuild: 95,
    areaLot: 0,
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 1,
    hoaFee: 110,
    elevation: 2785,
    temperature: '18°C Alta Conectividad',
    image: '/images/carolina_sky_suite.jpg',
    subPhotos: [
      '/images/floresta_boutique_loft.jpg',
      '/images/modern_kitchen_marble.jpg',
      '/images/luxury_interior.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: true,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: true,
      isAirbnb: true,
      hasMatterport: true
    },
    legalStatus: 'Propiedad Horizontal en Regla · Notaría 9 DMQ · Apto Crédito Hipotecario',
    description: 'Inmueble ideal para renta ejecutiva o nómadas digitales a 80 metros del Metro Iñaquito. Cerradura biométrica, cortinas automatizadas con control de voz, gimnasio y lavandería comunitaria.',
    agent: {
      name: 'Arq. Nicolás Andrade',
      role: 'Desarrollos Urbanos Inteligentes',
      license: 'Lic. Notarial DMQ #0894',
      phone: '+593998947711',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '15 min',
      usfq: '17 min',
      aeropuerto: '31 min',
      quitoCentro: '6 min (Metro Directo)'
    },
    coordinates: { x: 46, y: 38, lat: -0.1770, lng: -78.4890 }
  },
  {
    id: 'VU-CUM-089',
    title: 'Casa de Autor San Juan con Infinity Jacuzzi & Solárium',
    sector: 'Cumbayá',
    microzone: 'San Juan Alto · Urbanización Vista Hermosa',
    type: 'Casa',
    price: 515000,
    areaBuild: 395,
    areaLot: 780,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 165,
    elevation: 2220,
    temperature: '22°C Soleado',
    image: '/images/cumbaya_jacaranda_villa.jpg',
    subPhotos: [
      '/images/cumbaya_villa.jpg',
      '/images/infinity_pool_terrace.jpg',
      '/images/modern_kitchen_marble.jpg'
    ],
    features: {
      hasGenerator: true,
      hasMetro: false,
      hasDoubleGate: true,
      isValleyClimate: true,
      biessEligible: true,
      isAirbnb: false,
      hasMatterport: true
    },
    legalStatus: 'Gravámenes DMQ en Cero · Planos Aprobados · Licencia de Habitabilidad Vigente',
    description: 'Residencia de autor concebida para disfrutar del sol de Cumbayá. Jacuzzi exterior temperado para 8 personas con cascada, cocina con encimeras de cuarzo y generador eléctrico silencioso 100% automático.',
    agent: {
      name: 'Ing. Mateo Serrano',
      role: 'Especialista Patrimonial en Valles',
      license: 'Lic. Registro Notarial DMQ #0492',
      phone: '+593998765432',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    logistics: {
      scalaShopping: '6 min',
      usfq: '7 min',
      aeropuerto: '15 min',
      quitoCentro: '17 min'
    },
    coordinates: { x: 73, y: 56, lat: -0.2075, lng: -78.4345 }
  }
];
