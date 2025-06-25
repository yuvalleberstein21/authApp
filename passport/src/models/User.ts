import mongoose from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
});

export const User = mongoose.model('User', userSchema);
