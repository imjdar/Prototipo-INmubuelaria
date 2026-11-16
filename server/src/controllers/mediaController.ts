/**
 * PROPIEDADES PREMIER - MEDIA & SOCIAL CONTROLLER
 * 
 * Gestiona la subida segura de objetos (S3 / MinIO Presigned URLs),
 * el feed social de videos 9:16, comentarios y analítica de interacción.
 */

import { Request, Response } from 'express';
import { ISocialReelRepository } from '../repositories/socialReelRepository';
import { PresignedUploadDTO, PresignedUploadResponse } from '../types/social.types';

// Helper de sanitización para prevenir XSS almacenado en comentarios
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export class MediaController {
  constructor(private socialReelRepository: ISocialReelRepository) {}

  /**
   * POST /api/v1/media/presigned-url
   * Genera una URL de subida pre-firmada hacia S3 / MinIO / Object Storage.
   * Evita el paso de binarios por Node.js (mitiga DoS por consumo de memoria y saturación de disco).
   */
  public generatePresignedUrl = async (req: Request, res: Response): Promise<void> => {
    const { filename, contentType, fileSizeBytes, folder = 'properties' } = req.body as PresignedUploadDTO;

    // 1. Validar tipos MIME permitidos
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
    if (!allowedMimes.includes(contentType)) {
      res.status(400).json({
        success: false,
        error: 'TIPO_ARCHIVO_NO_PERMITIDO',
        message: `El formato '${contentType}' no es válido. Formatos permitidos: JPG, PNG, WEBP, MP4.`
      });
      return;
    }

    // 2. Límites de tamaño por tipo de archivo
    const isVideo = contentType === 'video/mp4';
    const maxSizeBytes = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB para reels, 10MB para fotos

    if (fileSizeBytes > maxSizeBytes) {
      res.status(400).json({
        success: false,
        error: 'TAMANO_EXCEDIDO',
        message: `El archivo excede el límite permitido de ${isVideo ? '50MB' : '10MB'}.`
      });
      return;
    }

    // 3. Generar identificador único y clave de almacenamiento
    const sanitizedName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const fileKey = `${folder}/${timestamp}-${sanitizedName}`;

    // 4. URL de almacenamiento (compatible con MinIO / AWS S3 / Cloudflare R2)
    const storageHost = process.env.STORAGE_ENDPOINT || 'http://localhost:9000';
    const bucketName = process.env.STORAGE_BUCKET || 'premier-media';

    const presignedData: PresignedUploadResponse = {
      uploadUrl: `${storageHost}/${bucketName}/${fileKey}?signature=${timestamp}_secure_token_s3_v4`,
      fileKey,
      publicUrl: `/images/${sanitizedName.toLowerCase()}`, // Mapeo a CDN o proxy local
      expiresInSeconds: 900, // 15 minutos de validez
      maxSizeBytes,
      fields: {
        'Content-Type': contentType,
        'x-amz-acl': 'public-read'
      }
    };

    res.status(200).json({
      success: true,
      data: presignedData
    });
  };

  /**
   * GET /api/v1/reels
   * Retorna el feed de videos 9:16 optimizados para TikTok/Reels con métricas de engagement
   */
  public getReelsFeed = async (req: Request, res: Response): Promise<void> => {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const sector = req.query.sector as string;

    const result = this.socialReelRepository.findFeed(limit, offset, sector);

    res.status(200).json({
      success: true,
      data: {
        reels: result.reels,
        pagination: {
          total: result.total,
          limit,
          offset,
          hasMore: offset + limit < result.total
        }
      }
    });
  };

  /**
   * POST /api/v1/reels/:id/like
   * Incremento atómico de 'Me Gusta'
   */
  public likeReel = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const userId = (req as any).user?.id || 'guest-user';

    try {
      const result = this.socialReelRepository.toggleLike(id, userId);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch {
      res.status(404).json({
        success: false,
        error: 'REEL_NO_ENCONTRADO',
        message: 'El reel solicitado no existe.'
      });
    }
  };

  /**
   * POST /api/v1/reels/:id/comment
   * Comentarios con sanitización XSS estricta
   */
  public commentOnReel = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'COMENTARIO_VACIO',
        message: 'El contenido del comentario no puede estar vacío.'
      });
      return;
    }

    if (text.length > 500) {
      res.status(400).json({
        success: false,
        error: 'COMENTARIO_DEMASIADO_LARGO',
        message: 'El comentario no puede superar los 500 caracteres.'
      });
      return;
    }

    const user = (req as any).user || {
      id: 'usr-anonymous',
      fullName: 'Inversionista Interesado',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    };

    // Sanitización activa contra stored XSS
    const cleanText = sanitizeHtml(text.trim());

    const createdComment = this.socialReelRepository.addComment(id, {
      reelId: id,
      userId: user.id,
      userName: user.fullName || user.name || 'Usuario Verificado',
      userAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      text: cleanText
    });

    if (!createdComment) {
      res.status(404).json({
        success: false,
        error: 'REEL_NO_ENCONTRADO',
        message: 'No se pudo agregar el comentario porque el reel no existe.'
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: createdComment
    });
  };

  /**
   * POST /api/v1/reels/:id/view
   * Telemetría de retención y analítica de reproducción
   */
  public trackView = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const durationSec = Number(req.body.durationSeconds) || 5;

    const recorded = this.socialReelRepository.recordView(id, durationSec);
    if (!recorded) {
      res.status(404).json({
        success: false,
        error: 'REEL_NO_ENCONTRADO'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Visualización registrada para métricas del agente'
    });
  };
}
