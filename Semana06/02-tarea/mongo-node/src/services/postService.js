import mongoose from 'mongoose';
import postRepository from '../repositories/postRepository.js';
import userRepository from '../repositories/userRepository.js';
function validId(id) {
  if (!mongoose.isObjectIdOrHexString(id)) throw Object.assign(new Error('Identificador inválido'), { status: 400 });
}
function fields(data) {
  const tags = Array.isArray(data.hashtags) ? data.hashtags : String(data.hashtags || '').split(/[\s,]+/);
  return { title: data.title, content: data.content, imageUrl: data.imageUrl || '', hashtags: [...new Set(tags.map(t => String(t).replace(/^#+/, '').trim()).filter(Boolean))] };
}
class PostService {
  async createPost(userId, data) {
    validId(userId);
    const user = await userRepository.findById(userId);
    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 400 });
    return postRepository.create({ ...fields(data), user: user._id });
  }
  async getPosts() { return postRepository.findAll(); }
  async getPostsByUser(id) { validId(id); return postRepository.findByUser(id); }
  async getPost(id) {
    validId(id);
    const post = await postRepository.findById(id);
    if (!post) throw Object.assign(new Error('Publicación no encontrada'), { status: 404 });
    return post;
  }
  async updatePost(id, data) {
    await this.getPost(id);
    validId(data.userId);
    const user = await userRepository.findById(data.userId);
    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 400 });
    return postRepository.update(id, { ...fields(data), user: user._id });
  }
  async deletePost(id) { await this.getPost(id); return postRepository.delete(id); }
}
export default new PostService();
