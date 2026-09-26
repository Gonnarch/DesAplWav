import { Router } from 'express';
import controller from '../controllers/postController.js';
const router = Router();
router.get('/', controller.getAll);
router.post('/user/:userId', controller.create);
export default router;
