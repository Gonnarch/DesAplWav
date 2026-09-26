import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
export default async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error('Falta MONGO_URI. Copia .env.example como .env.');
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB conectado: ' + mongoose.connection.name);
}
