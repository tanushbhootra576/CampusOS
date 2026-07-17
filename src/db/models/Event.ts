import mongoose, { Schema, Document, models } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  time: string;
  registrationLimit?: number;
  organizer: mongoose.Types.ObjectId; // Reference to Community
  attendees: mongoose.Types.ObjectId[]; // Reference to Users
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true, default: '10:00 AM' },
    registrationLimit: { type: Number },
    organizer: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
