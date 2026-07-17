import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  role: 'student' | 'club_admin' | 'super_admin';
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { 
      type: String, 
      enum: ['student', 'club_admin', 'super_admin'], 
      default: 'student' 
    },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent Next.js HMR from redefining the model
const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
