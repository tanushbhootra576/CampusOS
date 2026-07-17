import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlog extends Document {
  author: mongoose.Types.ObjectId;
  club?: mongoose.Types.ObjectId;
  title: string;
  content: string; // Markdown
  tags: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Community' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  categories: [{ type: String }],
}, { timestamps: true });

const Blog = models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
