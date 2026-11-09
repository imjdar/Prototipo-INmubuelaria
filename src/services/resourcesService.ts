export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'GUIA_COMPRA' | 'PLUSVALIA' | 'TRAMITES_NOTARIALES';
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  type: 'PROMESA_COMPRAVENTA' | 'CONTRATO_ARRIENDO' | 'REQUISITOS_BIESS';
  description: string;
  pages: number;
  format: 'PDF' | 'DOCX';
  downloadFileName: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Guía 2026: Cómo tramitar tu crédito hipotecario BIESS al 5.99% en Quito',
    excerpt: 'Pasos actualizados, precalificación en línea, avalúos catastrales DMQ y tiempos reales de desembolso para vivienda terminada.',
    category: 'GUIA_COMPRA',
    author: 'Dra. Sofía Carrillo · Asesora Legal Inmobiliaria',
    date: 'Octubre 2026',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-2',
    title: 'Impacto del Metro de Quito en la plusvalía: San Francisco a El Labrador',
    excerpt: 'Análisis del valor por metro cuadrado a 500 metros de las 15 paradas. Por qué La Carolina e Iñaquito lideran el rendimiento Airbnb.',
    category: 'PLUSVALIA',
    author: 'Ing. Mateo Serrano · Tasador Certificado',
    date: 'Noviembre 2026',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-3',
    title: 'Impuesto de Alcabala y Tasas Notariales DMQ explicadas punto a punto',
    excerpt: 'Aprende a calcular la alcabala del 1%, la tasa del Consejo Provincial de Pichincha del 0.11% y los aranceles del Registro de la Propiedad.',
    category: 'TRAMITES_NOTARIALES',
    author: 'Equipo Jurídico Propiedades Premier',
    date: 'Septiembre 2026',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  }
];

export const LEGAL_TEMPLATES: LegalTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Modelo de Promesa de Compraventa Inmueble (DMQ 2026)',
    type: 'PROMESA_COMPRAVENTA',
    description: 'Borrador avalado por notarías de Quito con cláusula penal, entrega de arras y certificado de gravámenes al día.',
    pages: 6,
    format: 'DOCX',
    downloadFileName: 'Promesa_Compraventa_DMQ_Premier.docx'
  },
  {
    id: 'tmpl-2',
    title: 'Contrato de Arrendamiento Urbano con Garantía (Quito)',
    type: 'CONTRATO_ARRIENDO',
    description: 'Formato adaptado a la Ley de Inquilinato ecuatoriana con cláusulas de expensas, mantenimiento y restitución.',
    pages: 4,
    format: 'DOCX',
    downloadFileName: 'Contrato_Arrendamiento_Quito_Premier.docx'
  },
  {
    id: 'tmpl-3',
    title: 'Checklist Completo de Requisitos Crédito Hipotecario BIESS',
    type: 'REQUISITOS_BIESS',
    description: 'Documentación requerida de comprador y vendedor: IRM, pago de predios, cédula catastral y levantamiento de hipoteca.',
    pages: 2,
    format: 'PDF',
    downloadFileName: 'Checklist_Requisitos_BIESS_2026.pdf'
  }
];

export class ResourcesService {
  public getBlogPosts(): BlogPost[] {
    return BLOG_POSTS;
  }

  public getTemplates(): LegalTemplate[] {
    return LEGAL_TEMPLATES;
  }

  public calculateRoi(purchasePrice: number, monthlyRent: number, annualExpenses: number): {
    annualGrossIncome: number;
    annualNetIncome: number;
    capRateGross: number;
    capRateNet: number;
  } {
    const annualGrossIncome = monthlyRent * 12;
    const annualNetIncome = annualGrossIncome - annualExpenses;
    const capRateGross = Number(((annualGrossIncome / purchasePrice) * 100).toFixed(2));
    const capRateNet = Number(((annualNetIncome / purchasePrice) * 100).toFixed(2));
    return {
      annualGrossIncome,
      annualNetIncome,
      capRateGross,
      capRateNet
    };
  }
}

export const resourcesService = new ResourcesService();
