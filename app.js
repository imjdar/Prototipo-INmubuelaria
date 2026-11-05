/**
 * VALLE & URBE - Modern PropTech Application Logic (Quito, Ecuador)
 * State management, interactive filters, Quito cartography, and mortgage simulator.
 */

// Curated properties data for Quito and its valleys
const PROPERTIES_DATA = [
  {
    id: "VU-CUM-048",
    title: "Villa Natura Contemporánea",
    sector: "Cumbayá",
    microzone: "San Juan Alto · Urbanización Privada",
    type: "Casa",
    price: 580000,
    areaBuild: 450,
    areaLot: 820,
    bedrooms: 4,
    bathrooms: 5.5,
    parking: 4,
    hoaFee: 185,
    elevation: 2210,
    temperature: "22°C Subtropical",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1Wmx3lqvuUAliea9ZgBk3sjOq9y62rkVbfwmE7DzPo2ts3iCN_iScEGTuaYfaO7mV6zVDMoXVDrJ6Cyh6PmYaiPThN93ml5U18p5hpiqhRYULpdqlyr_EvsVnE-NUAWFxGmq_k820umpK0OK9rb_Eqwk9ST-wknO9AjOaG0kJ-oz0_IdZKoqGff2Gb9EX7JBRBfcj1zsKHpAr2AWzVXvShltAUM1Wva7ORGo0o5aw-A9V4DuxNAYe1Wc4M",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1VUGTnRAXGvN6VxUOeWhQWRcyUU7iTaqs706LIzVCv1RdJVtzVcXJyMkDiHSgq7-l2L0tPfqKItldfLQhobGJeQqq87rDowTrVBpxumgy71Kl9H7RCAD8PV8KYUaFRKDUzv3IAvwm2g9DAoZYCuv8LEUoXqajD7ZjeFA3UikuSXx-nQKx-MVNndRt7R0SkQWz48egYhVYZqYro8oG030GxdEkYSPt-vHCbetSx3Vv_G90V9TwEktpy7wA",
      "https://lh3.googleusercontent.com/aida/AEtjO1Ucv5kyNecGqU91SIuBpcTXjuBysR9oxNgCT8lckhLnHv4n38KNbEjDJK0mRDimRc_8Y3LmNh3-B95m9ihdW3-486EWteIHevkL1OvxK_IiP-KFpAOfoYAe9jtFV5fUR-rlaOOAYQit6UZ9h-zoW221KSBrk5_VjfhcHxlHrRmKWyNlUpN7SHUd8XrsGkld0A64-8GvBYrbsZCZftN8bTTFtn8wsTIHiuVuVeBOazTbPGJEH_QsmInGiHM"
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
    legalStatus: "Certificado de Gravámenes DMQ al día (Sin Hipotecas)",
    description: "Diseñada por estudio de arquitectura contemporánea en hormigón visto y ventanales de piso a techo. Cuenta con piscina climatizada sinfín con vista al volcán Ilaló, cocina con isla de cuarcita, generador de transferencia automática 100% que abastece toda la residencia y doble filtro de seguridad en garita.",
    agent: {
      name: "Ing. Mateo Serrano",
      role: "Especialista Patrimonial en Valles",
      license: "Lic. Registro Notarial #0492",
      phone: "+593998765432",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "6 min",
      usfq: "8 min",
      aeropuerto: "14 min (Ruta Viva)",
      quitoCentro: "18 min (Túnel Guayasamín)"
    },
    coordinates: { x: 74, y: 55 }
  },
  {
    id: "VU-PUE-019",
    title: "Quinta Campestre Los Arrayanes",
    sector: "Puembo",
    microzone: "Puembo Country Club & Golf",
    type: "Casa",
    price: 790000,
    areaBuild: 620,
    areaLot: 1800,
    bedrooms: 4,
    bathrooms: 6,
    parking: 6,
    hoaFee: 240,
    elevation: 2150,
    temperature: "23°C Clima Valle",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1Vs9dqJa4JnTuEUTpWtR3l8VgOLMkoWGlivico_YTY356WtOk-lnpAk8tJZp1R9gnW-tGpPnLGftZN0Q3epgYdjBinJSgTArHmVnhXKpW2CJJQEsiu4x5EUTtxeDE2814vDxxfVjvRC6NtecbA0bKtO2ep7hO7i1QjgkOr61ZGUG0bZLD7Fs0E0H95RMJ8M2bXqhTwhAUllBHZkBA6pF2cDXqEuT0AwikAHWRNbeF-pGi6SId7W_NBQlA",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1Wmx3lqvuUAliea9ZgBk3sjOq9y62rkVbfwmE7DzPo2ts3iCN_iScEGTuaYfaO7mV6zVDMoXVDrJ6Cyh6PmYaiPThN93ml5U18p5hpiqhRYULpdqlyr_EvsVnE-NUAWFxGmq_k820umpK0OK9rb_Eqwk9ST-wknO9AjOaG0kJ-oz0_IdZKoqGff2Gb9EX7JBRBfcj1zsKHpAr2AWzVXvShltAUM1Wva7ORGo0o5aw-A9V4DuxNAYe1Wc4M"
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
    legalStatus: "Título de Dominio 100% Saneado · Un solo dueño",
    description: "Espectacular propiedad campestre en el sector más cotizado de Puembo. Amplio lote ajardinado de 1.800 m², pabellón social exterior con chimenea a gas, sistema fotovoltaico con paneles solares, planta eléctrica total y seguridad privada de alto rango.",
    agent: {
      name: "Ing. Mateo Serrano",
      role: "Especialista Patrimonial en Valles",
      license: "Lic. Registro Notarial #0492",
      phone: "+593998765432",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "14 min",
      usfq: "15 min",
      aeropuerto: "12 min (Acceso Expreso)",
      quitoCentro: "25 min"
    },
    coordinates: { x: 88, y: 48 }
  },
  {
    id: "VU-GON-012",
    title: "Penthouse Dúplex Guápulo Vista",
    sector: "González Suárez",
    microzone: "Av. González Suárez & Orellana",
    type: "Penthouse",
    price: 420000,
    areaBuild: 280,
    areaLot: 95, // terraza
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    hoaFee: 220,
    elevation: 2820,
    temperature: "18°C Skyline Andino",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XJSZR6Hj7I4UQtnOqPXg_Y007b3dYfyerxcDMkb75juLRWF7YmSmqtCKH4PIJiDZoQRw4_UFMMUWFdf6-6tKQ652VkIwYRkImmtzgqzdZiui_20ARLKPcwIlkl0dHAyc-95FrJW11u2ZZAD-PgGg0xeDrci0_v8mPYZFPS_503f_OgUD9Ckkee--xV2u-1s98jNLzebro17exL5SMVQaEMD_gIf0r6Z9cpbz3EhRH9XyF31H8eXxU8xy8",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1Ucv5kyNecGqU91SIuBpcTXjuBysR9oxNgCT8lckhLnHv4n38KNbEjDJK0mRDimRc_8Y3LmNh3-B95m9ihdW3-486EWteIHevkL1OvxK_IiP-KFpAOfoYAe9jtFV5fUR-rlaOOAYQit6UZ9h-zoW221KSBrk5_VjfhcHxlHrRmKWyNlUpN7SHUd8XrsGkld0A64-8GvBYrbsZCZftN8bTTFtn8wsTIHiuVuVeBOazTbPGJEH_QsmInGiHM"
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
    legalStatus: "Propiedad Horizontal Inscrita · Sin Gravamen",
    description: "Penthouse con imponente terraza y fogata exterior mirando hacia la cúpula de Guápulo y los volcanes orientales. Edificio con generador eléctrico al 100%, ascensor directo a piso privado y acabados italianos de lujo.",
    agent: {
      name: "Dra. Sofía Alarcón",
      role: "Especialista en Penthouses & Skyline",
      license: "Lic. Registro Notarial #0588",
      phone: "+593998765433",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "12 min (Túnel)",
      usfq: "14 min",
      aeropuerto: "35 min",
      quitoCentro: "5 min a La Carolina"
    },
    coordinates: { x: 38, y: 52 }
  },
  {
    id: "VU-CAR-005",
    title: "Sky Suite Inversión La Carolina",
    sector: "La Carolina",
    microzone: "Av. República de El Salvador & Moscú",
    type: "Suite",
    price: 165000,
    areaBuild: 70,
    areaLot: 70,
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 1,
    hoaFee: 110,
    elevation: 2810,
    temperature: "17°C Urbano Corporativo",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XJSZR6Hj7I4UQtnOqPXg_Y007b3dYfyerxcDMkb75juLRWF7YmSmqtCKH4PIJiDZoQRw4_UFMMUWFdf6-6tKQ652VkIwYRkImmtzgqzdZiui_20ARLKPcwIlkl0dHAyc-95FrJW11u2ZZAD-PgGg0xeDrci0_v8mPYZFPS_503f_OgUD9Ckkee--xV2u-1s98jNLzebro17exL5SMVQaEMD_gIf0r6Z9cpbz3EhRH9XyF31H8eXxU8xy8",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1VUGTnRAXGvN6VxUOeWhQWRcyUU7iTaqs706LIzVCv1RdJVtzVcXJyMkDiHSgq7-l2L0tPfqKItldfLQhobGJeQqq87rDowTrVBpxumgy71Kl9H7RCAD8PV8KYUaFRKDUzv3IAvwm2g9DAoZYCuv8LEUoXqajD7ZjeFA3UikuSXx-nQKx-MVNndRt7R0SkQWz48egYhVYZqYro8oG030GxdEkYSPt-vHCbetSx3Vv_G90V9TwEktpy7wA"
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
    legalStatus: "Certificado de Gravámenes Libre · Apto Crédito VIP",
    description: "Suite ejecutiva de alta demanda a 2 minutos a pie de la Estación del Metro La Carolina. Edificio de autor con generador total que cubre departamentos, piscina temperada en terraza, coworking y permiso legal para renta corta Airbnb con Cap Rate del 11.4%.",
    agent: {
      name: "Dra. Sofía Alarcón",
      role: "Especialista en Penthouses & Inversión",
      license: "Lic. Registro Notarial #0588",
      phone: "+593998765433",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "18 min",
      usfq: "20 min",
      aeropuerto: "40 min",
      quitoCentro: "0 min (Corazón Financiero)"
    },
    coordinates: { x: 30, y: 38 }
  },
  {
    id: "VU-TUM-031",
    title: "Casa Campestre El Chaquiñán",
    sector: "Tumbaco",
    microzone: "Sector La Viña · Vía Chaquiñán",
    type: "Casa",
    price: 345000,
    areaBuild: 230,
    areaLot: 350,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 2,
    hoaFee: 135,
    elevation: 2240,
    temperature: "22°C Templado",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1Wmx3lqvuUAliea9ZgBk3sjOq9y62rkVbfwmE7DzPo2ts3iCN_iScEGTuaYfaO7mV6zVDMoXVDrJ6Cyh6PmYaiPThN93ml5U18p5hpiqhRYULpdqlyr_EvsVnE-NUAWFxGmq_k820umpK0OK9rb_Eqwk9ST-wknO9AjOaG0kJ-oz0_IdZKoqGff2Gb9EX7JBRBfcj1zsKHpAr2AWzVXvShltAUM1Wva7ORGo0o5aw-A9V4DuxNAYe1Wc4M",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1Vs9dqJa4JnTuEUTpWtR3l8VgOLMkoWGlivico_YTY356WtOk-lnpAk8tJZp1R9gnW-tGpPnLGftZN0Q3epgYdjBinJSgTArHmVnhXKpW2CJJQEsiu4x5EUTtxeDE2814vDxxfVjvRC6NtecbA0bKtO2ep7hO7i1QjgkOr61ZGUG0bZLD7Fs0E0H95RMJ8M2bXqhTwhAUllBHZkBA6pF2cDXqEuT0AwikAHWRNbeF-pGi6SId7W_NBQlA"
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
    legalStatus: "Certificado de Gravámenes Limpio DMQ",
    description: "Casa contemporánea dentro de conjunto cerrado con jardines privados y acceso directo a la ruta ecológica del Chaquiñán. Generador de respaldo para servicios básicos, área de pérgola y barbacoa, y excelente clima de valle.",
    agent: {
      name: "Ing. Mateo Serrano",
      role: "Especialista Patrimonial en Valles",
      license: "Lic. Registro Notarial #0492",
      phone: "+593998765432",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "8 min",
      usfq: "10 min",
      aeropuerto: "20 min",
      quitoCentro: "22 min"
    },
    coordinates: { x: 80, y: 65 }
  },
  {
    id: "VU-NAY-017",
    title: "Residencia Mirador de Nayón",
    sector: "Nayón",
    microzone: "Loma de Nayón · Mirador Cumbayá",
    type: "Casa",
    price: 495000,
    areaBuild: 300,
    areaLot: 600,
    bedrooms: 3,
    bathrooms: 4,
    parking: 3,
    hoaFee: 160,
    elevation: 2400,
    temperature: "21°C Microclima",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1Vs9dqJa4JnTuEUTpWtR3l8VgOLMkoWGlivico_YTY356WtOk-lnpAk8tJZp1R9gnW-tGpPnLGftZN0Q3epgYdjBinJSgTArHmVnhXKpW2CJJQEsiu4x5EUTtxeDE2814vDxxfVjvRC6NtecbA0bKtO2ep7hO7i1QjgkOr61ZGUG0bZLD7Fs0E0H95RMJ8M2bXqhTwhAUllBHZkBA6pF2cDXqEuT0AwikAHWRNbeF-pGi6SId7W_NBQlA",
    subPhotos: [
      "https://lh3.googleusercontent.com/aida/AEtjO1Wmx3lqvuUAliea9ZgBk3sjOq9y62rkVbfwmE7DzPo2ts3iCN_iScEGTuaYfaO7mV6zVDMoXVDrJ6Cyh6PmYaiPThN93ml5U18p5hpiqhRYULpdqlyr_EvsVnE-NUAWFxGmq_k820umpK0OK9rb_Eqwk9ST-wknO9AjOaG0kJ-oz0_IdZKoqGff2Gb9EX7JBRBfcj1zsKHpAr2AWzVXvShltAUM1Wva7ORGo0o5aw-A9V4DuxNAYe1Wc4M"
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
    legalStatus: "Título Saneado en Notaría DMQ",
    description: "Ubicación bisagra privilegiada entre Quito y Cumbayá (a 5 minutos de ambos mundos). Vista abierta 180° hacia el valle, jardín escalonado, paneles solares y generador a diésel 100% de transferencia inmediata.",
    agent: {
      name: "Ing. Mateo Serrano",
      role: "Especialista Patrimonial en Valles",
      license: "Lic. Registro Notarial #0492",
      phone: "+593998765432",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs"
    },
    logistics: {
      scalaShopping: "5 min",
      usfq: "6 min",
      aeropuerto: "22 min",
      quitoCentro: "8 min (Túnel Guayasamín)"
    },
    coordinates: { x: 55, y: 46 }
  }
];

// App State
const state = {
  activeView: "catalog", // "catalog" | "split" | "detail"
  selectedProperty: PROPERTIES_DATA[0],
  filters: {
    sector: "ALL",
    type: "ALL",
    maxPrice: 1000000,
    hasGenerator: false,
    hasMetro: false,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: false,
    isAirbnb: false
  },
  calculator: {
    propertyPrice: 580000,
    downPaymentPct: 20,
    termYears: 20,
    loanType: "BIESS", // "BIESS" | "PRIVATE" | "CASH"
    rates: {
      BIESS: 0.0599,
      PRIVATE: 0.0845,
      CASH: 0.0
    }
  },
  mobileSimulated: false
};

// Utilities
function formatUSD(num) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

// Filter evaluation
function getFilteredProperties() {
  return PROPERTIES_DATA.filter(p => {
    if (state.filters.sector !== "ALL" && p.sector !== state.filters.sector) return false;
    if (state.filters.type !== "ALL" && p.type !== state.filters.type) return false;
    if (p.price > state.filters.maxPrice) return false;
    if (state.filters.hasGenerator && !p.features.hasGenerator) return false;
    if (state.filters.hasMetro && !p.features.hasMetro) return false;
    if (state.filters.hasDoubleGate && !p.features.hasDoubleGate) return false;
    if (state.filters.isValleyClimate && !p.features.isValleyClimate) return false;
    if (state.filters.biessEligible && !p.features.biessEligible) return false;
    if (state.filters.isAirbnb && !p.features.isAirbnb) return false;
    return true;
  });
}

// Render Properties Grid
function renderPropertiesList() {
  const container = document.getElementById("propertiesGridContainer");
  const filtered = getFilteredProperties();
  const countBadge = document.getElementById("resultsCountBadge");
  if (countBadge) {
    countBadge.innerText = `${filtered.length} Propiedades Verificadas en Quito & Valles`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border: 1px dashed var(--border-medium); border-radius: 4px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No se encontraron propiedades con estos filtros</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Prueba desactivando algunos filtros de alta especificidad (como Metro o Doble Garita).</p>
        <button class="btn-search-primary" onclick="resetFilters()">Restablecer Filtros</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const pricePerSqm = Math.round(p.price / p.areaBuild);
    return `
      <article class="property-card" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="media-badges">
            <span class="badge-tag badge-verified">✓ Registro DMQ Auditado</span>
            ${p.features.hasGenerator ? '<span class="badge-tag badge-generator">⚡ Generador 100%</span>' : ''}
            ${p.features.hasMetro ? '<span class="badge-tag badge-metro">🚇 Metro < 2 min</span>' : ''}
            ${p.features.hasMatterport ? '<span class="badge-tag badge-tour">Tour 3D Matterport</span>' : ''}
          </div>
          <button class="media-favorite" title="Guardar propiedad" onclick="toggleFavorite('${p.id}', event)">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <div class="media-climate">${p.temperature}</div>
        </div>

        <div class="card-body">
          <div class="card-sector">${p.sector} · ${p.microzone}</div>
          <h3 class="card-title" onclick="openPropertyDetail('${p.id}')">${p.title}</h3>
          
          <div class="card-pricing">
            <div class="price-main">${formatUSD(p.price)}</div>
            <div class="price-sqm">${formatUSD(pricePerSqm)} / m² constr.</div>
          </div>

          <div class="card-specs">
            <div class="spec-item">
              <div class="spec-val">${p.bedrooms}</div>
              <div class="spec-lbl">Suites</div>
            </div>
            <div class="spec-item">
              <div class="spec-val">${p.bathrooms}</div>
              <div class="spec-lbl">Baños</div>
            </div>
            <div class="spec-item">
              <div class="spec-val">${p.areaBuild}</div>
              <div class="spec-lbl">m² Constr.</div>
            </div>
            <div class="spec-item">
              <div class="spec-val">${p.areaLot}</div>
              <div class="spec-lbl">m² Lote</div>
            </div>
          </div>

          <div class="card-trust-meta">
            <div class="meta-row">
              <span class="meta-icon">🛡️</span>
              <span>Alícuota: <strong>$${p.hoaFee}/mes</strong> (guardianía y áreas)</span>
            </div>
            <div class="meta-row">
              <span class="meta-icon">📜</span>
              <span>${p.legalStatus}</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn-card-detail" onclick="openPropertyDetail('${p.id}')">Ver Ficha & Gastos Notariales</button>
            <button class="btn-card-whatsapp" onclick="openWhatsAppModal('${p.id}')" title="Contactar por WhatsApp">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Render Interactive Vector Map
function renderInteractiveMap() {
  const container = document.getElementById("mapCanvasContainer");
  if (!container) return;
  const filtered = getFilteredProperties();

  // Draw custom high-contrast Andean topography vector
  container.innerHTML = `
    <svg class="map-svg-container" viewBox="0 0 100 100" preserveAspectRatio="none">
      <!-- Background contour gradients -->
      <defs>
        <linearGradient id="valleyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14181F" />
          <stop offset="100%" stop-color="#1B222C" />
        </linearGradient>
      </defs>

      <!-- Andean Mountain ridges and plateau -->
      <path d="M 0,0 L 45,0 L 48,30 L 40,65 L 35,100 L 0,100 Z" fill="#14181E" opacity="0.9" />
      <path d="M 45,0 L 100,0 L 100,100 L 35,100 L 40,65 L 48,30 Z" fill="#1B222C" />

      <!-- Guápulo Canyon descent divider -->
      <path d="M 45,0 Q 48,35 40,65 T 35,100" fill="none" stroke="#C2A268" stroke-width="0.3" stroke-dasharray="1,1" opacity="0.4" />

      <!-- Ruta Viva highway corridor -->
      <path d="M 43,45 Q 60,48 75,55 T 90,48" fill="none" stroke="#C2A268" stroke-width="0.8" opacity="0.6" />
      
      <!-- Metro de Quito line (Western Plateau) -->
      <path d="M 28,15 L 30,35 L 33,55 L 26,85" fill="none" stroke="#C026D3" stroke-width="0.6" stroke-dasharray="1.5,1" opacity="0.7" />

      <!-- Topographic Labels -->
      <text x="14" y="22" fill="#757B85" font-size="2.6" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.2">HIPERCENTRO QUITO (2,810m)</text>
      <text x="60" y="32" fill="#C2A268" font-size="2.6" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.2">VALLE DE CUMBAYÁ (2,200m · 22°C)</text>
      <text x="70" y="78" fill="#757B85" font-size="2.4" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500">TUMBACO & CHAQUIÑÁN</text>
      <text x="76" y="42" fill="#A88749" font-size="2.2" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500">PUEMBO & AEROPUERTO UIO</text>
    </svg>

    <!-- Interactive HTML Pin Overlays on top of SVG -->
    <div style="position: absolute; inset: 0; pointer-events: auto;">
      ${filtered.map(p => `
        <div class="map-pin" style="position: absolute; left: ${p.coordinates.x}%; top: ${p.coordinates.y}%; transform: translate(-50%, -100%);" onclick="openPropertyDetail('${p.id}')">
          <div class="map-pin-badge">
            ${p.features.hasGenerator ? '⚡ ' : ''}$${Math.round(p.price / 1000)}k
          </div>
          <div style="width: 2px; height: 8px; background: var(--accent-gold); margin: 0 auto;"></div>
        </div>
      `).join("")}
    </div>
  `;
}

// Open Property Detail View
function openPropertyDetail(propertyId) {
  const property = PROPERTIES_DATA.find(p => p.id === propertyId);
  if (!property) return;
  state.selectedProperty = property;
  state.calculator.propertyPrice = property.price;

  // Switch view
  setView("detail");
  renderDetailView(property);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Property Detail View
function renderDetailView(p) {
  const container = document.getElementById("propertyDetailContent");
  if (!container) return;

  const pricePerSqm = Math.round(p.price / p.areaBuild);

  container.innerHTML = `
    <div class="detail-breadcrumb">
      <a onclick="setView('catalog')">← Volver al Catálogo</a>
      <span>/</span>
      <span>${p.sector}</span>
      <span>/</span>
      <span>${p.microzone}</span>
      <span>/</span>
      <span>Ref: ${p.id}</span>
    </div>

    <!-- Architectural Hero Gallery -->
    <div class="detail-hero-grid">
      <div class="hero-main-photo">
        <img src="${p.image}" alt="${p.title}" />
        <div class="media-badges">
          <span class="badge-tag badge-verified">✓ Certificado Registro Propiedad DMQ</span>
          ${p.features.hasGenerator ? '<span class="badge-tag badge-generator">⚡ Generador Eléctrico 100%</span>' : ''}
          ${p.features.hasMetro ? '<span class="badge-tag badge-metro">🚇 Conexión Metro Quito</span>' : ''}
        </div>
      </div>
      <div class="hero-sub-photos">
        <div class="hero-sub-photo">
          <img src="${p.subPhotos[0] || p.image}" alt="Interior arquitectónico" />
        </div>
        <div class="hero-sub-photo">
          <img src="${p.subPhotos[1] || p.image}" alt="Detalle master suite" />
        </div>
      </div>
    </div>

    <!-- Header & Pricing -->
    <div class="section-pretitle">${p.sector} • ${p.microzone}</div>
    <h1 style="font-family: var(--font-serif); font-size: 2.4rem; margin-bottom: 0.5rem; line-height: 1.2;">${p.title}</h1>
    <div style="display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 1.5rem;">
      <span style="font-size: 2.2rem; font-weight: 700;">${formatUSD(p.price)}</span>
      <span style="font-size: 1rem; color: var(--text-muted);">${formatUSD(pricePerSqm)} / m² construcción</span>
      <span style="font-size: 0.85rem; color: var(--color-success); font-weight: 600;">Alícuota: $${p.hoaFee}/mes (verificada)</span>
    </div>

    <div class="detail-content-columns">
      <!-- Left Column: Specs, Due Diligence, Calculator -->
      <div>
        <!-- Key Specifications Strip -->
        <div class="card-specs" style="padding: 1.25rem 1rem; margin-bottom: 2rem;">
          <div class="spec-item"><div class="spec-val" style="font-size: 1.2rem;">${p.bedrooms}</div><div class="spec-lbl">Suites</div></div>
          <div class="spec-item"><div class="spec-val" style="font-size: 1.2rem;">${p.bathrooms}</div><div class="spec-lbl">Baños</div></div>
          <div class="spec-item"><div class="spec-val" style="font-size: 1.2rem;">${p.areaBuild} m²</div><div class="spec-lbl">Construcción</div></div>
          <div class="spec-item"><div class="spec-val" style="font-size: 1.2rem;">${p.areaLot} m²</div><div class="spec-lbl">Terreno</div></div>
          <div class="spec-item"><div class="spec-val" style="font-size: 1.2rem;">${p.parking}</div><div class="spec-lbl">Parqueaderos</div></div>
        </div>

        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 2rem;">
          ${p.description}
        </p>

        <!-- Due Diligence PropTech Box (The Quito Standard) -->
        <div class="due-diligence-box">
          <h3 class="due-diligence-title">
            <span>🛡️</span> Due Diligence Notarial & Equipamiento Quito
          </h3>
          <div class="due-diligence-grid">
            <div class="due-item">
              <span class="due-icon">⚡</span>
              <div>
                <div class="due-item-title">Respaldo Eléctrico 100%</div>
                <div class="due-item-desc">Planta eléctrica alemana con transferencia automática para bombas, climatización y departamentos.</div>
              </div>
            </div>
            <div class="due-item">
              <span class="due-icon">📜</span>
              <div>
                <div class="due-item-title">Certificado de Gravámenes DMQ</div>
                <div class="due-item-desc">Auditoría notarial al día. Sin hipotecas, embargos ni litigios hereditarios. Listo para escrituración.</div>
              </div>
            </div>
            <div class="due-item">
              <span class="due-icon">☀️</span>
              <div>
                <div class="due-item-title">Microclima & Altitud</div>
                <div class="due-item-desc">${p.temperature} a ${p.elevation} msnm. Ventilación pasiva y aire puro de valle andino.</div>
              </div>
            </div>
            <div class="due-item">
              <span class="due-icon">🔒</span>
              <div>
                <div class="due-item-title">Seguridad Multicapa</div>
                <div class="due-item-desc">Acceso con doble filtro, guardianía privada 24/7 y cámaras térmicas perimetrales.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Mortgage & Closing Costs Calculator -->
        <div class="calculator-card">
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 0.5rem;">Simulador Hipotecario & Gastos de Cierre Notarial (DMQ)</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Transparencia radical: conoce tu cuota mensual estimada y todos los aranceles notariales de Quito.</p>

          <div class="calc-tabs">
            <button class="calc-tab ${state.calculator.loanType === 'BIESS' ? 'active' : ''}" onclick="setLoanType('BIESS')">Crédito BIESS (5.99%)</button>
            <button class="calc-tab ${state.calculator.loanType === 'PRIVATE' ? 'active' : ''}" onclick="setLoanType('PRIVATE')">Banca Privada (8.45%)</button>
            <button class="calc-tab ${state.calculator.loanType === 'CASH' ? 'active' : ''}" onclick="setLoanType('CASH')">Fondos Propios (Contado)</button>
          </div>

          <div class="slider-group">
            <div class="slider-header">
              <span>Entrada / Cuota Inicial (${state.calculator.downPaymentPct}%)</span>
              <span id="downPaymentValueText">${formatUSD(p.price * (state.calculator.downPaymentPct / 100))}</span>
            </div>
            <input type="range" class="calc-slider" min="10" max="50" step="5" value="${state.calculator.downPaymentPct}" oninput="updateDownPayment(this.value)" />
          </div>

          <div class="slider-group">
            <div class="slider-header">
              <span>Plazo de Financiamiento</span>
              <span id="termValueText">${state.calculator.termYears} años</span>
            </div>
            <input type="range" class="calc-slider" min="5" max="25" step="5" value="${state.calculator.termYears}" oninput="updateTermYears(this.value)" />
          </div>

          <div class="calc-result-box">
            <div class="calc-result-lbl">Cuota Mensual Estimada</div>
            <div class="calc-result-val" id="monthlyPaymentDisplay">$0</div>
            <div style="font-size: 0.75rem; color: #D2C0A5;" id="loanAmountText">Monto a Financiar: $0</div>
          </div>

          <!-- Closing Costs DMQ Table -->
          <div style="margin-top: 1.5rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-primary); margin-bottom: 0.5rem;">Desglose Oficial de Gastos Notariales y Registro DMQ</div>
            <table class="closing-costs-table">
              <tbody>
                <tr>
                  <td>Tasa Notarial de Escrituración (Arancel Notarial)</td>
                  <td id="feeNotaryText">$650</td>
                </tr>
                <tr>
                  <td>Arancel Registro de la Propiedad del DMQ</td>
                  <td id="feeRegistryText">$420</td>
                </tr>
                <tr>
                  <td>Impuesto de Alcabala Municipal (1% del valor)</td>
                  <td id="feeAlcabalaText">${formatUSD(p.price * 0.01)}</td>
                </tr>
                <tr>
                  <td>Tasa del Consejo Provincial de Pichincha (0.11%)</td>
                  <td id="feeProvincialText">${formatUSD(p.price * 0.0011)}</td>
                </tr>
                <tr class="total-row">
                  <td>Total Estimado de Gastos de Cierre</td>
                  <td id="feeTotalClosingText">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Neighborhood Logistics Intelligence -->
        <div style="margin-top: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 1rem;">Conectividad & Tiempos de Traslado</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: var(--bg-surface-subtle); padding: 1rem; border-radius: 3px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Centros Comerciales & Salud</div>
              <div style="font-size: 1.1rem; font-weight: 700; margin: 0.25rem 0;">${p.logistics.scalaShopping} al Scala Mall</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Y Hospital de los Valles</div>
            </div>
            <div style="background: var(--bg-surface-subtle); padding: 1rem; border-radius: 3px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Aeropuerto Mariscal Sucre</div>
              <div style="font-size: 1.1rem; font-weight: 700; margin: 0.25rem 0;">${p.logistics.aeropuerto}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Por Ruta Viva sin semáforos</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Dedicated Agent Card & Scheduling -->
      <div>
        <div class="agent-vip-card">
          <div class="agent-profile">
            <img class="agent-avatar" src="${p.agent.avatar}" alt="${p.agent.name}" />
            <div>
              <div class="agent-name">${p.agent.name}</div>
              <div class="agent-role">${p.agent.role}</div>
              <div class="agent-license">${p.agent.license}</div>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.5rem;">
            Agente exclusivo con mandato directo verificado. Asesoría integral en promesa de compraventa notariada y gestión bancaria directa.
          </div>

          <button class="btn-book-visit" onclick="openScheduleModal('${p.id}')">Agendar Visita Privada Notariada</button>
          <button class="btn-whatsapp-agent" onclick="openWhatsAppModal('${p.id}')">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>WhatsApp Directo con ${p.agent.name.split(' ')[1]}</span>
          </button>

          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); font-size: 0.72rem; color: var(--text-muted); text-align: center;">
            🔒 Tiempo de respuesta promedio: <strong>< 15 minutos</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  recalculateMortgage();
}

// Calculate Mortgage & Closing Costs
function recalculateMortgage() {
  const p = state.selectedProperty;
  if (!p) return;

  const price = p.price;
  const downPayment = price * (state.calculator.downPaymentPct / 100);
  const loanAmount = price - downPayment;
  const rate = state.calculator.rates[state.calculator.loanType];
  const months = state.calculator.termYears * 12;

  let monthlyPayment = 0;
  if (state.calculator.loanType === 'CASH') {
    monthlyPayment = 0;
  } else if (rate > 0 && months > 0) {
    const monthlyRate = rate / 12;
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  // Update UI Elements
  const paymentEl = document.getElementById("monthlyPaymentDisplay");
  if (paymentEl) {
    paymentEl.innerText = state.calculator.loanType === 'CASH' ? 'Pago Contado (0 cuotas)' : `${formatUSD(Math.round(monthlyPayment))} / mes`;
  }

  const loanAmountEl = document.getElementById("loanAmountText");
  if (loanAmountEl) {
    loanAmountEl.innerText = state.calculator.loanType === 'CASH' ? 'Transacción 100% fondos propios' : `Monto a Financiar: ${formatUSD(loanAmount)}`;
  }

  const downTextEl = document.getElementById("downPaymentValueText");
  if (downTextEl) downTextEl.innerText = formatUSD(downPayment);

  // Closing costs
  const notaryFee = 650;
  const registryFee = 420;
  const alcabalaFee = price * 0.01;
  const provincialFee = price * 0.0011;
  const totalClosing = notaryFee + registryFee + alcabalaFee + provincialFee;

  const totalClosingEl = document.getElementById("feeTotalClosingText");
  if (totalClosingEl) totalClosingEl.innerText = formatUSD(Math.round(totalClosing));
}

function updateDownPayment(val) {
  state.calculator.downPaymentPct = parseInt(val, 10);
  recalculateMortgage();
}

function updateTermYears(val) {
  state.calculator.termYears = parseInt(val, 10);
  const termEl = document.getElementById("termValueText");
  if (termEl) termEl.innerText = `${val} años`;
  recalculateMortgage();
}

function setLoanType(type) {
  state.calculator.loanType = type;
  document.querySelectorAll(".calc-tab").forEach(tab => {
    tab.classList.toggle("active", tab.innerText.includes(type === "BIESS" ? "BIESS" : type === "PRIVATE" ? "Privada" : "Contado"));
  });
  recalculateMortgage();
}

// View switcher
function setView(viewName) {
  state.activeView = viewName;

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
  });

  const catalogView = document.getElementById("viewCatalog");
  const splitView = document.getElementById("viewSplitMap");
  const detailView = document.getElementById("viewDetail");

  if (catalogView) catalogView.style.display = viewName === "catalog" ? "block" : "none";
  if (splitView) splitView.style.display = viewName === "split" ? "block" : "none";
  if (detailView) detailView.style.display = viewName === "detail" ? "block" : "none";

  if (viewName === "split") {
    renderInteractiveMap();
    renderPropertiesList();
  }
}

// Filter triggers
function toggleChip(chipName) {
  state.filters[chipName] = !state.filters[chipName];
  const chipEl = document.querySelector(`[data-chip="${chipName}"]`);
  if (chipEl) {
    chipEl.classList.toggle("active", state.filters[chipName]);
  }
  renderPropertiesList();
  if (state.activeView === "split") renderInteractiveMap();
}

function applySectorFilter(sector) {
  state.filters.sector = sector;
  renderPropertiesList();
  if (state.activeView === "split") renderInteractiveMap();
}

function applyTypeFilter(type) {
  state.filters.type = type;
  renderPropertiesList();
  if (state.activeView === "split") renderInteractiveMap();
}

function resetFilters() {
  state.filters = {
    sector: "ALL",
    type: "ALL",
    maxPrice: 1000000,
    hasGenerator: false,
    hasMetro: false,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: false,
    isAirbnb: false
  };

  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  const sectorSelect = document.getElementById("sectorSelect");
  if (sectorSelect) sectorSelect.value = "ALL";
  const typeSelect = document.getElementById("typeSelect");
  if (typeSelect) typeSelect.value = "ALL";

  renderPropertiesList();
  if (state.activeView === "split") renderInteractiveMap();
}

// WhatsApp Modal & Click-to-chat
function openWhatsAppModal(propertyId) {
  const p = propertyId ? PROPERTIES_DATA.find(x => x.id === propertyId) : state.selectedProperty;
  const modal = document.getElementById("whatsappModal");
  if (!modal) return;

  const agent = p ? p.agent : { name: "Concierge VIP", phone: "+593998765432" };
  const propertyTitle = p ? `${p.title} (${p.sector}) - ${formatUSD(p.price)} [Ref: ${p.id}]` : "Consultoría Inmobiliaria General";

  const message = `Hola ${agent.name}, le escribo a través de VALLE & URBE. Deseo recibir el dossier notarial y coordinar una visita para: ${propertyTitle}.`;

  const phoneDisplay = document.getElementById("waAgentPhone");
  if (phoneDisplay) phoneDisplay.innerText = agent.phone;

  const msgDisplay = document.getElementById("waMessagePreview");
  if (msgDisplay) msgDisplay.innerText = `"${message}"`;

  const waLink = document.getElementById("waDirectBtn");
  if (waLink) {
    waLink.href = `https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  }

  modal.classList.add("open");
}

function closeWhatsAppModal() {
  const modal = document.getElementById("whatsappModal");
  if (modal) modal.classList.remove("open");
}

// Schedule Visit Modal
function openScheduleModal(propertyId) {
  const modal = document.getElementById("scheduleModal");
  if (!modal) return;
  modal.classList.add("open");
}

function closeScheduleModal() {
  const modal = document.getElementById("scheduleModal");
  if (modal) modal.classList.remove("open");
}

function confirmSchedule(event) {
  event.preventDefault();
  alert("¡Visita agendada con éxito! El Asesor Patrimonial y Notarial se contactará en menos de 15 minutos vía WhatsApp para confirmar el pase de acceso y garita.");
  closeScheduleModal();
}

// Mobile Simulator Toggle
function toggleMobileSimulation() {
  state.mobileSimulated = !state.mobileSimulated;
  document.body.classList.toggle("mobile-simulation-active", state.mobileSimulated);
  const btn = document.getElementById("btnToggleMobile");
  if (btn) {
    btn.classList.toggle("active", state.mobileSimulated);
    btn.innerText = state.mobileSimulated ? "Volver a Vista Escritorio" : "📱 Probar Vista Móvil (390px)";
  }
}

// Favorites toggle
function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  alert(`Propiedad ${id} guardada en tu colección privada de favoritos.`);
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  renderPropertiesList();
  renderInteractiveMap();
});
