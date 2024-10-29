import express from 'express';

import { register, login, logout, currentUser } from '../controllers/authController.js';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/register', ensureAuthenticated, isAdmin, register);
router.post('/login', login);
router.post('/logout', ensureAuthenticated, logout);
router.get('/current-user', ensureAuthenticated, currentUser);

export default router