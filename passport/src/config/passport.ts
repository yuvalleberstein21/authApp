import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log('❌ משתמש לא נמצא');
          return done(null, false, { message: 'משתמש לא נמצא' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return done(null, false, { message: 'פרטים שגויים נס/י שנית.' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google stretegy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        // אם המשתמש לא קיים – צור אחד חדש
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails?.[0].value,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
