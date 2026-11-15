import { Router } from 'express';
import { 
  register, 
  login, 
  refreshToken, 
  logout, 
  getMe, 
  registerSchema, 
  loginSchema, 
  refreshSchema 
} from '../controllers/authController';
import { authenticateJWT } from '../middleware/auth';
import { authRateLimiter, validate } from '../middleware/security';

const router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), register);
router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refreshToken);
router.post('/logout', logout);
router.get('/me', authenticateJWT, getMe);

export default router;
