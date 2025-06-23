import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'User Not Found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// מזהה את המשתמש (נשמר ב-session)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// מחזיר את המשתמש מתוך ה-id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
