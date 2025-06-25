import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import passport from 'passport';
import { IUser } from '../types/user';

// הרשמה
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'יש למלא את השדות הנדרשים' });
      return;
    }
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: 'אימייל כבר קיים במערכת' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });

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
  passport.authenticate('local', (err: any, user: IUser, info: any) => {
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
  res.status(200).json({
    message: 'ברוך הבא לדף הפרופיל!',
    user: req.user,
  });
};
