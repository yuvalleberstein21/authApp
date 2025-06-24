import express from 'express';
import {
  login,
  logout,
  profile,
  register,
} from '../controllers/userController';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/protected', isAuthenticated, profile);

export default router;
