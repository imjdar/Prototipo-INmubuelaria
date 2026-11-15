import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);
router.get('/', getFavorites);
router.post('/:propertyId', addFavorite);
router.delete('/:propertyId', removeFavorite);

export default router;
