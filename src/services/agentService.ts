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
    agentsCount: 14,
    activeProjectsCount: 4,
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
    agentsCount: 22,
    activeProjectsCount: 8,
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
