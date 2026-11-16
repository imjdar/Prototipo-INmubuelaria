export interface AgentProfile {
  id: string;
  name: string;
  role: 'AGENT' | 'COMPANY' | 'DEVELOPER';
  company: string;
  specialtySector: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  activeListingsCount: number;
  licenseNumber: string;
  isVerified: boolean;
  yearsExperience: number;
  description: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  tradeName: string;
  ruc: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  agentsCount: number;
  activeProjectsCount: number;
  rating: number;
  description: string;
}

export const COMPANIES_DATA: CompanyProfile[] = [
  {
    id: 'comp-001',
    name: 'Valle & Urbe PropTech S.A.S.',
    tradeName: 'Valle & Urbe Patrimonial',
    ruc: '1792948214001',
    phone: '+593 2 399 9000',
    email: 'contacto@valleyurbe.ec',
    address: 'Av. Interoceánica km 11.5, Edificio Scala Pro, Cumbayá',
    logoUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=256&q=80',
    agentsCount: 18,
    activeProjectsCount: 6,
    rating: 4.9,
    description: 'Firma inmobiliaria especializada en fincas campestres, villas de diseño contemporáneo y terrenos en urbanizaciones con doble garita en Cumbayá y Puembo.'
  },
  {
    id: 'comp-002',
    name: 'Metropolitan Real Estate Developers Cía. Ltda.',
    tradeName: 'Premier Metropolitan Real Estate',
    ruc: '1791834928001',
    phone: '+593 2 245 7800',
    email: 'ventas@premiermetropolitan.ec',
    address: 'Av. González Suárez N31-102 y Coruña, Quito Hipercentro',
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&q=80',
    agentsCount: 24,
    activeProjectsCount: 9,
    rating: 4.8,
    description: 'Líderes en suites de alta rentabilidad Airbnb frente al Metro de Quito y penthouses con vista panorámica a la ciudad y cordillera andina.'
  },
  {
    id: 'comp-003',
    name: 'Andes Constructores & Diseños Arquitectónicos S.A.',
    tradeName: 'Constructora Premier & Asociados',
    ruc: '1790483921001',
    phone: '+593 99 777 8899',
    email: 'info@constructorapremier.ec',
    address: 'Av. República del Salvador y Shyris, Edificio Bristol Park, La Carolina',
    logoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=256&q=80',
    agentsCount: 35,
    activeProjectsCount: 12,
    rating: 5.0,
    description: 'Constructora galardonada con certificación Leed Gold y proyectos de arquitectura vertical en Cumbayá, Nayón y Parque La Carolina.'
  },
  {
    id: 'comp-004',
    name: 'Uribe Schwarzkopf Arquitectura & Ciudad S.A.',
    tradeName: 'Uribe Schwarzkopf',
    ruc: '1790012384001',
    phone: '+593 2 398 9000',
    email: 'info@us.ec',
    address: 'Av. Eloy Alfaro y Mariana de Jesús, Edificio Gaia, Quito',
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&q=80',
    agentsCount: 50,
    activeProjectsCount: 16,
    rating: 4.9,
    description: 'Referente de arquitectura internacional en Quito con obras firmadas por BIG, Jean Nouvel, Moshe Safdie y Arquitectonica.'
  },
  {
    id: 'comp-005',
    name: 'Álvarez Bravo Constructores Cía. Ltda.',
    tradeName: 'Álvarez Bravo Constructora',
    ruc: '1791234567001',
    phone: '+593 2 292 3400',
    email: 'ventas@alvarezbravo.com',
    address: 'Av. Portugal y Catalina Aldaz, Edificio Qorner, La Carolina',
    logoUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=256&q=80',
    agentsCount: 28,
    activeProjectsCount: 8,
    rating: 4.8,
    description: 'Desarrollos residenciales de vanguardia con terrazas ajardinadas, acabados europeos y sostenibilidad hídrica en Quito y Cumbayá.'
  },
  {
    id: 'comp-006',
    name: 'Puembo Country Club Realty & Fincas S.A.',
    tradeName: 'Puembo Country Realty',
    ruc: '1792847291001',
    phone: '+593 99 912 3456',
    email: 'contacto@puembocountry.ec',
    address: 'Vía a Los Arrayanes km 3, Urbanización Country Club, Puembo',
    logoUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=256&q=80',
    agentsCount: 12,
    activeProjectsCount: 4,
    rating: 5.0,
    description: 'Boutique inmobiliaria exclusiva para quintas, fincas ecuestres y villas alrededor del campo de golf en Puembo.'
  }
];

export const AGENTS_DATA: AgentProfile[] = [
  {
    id: 'agent-001',
    name: 'Ing. Mateo Serrano',
    role: 'AGENT',
    company: 'Premier Luxury Cumbayá',
    specialtySector: 'Cumbayá y Puembo',
    phone: '+593 99 876 5432',
    email: 'mateo.serrano@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 38,
    activeListingsCount: 8,
    licenseNumber: 'Lic. Notarial #0492 DMQ',
    isVerified: true,
    yearsExperience: 9,
    description: 'Especialista en residencias campestres de lujo, quintas y terrenos con microclima en Cumbayá y Puembo.'
  },
  {
    id: 'agent-002',
    name: 'Arq. Gabriela Endara',
    role: 'AGENT',
    company: 'Premier Metropolitan Real Estate',
    specialtySector: 'González Suárez & La Carolina',
    phone: '+593 99 432 1098',
    email: 'gabriela.endara@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 44,
    activeListingsCount: 12,
    licenseNumber: 'Lic. Notarial #0811 DMQ',
    isVerified: true,
    yearsExperience: 11,
    description: 'Penthouses de diseño, suites de alta rentabilidad Airbnb frente al Metro de Quito y oficinas ejecutivas.'
  },
  {
    id: 'dev-001',
    name: 'Uribe Schwarzkopf & Premier Desarrollos',
    role: 'DEVELOPER',
    company: 'Constructora Premier & Asociados',
    specialtySector: 'Quito Urbano & Hipercentro',
    phone: '+593 2 398 9000',
    email: 'ventas@constructorapremier.ec',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewCount: 120,
    activeListingsCount: 24,
    licenseNumber: 'RUC 1792408912001',
    isVerified: true,
    yearsExperience: 25,
    description: 'Constructora líder en proyectos de arquitectura internacional con firmas como Bjarke Ingels y Jean Nouvel.'
  },
  {
    id: 'agent-003',
    name: 'Lic. Carlos Villacreses',
    role: 'AGENT',
    company: 'Valle Andino PropTech',
    specialtySector: 'Tumbaco & Nayón',
    phone: '+593 98 765 4321',
    email: 'carlos.villacreses@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 29,
    activeListingsCount: 6,
    licenseNumber: 'Lic. Notarial #0214 DMQ',
    isVerified: true,
    yearsExperience: 7,
    description: 'Asesoría especializada en casas dentro de urbanizaciones privadas con doble filtro de seguridad y vistas al Ilaló.'
  },
  {
    id: 'agent-004',
    name: 'Dra. Paulina Barahona',
    role: 'AGENT',
    company: 'Puembo Country Realty',
    specialtySector: 'Puembo & Arrayanes',
    phone: '+593 99 318 4590',
    email: 'paulina.barahona@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 31,
    activeListingsCount: 7,
    licenseNumber: 'Lic. ACBIR-Pichincha #0318',
    isVerified: true,
    yearsExperience: 12,
    description: 'Especialista en quintas campestres, propiedades con caballerizas y residencias alrededor del Club Los Arrayanes.'
  },
  {
    id: 'agent-005',
    name: 'Arq. Valeria Montalvo',
    role: 'AGENT',
    company: 'Cumbayá Elite Homes',
    specialtySector: 'Cumbayá San Juan Alto & Jacarandá',
    phone: '+593 99 542 8811',
    email: 'valeria.montalvo@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 42,
    activeListingsCount: 9,
    licenseNumber: 'Lic. ACBIR-Pichincha #0542',
    isVerified: true,
    yearsExperience: 10,
    description: 'Arquitecta consultora en residencias contemporáneas con piscinas temperadas y máxima eficiencia bioclimática en San Juan Alto.'
  },
  {
    id: 'agent-006',
    name: 'Ing. Diego Falconí',
    role: 'AGENT',
    company: 'Metropolitan Capital Partners',
    specialtySector: 'La Carolina & República del Salvador',
    phone: '+593 99 923 1478',
    email: 'diego.falconi@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewCount: 53,
    activeListingsCount: 14,
    licenseNumber: 'Lic. Notarial DMQ #0923',
    isVerified: true,
    yearsExperience: 8,
    description: 'Especialista en modelos de inversión inmobiliaria, rentabilidad Airbnb frente a paradas del Metro de Quito y Cap Rate superior al 9%.'
  },
  {
    id: 'agent-007',
    name: 'Abg. Roberto Noboa',
    role: 'AGENT',
    company: 'Noboa & Asociados Real Estate',
    specialtySector: 'González Suárez & Bellavista',
    phone: '+593 98 155 9900',
    email: 'roberto.noboa@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 36,
    activeListingsCount: 6,
    licenseNumber: 'Lic. Registro Notarial DMQ #0155',
    isVerified: true,
    yearsExperience: 15,
    description: 'Abogado inmobiliario y asesor patrimonial en penthouses clásicos y departamentos con vista panorámica a Guápulo.'
  },
  {
    id: 'agent-008',
    name: 'Lcda. Andrea Cevallos',
    role: 'AGENT',
    company: 'Nayón & Valles Properties',
    specialtySector: 'Nayón Tacuri & Cumbayá',
    phone: '+593 99 681 3322',
    email: 'andrea.cevallos@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 27,
    activeListingsCount: 5,
    licenseNumber: 'Lic. ACBIR-Pichincha #0681',
    isVerified: true,
    yearsExperience: 6,
    description: 'Enfoque en casas de arquitectura volada al risco en Nayón, aire puro, clima templado y conexión rápida al Túnel Guayasamín.'
  },
  {
    id: 'agent-009',
    name: 'Ing. Xavier Moncayo',
    role: 'AGENT',
    company: 'Tumbaco Living & Estates',
    specialtySector: 'Tumbaco Hilacril & Chaquiñán',
    phone: '+593 98 419 7744',
    email: 'xavier.moncayo@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 33,
    activeListingsCount: 8,
    licenseNumber: 'Lic. ACBIR-Pichincha #0419',
    isVerified: true,
    yearsExperience: 10,
    description: 'Experto en inmuebles familiares con amplios jardines y acceso directo al sendero ecológico El Chaquiñán.'
  },
  {
    id: 'agent-010',
    name: 'Arq. María José Terán',
    role: 'AGENT',
    company: 'Design & Heritage Inmobiliaria',
    specialtySector: 'Guápulo & La Floresta',
    phone: '+593 99 762 1199',
    email: 'mariajose.teran@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 22,
    activeListingsCount: 4,
    licenseNumber: 'Lic. Notarial DMQ #0762',
    isVerified: true,
    yearsExperience: 8,
    description: 'Arquitectura patrimonial, casas bohemias restauradas en Guápulo y lofts de diseño en el distrito creativo La Floresta.'
  },
  {
    id: 'agent-011',
    name: 'Lic. Fernando Echeverría',
    role: 'AGENT',
    company: 'Quito Norte & Tenis Club Realty',
    specialtySector: 'Quito Tenis & El Batán',
    phone: '+593 99 834 5566',
    email: 'fernando.echeverria@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewCount: 41,
    activeListingsCount: 7,
    licenseNumber: 'Lic. ACBIR-Pichincha #0834',
    isVerified: true,
    yearsExperience: 14,
    description: 'Especialista en el sector diplomático y residencial de Quito Tenis, condominios exclusivos y seguridad privada permanente.'
  },
  {
    id: 'agent-012',
    name: 'Econ. Daniela Viteri',
    role: 'AGENT',
    company: 'Inversiones Inmobiliarias Ecuador',
    specialtySector: 'La Pradera & Hipercentro Financiero',
    phone: '+593 99 299 6677',
    email: 'daniela.viteri@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 39,
    activeListingsCount: 11,
    licenseNumber: 'Lic. ACBIR-Pichincha #0299',
    isVerified: true,
    yearsExperience: 9,
    description: 'Consultoría financiera en departamentos para nómadas digitales, rentas corporativas y optimización de plusvalía.'
  },
  {
    id: 'agent-013',
    name: 'Ing. Juan Carlos Peñafiel',
    role: 'AGENT',
    company: 'Puembo Equestrian & Golf',
    specialtySector: 'Puembo La Palma & Mangahuantag',
    phone: '+593 98 588 3344',
    email: 'juancarlos.penafiel@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 19,
    activeListingsCount: 5,
    licenseNumber: 'Lic. Notarial DMQ #0588',
    isVerified: true,
    yearsExperience: 13,
    description: 'Venta de haciendas campestres, propiedades ecuestres y macro-lotes de alta plusvalía cerca de la Ruta Viva.'
  },
  {
    id: 'agent-014',
    name: 'Arq. Doménica Lasso',
    role: 'AGENT',
    company: 'Lasso & Co. Bienes Raíces',
    specialtySector: 'Monteserrín & Lomas de Monteserrín',
    phone: '+593 99 715 4488',
    email: 'domenica.lasso@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1580894732439-6502283cb0f7?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 26,
    activeListingsCount: 6,
    licenseNumber: 'Lic. ACBIR-Pichincha #0715',
    isVerified: true,
    yearsExperience: 7,
    description: 'Casas modernas con vista infinita al valle de Cumbayá y colegios internacionales como la Academia Cotopaxi.'
  },
  {
    id: 'agent-015',
    name: 'Lic. Mauricio Alarcón',
    role: 'AGENT',
    company: 'Valle de Los Chillos Real Estate',
    specialtySector: 'Los Chillos & San Rafael',
    phone: '+593 98 345 6677',
    email: 'mauricio.alarcon@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewCount: 30,
    activeListingsCount: 8,
    licenseNumber: 'Lic. ACBIR-Pichincha #0345',
    isVerified: true,
    yearsExperience: 11,
    description: 'Quintas de descanso y residencias en urbanizaciones con club de tenis y piscinas en San Rafael y Conocoto.'
  },
  {
    id: 'agent-016',
    name: 'Dra. Camila Guarderas',
    role: 'AGENT',
    company: 'Guarderas Luxury Assets',
    specialtySector: 'Cumbayá Pillagua & Lumbisí',
    phone: '+593 99 631 8899',
    email: 'camila.guarderas@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 34,
    activeListingsCount: 7,
    licenseNumber: 'Lic. Notarial DMQ #0631',
    isVerified: true,
    yearsExperience: 12,
    description: 'Mansiones contemporáneas y propiedades ultra-exclusivas con máxima privacidad y seguridad armada en Cumbayá.'
  },
  {
    id: 'agent-017',
    name: 'Ing. Esteban Jaramillo',
    role: 'AGENT',
    company: 'Andean Panorama Penthouses',
    specialtySector: 'González Suárez & Miravalle',
    phone: '+593 98 477 1234',
    email: 'esteban.jaramillo@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 28,
    activeListingsCount: 6,
    licenseNumber: 'Lic. ACBIR-Pichincha #0477',
    isVerified: true,
    yearsExperience: 9,
    description: 'Penthouses de doble altura con terrazas ajardinadas y vista de 360 grados hacia el Antisana y Cotopaxi.'
  },
  {
    id: 'agent-018',
    name: 'Arq. Nicolás Andrade',
    role: 'AGENT',
    company: 'Urban Lab Desarrollos',
    specialtySector: 'Iñaquito & Hipercentro Metro',
    phone: '+593 99 894 7711',
    email: 'nicolas.andrade@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    reviewCount: 25,
    activeListingsCount: 9,
    licenseNumber: 'Lic. Notarial DMQ #0894',
    isVerified: true,
    yearsExperience: 6,
    description: 'Asesoría en preventa de suites compactas automatizadas con domótica e inteligencia artificial frente a estaciones del Metro.'
  },
  {
    id: 'agent-019',
    name: 'Lcda. Cristina Samaniego',
    role: 'AGENT',
    company: 'Samaniego Boutique Properties',
    specialtySector: 'Tumbaco El Arenal & Tola Chica',
    phone: '+593 99 562 3344',
    email: 'cristina.samaniego@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
    rating: 4.9,
    reviewCount: 23,
    activeListingsCount: 5,
    licenseNumber: 'Lic. ACBIR-Pichincha #0562',
    isVerified: true,
    yearsExperience: 8,
    description: 'Villas de una sola planta diseñadas para familias que buscan amplitud, jardines con huertos orgánicos y tranquilidad.'
  },
  {
    id: 'agent-020',
    name: 'Ing. Patricio Cárdenas',
    role: 'AGENT',
    company: 'Cárdenas & Asociados Consultoría',
    specialtySector: 'Cumbayá Miravalle & Scala',
    phone: '+593 98 910 8822',
    email: 'patricio.cardenas@propiedadespremier.ec',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=256&q=80',
    rating: 5.0,
    reviewCount: 47,
    activeListingsCount: 10,
    licenseNumber: 'Lic. ACBIR-Pichincha #0910',
    isVerified: true,
    yearsExperience: 16,
    description: 'Corredor inmobiliario senior con más de 150 cierres notariales exitosos en urbanizaciones cerradas de Miravalle y Cumbayá.'
  }
];

export class AgentService {
  public getAllAgents(): AgentProfile[] {
    return AGENTS_DATA;
  }

  public filterBySector(sector: string): AgentProfile[] {
    if (!sector || sector === 'ALL') return AGENTS_DATA;
    return AGENTS_DATA.filter((a) =>
      a.specialtySector.toLowerCase().includes(sector.toLowerCase())
    );
  }

  public getById(id: string): AgentProfile | undefined {
    return AGENTS_DATA.find((a) => a.id === id);
  }

  public getAllCompanies(): CompanyProfile[] {
    return COMPANIES_DATA;
  }
}

export const agentService = new AgentService();
