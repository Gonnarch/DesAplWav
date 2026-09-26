import postService from '../services/postService.js';

class PostController {
  async getAll(req, res) { res.render('posts', { posts: await postService.getPosts() }); }
  async create(req, res) { res.status(201).json(await postService.createPost(req.params.userId, req.body)); }
}

export default new PostController();
