import express from 'express';
import {
  login,
  logout,
  profile,
  register,
} from '../controllers/userController';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

// הרשמה
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: רישום משתמש חדש
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: משתמש נרשם בהצלחה
 *       400:
 *         description: שגיאת ולידציה או משתמש כבר קיים
 */

// התחברות

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: התחברות משתמש
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: התחברות הצליחה
 *       401:
 *         description: פרטי התחברות שגויים
 */

// התנתקות
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: התנתקות משתמש
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: המשתמש התנתק בהצלחה
 */

// פרופיל משתמש
/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: גישה לדף פרופיל מוגן (דורש התחברות)
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: פרטי משתמש מחובר
 *       401:
 *         description: המשתמש לא מחובר
 */
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', isAuthenticated, profile);

export default router;
