import { Router } from 'express';
import { listPlans, upgradePlan } from '../controllers/subscriptionController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/plans', listPlans);
router.post('/upgrade', authenticateJWT, upgradePlan);

export default router;
