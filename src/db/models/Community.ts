import mongoose, { Schema, Document, models } from 'mongoose';

export interface ICommunity extends Document {
  name: string;
  description: string;
  logoUrl?: string;
  facultyCoordinator?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    logoUrl: { type: String },
    facultyCoordinator: { type: String },
    socialLinks: {
      instagram: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Community = models.Community || mongoose.model<ICommunity>('Community', CommunitySchema);

export default Community;
