import mongoose from 'mongoose';
import connectDB from './src/db/database.js';
import app from './src/server.js';
try {
  await connectDB();
  const port = process.env.PORT || 3001;
  const server = app.listen(port, '127.0.0.1', () => console.log('Servidor en http://localhost:' + port));
  server.on('error', async error => { console.error(error.message); await mongoose.disconnect(); process.exitCode = 1; });
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(async () => { await mongoose.disconnect(); process.exit(0); }));
} catch (error) { console.error('Error al iniciar:', error.message); process.exitCode = 1; }
