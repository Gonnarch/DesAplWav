import mongoose from 'mongoose';
import { randomBytes, scryptSync } from 'node:crypto';
const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true },
  age: { type: Number, min: 18, required: true },
  phoneNumber: String,
  password: { type: String, minlength: 8, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
});
// La validación de longitud ocurre antes de guardar; MongoDB recibe el hash.
userSchema.pre('save', function () {
  if (!this.isModified('password')) return;
  const salt = randomBytes(16).toString('hex');
  this.password = salt + ':' + scryptSync(this.password, salt, 64).toString('hex');
});
export default mongoose.model('User', userSchema);
