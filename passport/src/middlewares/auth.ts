import { Request, Response, NextFunction } from 'express';
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('🧪 isAuthenticated?', req.isAuthenticated());
  console.log('👤 req.user:', req.user);

  if (req.isAuthenticated()) {
    console.log('✅ המשתמש מחובר - ממשיכים ל־next()');
    console.log('🚀 קוראים ל-next()...');
    next(); // הסר את ה-return מכאן
    console.log('✅ next() הסתיים');
    return;
  }

  console.log('❌ המשתמש לא מחובר - מחזירים 401');
  res.status(401).json({ message: 'גישה נדחתה. יש להתחבר בכדי להגיע לדף זה' });
};
