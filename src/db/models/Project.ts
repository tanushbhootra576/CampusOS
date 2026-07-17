import mongoose, { Schema, Document, models } from 'mongoose';

export interface IProject extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  techStack: string[];
  stars: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String, required: true },
  demoUrl: { type: String },
  techStack: [{ type: String }],
  stars: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

const Project = models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
