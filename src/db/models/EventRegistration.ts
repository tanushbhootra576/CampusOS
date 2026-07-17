import mongoose, { Schema, Document, models } from 'mongoose';

export interface IEventRegistration extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: 'registered' | 'attended' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['registered', 'attended', 'cancelled'], default: 'registered' },
}, { timestamps: true });

const EventRegistration = models.EventRegistration || mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
export default EventRegistration;
