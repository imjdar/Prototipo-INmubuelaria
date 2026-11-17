/**
 * PROPIEDADES PREMIER - PRISMA ORM SEEDER (EF Core Style)
 * 
 * Siembra datos maestros iniciales (Planes, Usuarios y Catálogo de 32 Propiedades)
 * en la base de datos PostgreSQL utilizando el cliente fuertemente tipado Prisma.
 */

import bcrypt from 'bcryptjs';
import { prisma } from './prismaClient';
import { PROPERTIES } from '../../../src/data/properties';

export async function seedPrismaDatabase(): Promise<void> {
  console.log('🌱 [PRISMA SEEDER] Iniciando siembra Code-First...');

  // 1. Sembrar Planes Oficiales SRI
  const plans = [
    {
      id: 'plan-free',
      code: 'FREE',
      name: 'Plan Comprador Gratuito',
      monthlyPriceUsd: 0.0,
      annualPriceUsd: 0.0,
      maxActiveListings: 1,
      featuredTokens: 0,
      hasVideoReels: false,
      hasAiGuardianPriority: false,
      featuresJson: ['Búsqueda y filtros hiperlocales', 'Calculadora notarial DMQ y BIESS', 'Contacto WhatsApp directo']
    },
    {
      id: 'plan-pro',
      code: 'PRO_AGENT',
      name: 'Plan Agente Pro ($49/mes)',
      monthlyPriceUsd: 49.0,
      annualPriceUsd: 490.0,
      maxActiveListings: 15,
      featuredTokens: 3,
      hasVideoReels: true,
      hasAiGuardianPriority: true,
      featuresJson: ['Hasta 15 publicaciones activas', 'Videos verticales 9:16', 'Auditoría con Bot IA Notarial', 'Insignia de Agente Verificado']
    },
    {
      id: 'plan-vip',
      code: 'VIP_INMOBILIARIA',
      name: 'Plan Empresa Inmobiliaria ($99/mes)',
      monthlyPriceUsd: 99.0,
      annualPriceUsd: 990.0,
      maxActiveListings: 60,
      featuredTokens: 10,
      hasVideoReels: true,
      hasAiGuardianPriority: true,
      featuresJson: ['Hasta 60 publicaciones activas', 'Tour Matterport 3D integrado', 'Dossier notarial descargable', 'Facturación automática SRI con IVA 15%']
    }
  ];

  for (const pl of plans) {
    await prisma.membershipPlan.upsert({
      where: { code: pl.code },
      update: {},
      create: pl
    });
  }
  console.log(`✔ [PRISMA] ${plans.length} Planes de Membresía sincronizados`);

  // 2. Sembrar Usuarios con Hashes Bcrypt
  const salt = 12;
  const agentPass = await bcrypt.hash('Quito2026!Premier', salt);
  const buyerPass = await bcrypt.hash('Inversiones2026!', salt);
  const adminPass = await bcrypt.hash('AdminSuper2026!', salt);

  const users = [
    {
      id: 'usr-mateo-serrano-001',
      email: 'mateo.serrano@valleyurbe.ec',
      passwordHash: agentPass,
      fullName: 'Ing. Mateo Serrano',
      phone: '+593 99 876 5432',
      role: 'AGENT',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      isVerified: true,
      companyName: 'Valle & Urbe Patrimonial Cumbayá',
      licenseNumber: 'Lic. Registro Notarial #0492 DMQ'
    },
    {
      id: 'usr-sofia-carrillo-002',
      email: 'sofia.carrillo@investor.ec',
      passwordHash: buyerPass,
      fullName: 'Dra. Sofía Carrillo',
      phone: '+593 98 123 4567',
      role: 'BUYER',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      companyName: 'Inversiones Andinas'
    },
    {
      id: 'usr-admin-central-003',
      email: 'admin@propiedadespremier.ec',
      passwordHash: adminPass,
      fullName: 'Admin Central DMQ',
      phone: '+593 2 399 9000',
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      companyName: 'Propiedades Premier Tech Admin'
    }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
  }
  console.log(`✔ [PRISMA] ${users.length} Usuarios maestros creados`);

  // 3. Sembrar Catálogo Completo de Propiedades (32 inmuebles)
  for (const p of PROPERTIES) {
    await prisma.property.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        sector: p.sector,
        microzone: p.microzone,
        type: p.type,
        operationType: p.operationType || 'VENTA',
        price: p.price,
        areaBuild: p.areaBuild,
        areaLot: p.areaLot,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        parking: p.parking,
        hoaFee: p.hoaFee,
        elevationMeters: p.elevation,
        climateCategory: p.temperature,
        imageUrl: p.image,
        subPhotosJson: p.subPhotos || [],
        hasGenerator: Boolean(p.features.hasGenerator),
        hasMetro: Boolean(p.features.hasMetro),
        hasDoubleGate: Boolean(p.features.hasDoubleGate),
        isValleyClimate: Boolean(p.features.isValleyClimate),
        biessEligible: Boolean(p.features.biessEligible),
        hasMatterport: Boolean(p.features.hasMatterport),
        legalStatus: p.legalStatus,
        description: p.description,
        latitude: p.coordinates.lat ?? -0.205,
        longitude: p.coordinates.lng ?? -78.435,
        logisticsJson: p.logistics as any,
        agentName: p.agent.name,
        agentPhone: p.agent.phone,
        agentRole: p.agent.role,
        isFeatured: true,
        isVerifiedNotary: true
      }
    });
  }
  console.log(`✔ [PRISMA] ${PROPERTIES.length} Propiedades sincronizadas en la base de datos`);
  console.log('✅ [PRISMA SEEDER] Siembra finalizada con éxito.');
}

if (process.argv[1]?.includes('prismaSeed')) {
  seedPrismaDatabase()
    .catch((e) => {
      console.error('Error al sembrar con Prisma:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
