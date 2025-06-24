import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import passport from 'passport';

// הרשמה
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'יש למלא אימייל וסיסמה' });
      return;
    }
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: 'אימייל כבר קיים במערכת' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });

    await user.save();
    res.status(201).json({ message: 'נרשמת בהצלחה' });
  } catch (error) {
    console.error('שגיאה בהרשמה:', error);
    res.status(500).json({ message: 'משהו השתבש בהרשמה' });
    return;
  }
};

// התחברות
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: Object, info: any) => {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || 'שגיאה בהתחברות' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'התחברת בהצלחה' });
    });
  })(req, res, next);
};

// התנתקות
export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'התנתקת בצלחה' });
  });
};

export const profile = (req: Request, res: Response) => {
  console.log('🎯 ENTERED PROFILE FUNCTION'); // לוג חדש
  console.log('✅ נכנסנו ל־/profile');
  console.log('👤 req.user:', req.user);

  try {
    res.status(200).json({
      message: 'ברוך הבא לדף הפרופיל!',
      user: req.user,
    });
    console.log('✅ שלחנו תגובה');
  } catch (error) {
    console.error('❌ שגיאה בפונקציית profile:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
