import mongoose from 'mongoose';
import postRepository from '../repositories/postRepository.js';
import userRepository from '../repositories/userRepository.js';
function validId(id) {
  if (!mongoose.isObjectIdOrHexString(id)) throw Object.assign(new Error('Identificador inválido'), { status: 400 });
}

class PostService {
  async createPost(userId, data) {
    validId(userId);
    const user = await userRepository.findById(userId);
    if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 400 });
    return postRepository.create({ title: data.title, content: data.content, user: user._id });
  }
  async getPosts() { return postRepository.findAll(); }
  async getPostsByUser(id) { validId(id); return postRepository.findByUser(id); }
  async getPost(id) {
    validId(id);
    const post = await postRepository.findById(id);
    if (!post) throw Object.assign(new Error('Publicación no encontrada'), { status: 404 });
    return post;
  }

}
export default new PostService();
