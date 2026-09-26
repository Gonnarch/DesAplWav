import mongoose from 'mongoose';
import connectDB from '../src/db/database.js';
import users from '../src/repositories/userRepository.js';
import posts from '../src/repositories/postRepository.js';
try {
  await connectDB();
  console.log('Usuarios actuales:');
  console.log(JSON.stringify(await users.findAll(), null, 2));
  console.log('Posts registrados con su autor (populate):');
  console.log(JSON.stringify(await posts.findAll(), null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
