import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

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
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('שגיאה בהרשמה:', error);
    res.status(500).json({ message: 'משהו השתבש בהרשמה' });
    return;
  }
};

// התחברות
export const login = (req: Request, res: Response) => {
  res.json({ message: 'Logged in successfully' });
};

// התנתקות
export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
};
