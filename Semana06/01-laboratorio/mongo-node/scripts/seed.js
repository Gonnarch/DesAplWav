import mongoose from 'mongoose';
import connectDB from '../src/db/database.js';
import users from '../src/repositories/userRepository.js';
import posts from '../src/repositories/postRepository.js';
try {
  await connectDB();
  // Datos ficticios de prueba. No se eliminan registros existentes.
  let user = await users.findByEmail('william@example.com');
  if (!user) user = await users.create({ name: 'William', lastName: 'Arévalo', email: 'william@example.com' });

  const existing = await posts.findByUser(user._id);
  if (!existing.some(p => p.title === 'Hello')) await posts.create({ title: 'Hello', content: 'Hi, this is my first post!', user: user._id });

  console.log('Datos de demostración listos.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
