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
}

export const agentService = new AgentService();
