import postService from '../services/postService.js';
import userRepository from '../repositories/userRepository.js';
class PostController {
  async getAll(req, res) { res.render('posts', { posts: await postService.getPosts() }); }
  async newForm(req, res) { res.render('post-form', { post: {}, users: await userRepository.findAll(), editing: false, error: null }); }
  async editForm(req, res) {
    const post = await postService.getPost(req.params.id);
    res.render('post-form', { post, users: await userRepository.findAll(), editing: true, error: null });
  }
  async create(req, res, next) {
    try { await postService.createPost(req.body.userId, req.body); res.redirect(303, '/posts'); }
    catch (error) { await formError(req, res, next, error, false); }
  }
  async update(req, res, next) {
    try { await postService.updatePost(req.params.id, req.body); res.redirect(303, '/posts'); }
    catch (error) { await formError(req, res, next, error, true); }
  }
  async delete(req, res) { await postService.deletePost(req.params.id); res.redirect(303, '/posts'); }
}
async function formError(req, res, next, error, editing) {
  if (error.status === 404) return next(error);
  if (error.name !== 'ValidationError' && error.name !== 'CastError' && error.status !== 400) return next(error);
  const message = error.errors ? Object.values(error.errors).map(e => e.message).join(' · ') : error.message;
  res.status(400).render('post-form', { post: { ...req.body, _id: req.params.id, user: req.body.userId }, users: await userRepository.findAll(), editing, error: message });
}
export default new PostController();
