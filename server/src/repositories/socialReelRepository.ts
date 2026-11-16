/**
 * PROPIEDADES PREMIER - SOCIAL REEL REPOSITORY (NoSQL / Document Store Pattern)
 * 
 * Implementación de almacenamiento de documentos desacoplado para feeds de video vertical 9:16,
 * comentarios e interacciones sociales con alta tasa de escritura.
 */

import { SocialReelEntity, SocialComment } from '../types/social.types';

export interface ISocialReelRepository {
  findFeed(limit?: number, offset?: number, sector?: string): { reels: SocialReelEntity[]; total: number };
  findById(id: string): SocialReelEntity | null;
  recordView(id: string, durationSec: number): boolean;
  toggleLike(id: string, userId: string): { likesCount: number; isLiked: boolean };
  addComment(reelId: string, comment: Omit<SocialComment, 'id' | 'createdAt'>): SocialComment | null;
  createReel(reel: Omit<SocialReelEntity, 'id' | 'createdAt' | 'stats' | 'comments'>): SocialReelEntity;
}

export class InMemorySocialReelRepository implements ISocialReelRepository {
  private reels: Map<string, SocialReelEntity> = new Map();
  private userLikes: Map<string, Set<string>> = new Map(); // reelId -> Set(userId)

  constructor() {
    this.seedInitialReels();
  }

  private seedInitialReels(): void {
    const initialData: SocialReelEntity[] = [
      {
        id: 'reel-001',
        propertyId: 'VU-CUM-048',
        propertyCode: 'VU-CUM-048',
        title: 'Villa Natura Cumbayá · Tour Vertical Exclusivo',
        caption: 'Piscina infinity temperada con vista al cañón y volcán Ilaló. Respaldo eléctrico 100% y pozo propio. ¿Vivirías aquí? ⚡🏡',
        sector: 'Cumbayá',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-large-windows-41584-large.mp4',
        thumbnailUrl: '/images/cumbaya_villa.jpg',
        aspectRatio: '9:16',
        durationSeconds: 38,
        authorAgent: {
          id: 'agent-001',
          name: 'Ing. Mateo Serrano',
          company: 'Premier Luxury Cumbayá',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
          phone: '+593998765432',
          licenseNumber: 'Lic. Notarial #0492 DMQ'
        },
        stats: {
          viewsCount: 14250,
          likesCount: 1840,
          sharesCount: 395,
          avgWatchDurationSec: 32.4,
          completionRatePct: 85.2
        },
        tags: ['#CumbayaLujo', '#SanJuanAlto', '#InfinityPool', '#BienesRaicesQuito', '#RespaldoElectrico'],
        comments: [
          {
            id: 'comm-101',
            reelId: 'reel-001',
            userId: 'usr-sofia-carrillo-002',
            userName: 'Dra. Sofía Carrillo',
            userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            text: 'Increíble iluminación natural y la cocina con isla Calacatta es espectacular.',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
          },
          {
            id: 'comm-102',
            reelId: 'reel-001',
            userId: 'usr-patricio-alvarez-009',
            userName: 'Dr. Patricio Álvarez',
            userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
            text: '¿El generador abastece los aires acondicionados y la bomba de calor de la piscina?',
            createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        id: 'reel-002',
        propertyId: 'VU-PUE-019',
        propertyCode: 'VU-PUE-019',
        title: 'Quinta Los Arrayanes & Golf Club · Puembo',
        caption: '1,800 m² de terreno campestre frente al Club Los Arrayanes. Microclima subtropical andino los 365 días del año. ⛳🐎',
        sector: 'Puembo',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-luxurious-modern-house-41585-large.mp4',
        thumbnailUrl: '/images/puembo_country.jpg',
        aspectRatio: '9:16',
        durationSeconds: 45,
        authorAgent: {
          id: 'agent-004',
          name: 'Dra. Paulina Barahona',
          company: 'Puembo Country Realty',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
          phone: '+593993184590',
          licenseNumber: 'Lic. ACBIR #0318'
        },
        stats: {
          viewsCount: 9810,
          likesCount: 1120,
          sharesCount: 240,
          avgWatchDurationSec: 39.1,
          completionRatePct: 86.8
        },
        tags: ['#PuemboCampestre', '#ArrayanesGolf', '#QuintasDeLujo', '#CaballerizasQuito'],
        comments: [
          {
            id: 'comm-201',
            reelId: 'reel-002',
            userId: 'usr-diego-falconi-006',
            userName: 'Ing. Diego Falconí',
            userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
            text: 'La topografía plana en Puembo con esos árboles consolidados tiene una plusvalía tremenda.',
            createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
      },
      {
        id: 'reel-003',
        propertyId: 'VU-CAR-005',
        propertyCode: 'VU-CAR-005',
        title: 'Sky Suite Inversión Airbnb · Metro La Carolina',
        caption: 'Piso 18 con vista al Parque La Carolina. Cap Rate 9.4% anual comprobado y a 3 minutos a pie del Metro de Quito. 🚆🏙️',
        sector: 'La Carolina',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41586-large.mp4',
        thumbnailUrl: '/images/carolina_sky_suite.jpg',
        aspectRatio: '9:16',
        durationSeconds: 29,
        authorAgent: {
          id: 'agent-002',
          name: 'Arq. Gabriela Endara',
          company: 'Premier Metropolitan Real Estate',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
          phone: '+593994321098',
          licenseNumber: 'Lic. Notarial #0811 DMQ'
        },
        stats: {
          viewsCount: 21890,
          likesCount: 3100,
          sharesCount: 820,
          avgWatchDurationSec: 26.5,
          completionRatePct: 91.3
        },
        tags: ['#LaCarolina', '#MetroDeQuito', '#InversionAirbnb', '#CapRateEcuador'],
        comments: [],
        createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
      }
    ];

    for (const reel of initialData) {
      this.reels.set(reel.id, reel);
      this.userLikes.set(reel.id, new Set());
    }
  }

  public findFeed(limit: number = 10, offset: number = 0, sector?: string): { reels: SocialReelEntity[]; total: number } {
    let list = Array.from(this.reels.values());

    if (sector && sector !== 'ALL') {
      list = list.filter((r) => r.sector.toLowerCase() === sector.toLowerCase());
    }

    // Ordenar por popularidad y recencia (algoritmo de feed social)
    list.sort((a, b) => (b.stats.viewsCount + b.stats.likesCount * 3) - (a.stats.viewsCount + a.stats.likesCount * 3));

    const paginated = list.slice(offset, offset + limit);
    return {
      reels: paginated,
      total: list.length
    };
  }

  public findById(id: string): SocialReelEntity | null {
    return this.reels.get(id) || null;
  }

  public recordView(id: string, durationSec: number): boolean {
    const reel = this.reels.get(id);
    if (!reel) return false;

    reel.stats.viewsCount += 1;
    // Media móvil acumulada de retención de video
    reel.stats.avgWatchDurationSec = Number(
      ((reel.stats.avgWatchDurationSec * (reel.stats.viewsCount - 1) + durationSec) / reel.stats.viewsCount).toFixed(1)
    );
    if (durationSec >= reel.durationSeconds * 0.8) {
      reel.stats.completionRatePct = Number(
        (((reel.stats.completionRatePct * (reel.stats.viewsCount - 1)) + 100) / reel.stats.viewsCount).toFixed(1)
      );
    }
    return true;
  }

  public toggleLike(id: string, userId: string): { likesCount: number; isLiked: boolean } {
    const reel = this.reels.get(id);
    if (!reel) throw new Error('Reel no encontrado');

    let likesSet = this.userLikes.get(id);
    if (!likesSet) {
      likesSet = new Set();
      this.userLikes.set(id, likesSet);
    }

    let isLiked = false;
    if (likesSet.has(userId)) {
      likesSet.delete(userId);
      reel.stats.likesCount = Math.max(0, reel.stats.likesCount - 1);
      isLiked = false;
    } else {
      likesSet.add(userId);
      reel.stats.likesCount += 1;
      isLiked = true;
    }

    return { likesCount: reel.stats.likesCount, isLiked };
  }

  public addComment(reelId: string, comment: Omit<SocialComment, 'id' | 'createdAt'>): SocialComment | null {
    const reel = this.reels.get(reelId);
    if (!reel) return null;

    const newComment: SocialComment = {
      id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      reelId,
      userId: comment.userId,
      userName: comment.userName,
      userAvatar: comment.userAvatar,
      text: comment.text,
      createdAt: new Date().toISOString()
    };

    reel.comments.unshift(newComment);
    return newComment;
  }

  public createReel(reel: Omit<SocialReelEntity, 'id' | 'createdAt' | 'stats' | 'comments'>): SocialReelEntity {
    const newReel: SocialReelEntity = {
      ...reel,
      id: `reel-${Date.now()}`,
      createdAt: new Date().toISOString(),
      stats: {
        viewsCount: 0,
        likesCount: 0,
        sharesCount: 0,
        avgWatchDurationSec: 0,
        completionRatePct: 0
      },
      comments: []
    };

    this.reels.set(newReel.id, newReel);
    this.userLikes.set(newReel.id, new Set());
    return newReel;
  }
}
