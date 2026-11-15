import { Router } from 'express';
import { 
  listProperties, 
  getPropertyById, 
  createProperty, 
  deleteProperty,
  propertyFilterSchema,
  createPropertySchema
} from '../controllers/propertyController';
import { authenticateJWT, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/security';

const router = Router();

router.get('/', validate(propertyFilterSchema), optionalAuth, listProperties);
router.get('/:id', getPropertyById);
router.post('/', authenticateJWT, validate(createPropertySchema), createProperty);
router.delete('/:id', authenticateJWT, deleteProperty);

export default router;
