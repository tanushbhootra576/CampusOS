import mongoose, { Schema, Document, models } from 'mongoose';

export interface IMembership extends Document {
  user: mongoose.Types.ObjectId;
  club: mongoose.Types.ObjectId;
  role: 'member' | 'president' | 'vice_president' | 'tech_lead' | 'event_lead' | 'content_lead';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const MembershipSchema = new Schema<IMembership>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  role: { type: String, enum: ['member', 'president', 'vice_president', 'tech_lead', 'event_lead', 'content_lead'], default: 'member' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

const Membership = models.Membership || mongoose.model<IMembership>('Membership', MembershipSchema);
export default Membership;
