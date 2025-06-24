import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import './config/passport';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 שעות
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/auth', authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Unhandled Error:', err);
  res.status(500).json({ message: 'שגיאה לא מטופלת' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  console.log('❓ 404 - Route not found:', req.method, req.path);
  res.status(404).json({ message: 'נתיב לא נמצא' });
});
const PORT = Number(process.env.PORT) || 8005;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
