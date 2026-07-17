import mongoose, { Schema, Document, models } from 'mongoose';

export interface IAnnouncement extends Document {
  club?: mongoose.Types.ObjectId; // if null, global announcement
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  club: { type: Schema.Types.ObjectId, ref: 'Community' },
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const Announcement = models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
export default Announcement;
