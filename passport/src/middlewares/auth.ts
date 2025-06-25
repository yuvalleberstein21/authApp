import { Request, Response, NextFunction } from 'express';
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(401).json({ message: 'גישה נדחתה. יש להתחבר בכדי להגיע לדף זה' });
};
