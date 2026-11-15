/**
 * PROPIEDADES PREMIER - PROPERTY CONTROLLER
 * 
 * Controlador HTTP para el catálogo de inmuebles de Quito y Valles.
 * Principios SOLID aplicados:
 * - SRP: Maneja exclusivamente la interfaz HTTP (Zod validation, serialización, status codes).
 * - DIP: Delega la lógica de negocio y persistencia a propertyService y propertyRepository del contenedor.
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import { propertyService, propertyRepository, subscriptionRepository } from '../container';

// ==========================================
// 1. Esquemas de Validación (Zod)
// ==========================================
export const propertyFilterSchema = {
  query: z.object({
    sector: z.string().optional(),
    type: z.string().optional(),
    operation: z.enum(['VENTA', 'RENTA', 'ALL']).optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    hasGenerator: z.string().optional(),
    hasMetro: z.string().optional(),
    biessEligible: z.string().optional(),
    q: z.string().optional(),
    sort: z.enum(['featured', 'price-asc', 'price-desc', 'area-desc', 'efficiency']).optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  })
};

export const createPropertySchema = {
  body: z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres.'),
    description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres.'),
    price: z.number().positive('El precio debe ser un número positivo.'),
    operation: z.enum(['VENTA', 'RENTA']),
    propertyType: z.enum(['Casa', 'Suite', 'Penthouse', 'Terreno', 'Departamento', 'Oficina', 'Bodega', 'Local', 'Proyecto']),
    sector: z.enum(['Cumbayá', 'Puembo', 'González Suárez', 'La Carolina', 'Tumbaco', 'Nayón']),
    microzone: z.string().optional(),
    address: z.string().optional(),
    areaBuild: z.number().positive('El área de construcción debe ser positiva.'),
    areaLot: z.number().optional(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(1),
    parking: z.number().int().min(0).default(1),
    hoaFee: z.number().min(0).default(0),
    image: z.string().min(1, 'La imagen principal es requerida.'),
    subPhotos: z.array(z.string()).default([]),
    features: z.object({
      hasGenerator: z.boolean().default(false),
      hasMetro: z.boolean().default(false),
      hasDoubleGate: z.boolean().default(false),
      isValleyClimate: z.boolean().default(false),
      biessEligible: z.boolean().default(false),
      isAirbnb: z.boolean().default(false),
      hasMatterport: z.boolean().default(false)
    }).default({
      hasGenerator: false,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: false,
      isAirbnb: false,
      hasMatterport: false
    }),
    legalStatus: z.string().optional()
  })
};

// ==========================================
// 2. Controladores de Rutas
// ==========================================

export function listProperties(req: Request, res: Response): void {
  const {
    sector,
    type,
    operation,
    minPrice,
    maxPrice,
    hasGenerator,
    hasMetro,
    biessEligible,
    q,
    sort = 'featured',
    page = '1',
    limit = '50'
  } = req.query as Record<string, string>;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));

  const result = propertyService.getProperties({
    sector,
    type,
    operation,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    hasGenerator: hasGenerator === 'true',
    hasMetro: hasMetro === 'true',
    biessEligible: biessEligible === 'true',
    q,
    sort: sort as any,
    page: pageNum,
    limit: limitNum
  });

  // Mapear entidades al contrato de frontend enriquecido con coordenadas
  const properties = result.properties.map(p => ({
    id: p.id,
    code: p.code,
    title: p.title,
    description: p.description,
    price: p.price,
    operation: p.operation,
    type: p.propertyType,
    sector: p.sector,
    microzone: p.microzone || '',
    address: p.address || '',
    areaBuild: p.areaBuild,
    areaLot: p.areaLot || p.areaBuild,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    hoaFee: p.hoaFee || 0,
    elevation: p.elevation || 2200,
    temperature: p.temperature || '20°C',
    image: p.image,
    subPhotos: p.subPhotos,
    features: p.features,
    legalStatus: p.legalStatus || 'Certificado al día',
    agent: p.agent || {},
    logistics: p.logistics || {},
    coordinates: {
      x: p.lng ? (p.lng + 78.5) * 100 : 50,
      y: p.lat ? (p.lat + 0.3) * 100 : 50
    }
  }));

  res.status(200).json({
    success: true,
    data: {
      properties,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit)
      }
    }
  });
}

export function getPropertyById(req: Request, res: Response): void {
  const id = String(req.params.id);
  const p = propertyService.getPropertyById(id) || propertyRepository.findByCode(id);

  if (!p) {
    res.status(404).json({
      success: false,
      error: 'PROPIEDAD_NO_ENCONTRADA',
      message: `No se encontró ninguna propiedad con el identificador ${id}.`
    });
    return;
  }

  const property = {
    id: p.id,
    code: p.code,
    title: p.title,
    description: p.description,
    price: p.price,
    operation: p.operation,
    type: p.propertyType,
    sector: p.sector,
    microzone: p.microzone || '',
    address: p.address || '',
    areaBuild: p.areaBuild,
    areaLot: p.areaLot || p.areaBuild,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    hoaFee: p.hoaFee || 0,
    elevation: p.elevation || 2200,
    temperature: p.temperature || '20°C',
    image: p.image,
    subPhotos: p.subPhotos,
    features: p.features,
    legalStatus: p.legalStatus || 'Certificado de Gravámenes al día',
    agent: p.agent || {},
    logistics: p.logistics || {},
    userId: p.userId,
    createdAt: p.createdAt
  };

  res.status(200).json({
    success: true,
    data: property
  });
}

export function createProperty(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  // Verificar suscripción activa y cuota
  const activeSub = subscriptionRepository.findActiveByUserId(req.user.userId);
  if (!activeSub) {
    res.status(403).json({
      success: false,
      error: 'SIN_MEMBRESIA_ACTIVA',
      message: 'Necesitas una membresía activa para publicar propiedades.'
    });
    return;
  }

  const { subscription, plan } = activeSub;
  if (subscription.usedListings >= plan.maxActiveListings && req.user.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      success: false,
      error: 'LIMITE_PUBLICACIONES_ALCANZADO',
      message: `Has alcanzado el límite de ${plan.maxActiveListings} propiedades activas de tu plan. Realiza un upgrade para publicar más.`
    });
    return;
  }

  try {
    const {
      title,
      description,
      price,
      operation,
      propertyType,
      sector,
      microzone,
      address,
      areaBuild,
      areaLot,
      bedrooms,
      bathrooms,
      parking,
      hoaFee,
      image,
      subPhotos = [],
      features = {},
      legalStatus
    } = req.body;

    const result = propertyService.createProperty(
      {
        title,
        description,
        price,
        operation,
        propertyType,
        sector,
        microzone,
        address,
        areaBuild,
        areaLot,
        bedrooms,
        bathrooms,
        parking,
        hoaFee,
        image,
        subPhotos,
        features,
        legalStatus
      },
      req.user.userId,
      req.user.role
    );

    res.status(201).json({
      success: true,
      message: 'Propiedad publicada exitosamente en Propiedades Premier.',
      data: { id: result.property.id, code: result.property.code }
    });
  } catch (error: any) {
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      res.status(403).json({
        success: false,
        error: 'LIMITE_PUBLICACIONES_ALCANZADO',
        message: error.message
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'ERROR_PUBLICACION',
      message: error.message || 'Error interno al registrar el inmueble.'
    });
  }
}

export function deleteProperty(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const id = String(req.params.id);
  const prop = propertyRepository.findById(id);

  if (!prop) {
    res.status(404).json({ success: false, error: 'NO_ENCONTRADA' });
    return;
  }

  if (prop.userId !== req.user.userId && req.user.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      success: false,
      error: 'NO_AUTORIZADO',
      message: 'No tienes permisos para eliminar esta propiedad.'
    });
    return;
  }

  try {
    propertyService.deleteProperty(id, req.user.userId, req.user.role);

    // Ajustar conteo de publicaciones usadas si aplica
    const activeSub = subscriptionRepository.findActiveByUserId(req.user.userId);
    if (activeSub && activeSub.subscription.usedListings > 0) {
      // decrementar en suscripción
    }

    res.status(200).json({
      success: true,
      message: 'Propiedad eliminada correctamente.'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'ERROR_ELIMINACION',
      message: error.message
    });
  }
}
