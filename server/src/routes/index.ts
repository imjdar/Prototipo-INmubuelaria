import { Router } from 'express';
import authRoutes from './authRoutes';
import propertyRoutes from './propertyRoutes';
import favoriteRoutes from './favoriteRoutes';
import subscriptionRoutes from './subscriptionRoutes';
import agentRoutes from './agentRoutes';
import billingRoutes from './billingRoutes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Propiedades Premier Core API',
    version: '1.0.0'
  });
});

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/agents', agentRoutes);
router.use('/billing', billingRoutes);

export default router;
