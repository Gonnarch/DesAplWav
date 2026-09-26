import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  title: { type: String, trim: true, minlength: 5, maxlength: 30, required: true },
  content: { type: String, trim: true, minlength: 10, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hashtags: [String],
  imageUrl: { type: String, validate: { validator: value => !value || /^https?:\/\//i.test(value), message: 'La imagen debe usar una URL http o https.' } },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: Date,
});
export default mongoose.model('Post', postSchema);
