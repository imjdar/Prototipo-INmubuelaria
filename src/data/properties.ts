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
    coordinates: { x: 74, y: 55 }
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
    coordinates: { x: 88, y: 48 }
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
    coordinates: { x: 38, y: 52 }
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
    coordinates: { x: 30, y: 38 }
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
    coordinates: { x: 80, y: 65 }
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
    coordinates: { x: 55, y: 46 }
  }
];
