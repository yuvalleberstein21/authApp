import express from 'express';
import { login, logout, register } from '../controllers/userController';
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logout);

// router.get('/protected-route');

export default router;
