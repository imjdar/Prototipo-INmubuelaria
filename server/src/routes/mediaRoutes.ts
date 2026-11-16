/**
 * PROPIEDADES PREMIER - MEDIA & SOCIAL ROUTES
 * 
 * Endpoints:
 * - POST /api/v1/media/presigned-url
 * - GET  /api/v1/reels
 * - POST /api/v1/reels/:id/like
 * - POST /api/v1/reels/:id/comment
 * - POST /api/v1/reels/:id/view
 */

import { Router } from 'express';
import { MediaController } from '../controllers/mediaController';
import { socialReelRepository } from '../container';
import { validate } from '../middleware/security';
import { z } from 'zod';

const router = Router();
const mediaController = new MediaController(socialReelRepository);

// Esquema de validación para subida de medios
const presignedSchema = {
  body: z.object({
    filename: z.string().min(3).max(255),
    contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'video/mp4']),
    fileSizeBytes: z.number().int().positive().max(52428800), // Max 50MB
    folder: z.enum(['properties', 'reels', 'avatars']).optional()
  })
};

// 1. Presigned Upload URLs
router.post('/media/presigned-url', validate(presignedSchema), mediaController.generatePresignedUrl);

// 2. Feed de Reels 9:16
router.get('/reels', mediaController.getReelsFeed);
router.post('/reels/:id/like', mediaController.likeReel);
router.post('/reels/:id/comment', mediaController.commentOnReel);
router.post('/reels/:id/view', mediaController.trackView);

export default router;
