import User from '../models/User.js';
class UserRepository {
  async create(user) { return User.create(user); }
  async findAll() { return User.find(); }
  async findById(id) { return User.findById(id); }
  async findByEmail(email) { return User.findOne({ email }); }
}
export default new UserRepository();
