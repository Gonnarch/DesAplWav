import mongoose from 'mongoose';
import connectDB from '../src/db/database.js';
import users from '../src/repositories/userRepository.js';
import posts from '../src/repositories/postRepository.js';
import Post from '../src/models/Post.js';
try {
  await connectDB();
  // Datos ficticios de prueba. No se eliminan registros existentes.
  let user = await users.findByEmail('william@example.com');
  if (!user) user = await users.create({ name: 'William', lastName: 'Arévalo', email: 'william@example.com', age: 25, phoneNumber: '900000001', password: 'DemoSocial2026!' });
  else if (user.age == null) {
    // Completar el ejemplo básico si se continúa sobre la base del laboratorio.
    user.age = 25;
    user.phoneNumber = '900000001';
    user.password = 'DemoSocial2026!';
    await user.save();
  }
  let second = await users.findByEmail('ana@example.com');
  if (!second) second = await users.create({ name: 'Ana', lastName: 'Torres', email: 'ana@example.com', age: 22, phoneNumber: '900000002', password: 'DemoSocial2026!' });
  const existing = await posts.findByUser(user._id);
  if (!existing.some(p => p.title === 'Hello')) await posts.create({ title: 'Hello', content: 'Hi, this is my first post!', user: user._id, hashtags: ['nodejs', 'mongodb', 'semana06'], imageUrl: '' });
  else {
    const sample = existing.find(p => p.title === 'Hello');
    // Persistir los valores nuevos al continuar con el ejemplo del laboratorio.
    if (!sample.hashtags.length) sample.hashtags = ['nodejs', 'mongodb', 'semana06'];
    if (sample.imageUrl == null) sample.imageUrl = '';
    await sample.save();
    // Migración puntual: createdAt es inmutable en el CRUD ordinario.
    await Post.collection.updateOne(
      { _id: sample._id, createdAt: { $exists: false } },
      { $set: { createdAt: new Date() } }
    );
  }
  if (!(await posts.findByUser(second._id)).some(p => p.title === 'Aprendiendo MongoDB')) await posts.create({ title: 'Aprendiendo MongoDB', content: 'Modelos, repositorios y servicios conectados a una base de datos documental.', user: second._id, hashtags: ['mongoose', 'tecsup'], imageUrl: '' });
  console.log('Datos de demostración listos.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
