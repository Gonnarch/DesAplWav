import Post from '../models/Post.js';
class PostRepository {
  async create(post) { return Post.create(post); }
  async findAll() { return Post.find().populate('user'); }
  async findById(id) { return Post.findById(id).populate('user'); }
  async findByUser(userId) { return Post.find({ user: userId }).populate('user'); }
  async update(id, data) { return Post.findByIdAndUpdate(id, data, { new: true, runValidators: true }); }
  async delete(id) { return Post.findByIdAndDelete(id); }
}
export default new PostRepository();
