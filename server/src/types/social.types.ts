/**
 * PROPIEDADES PREMIER - SOCIAL & MEDIA TYPES
 * 
 * Contratos de datos para el subsistema de Red Social Inmobiliaria (Reels 9:16,
 * Comentarios en tiempo real, Telemetría de Retención y Almacenamiento de Objetos).
 */

export interface SocialComment {
  id: string;
  reelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface ReelStats {
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  avgWatchDurationSec: number;
  completionRatePct: number;
}

export interface SocialReelEntity {
  id: string;
  propertyId: string;
  propertyCode: string;
  title: string;
  caption: string;
  sector: string;
  videoUrl: string; // URL en Object Storage (S3 / MinIO / CDN)
  thumbnailUrl: string;
  aspectRatio: '9:16';
  durationSeconds: number;
  authorAgent: {
    id: string;
    name: string;
    company: string;
    avatar: string;
    phone: string;
    licenseNumber: string;
  };
  stats: ReelStats;
  tags: string[];
  comments: SocialComment[];
  createdAt: string;
}

export interface PresignedUploadDTO {
  filename: string;
  contentType: 'image/jpeg' | 'image/png' | 'image/webp' | 'video/mp4';
  fileSizeBytes: number;
  folder?: 'properties' | 'reels' | 'avatars';
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
  expiresInSeconds: number;
  maxSizeBytes: number;
  fields: Record<string, string>;
}
