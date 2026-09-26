import express from 'express';
import { fileURLToPath } from 'node:url';
import homeRoutes from './routes/home.routes.js';
import postRoutes from './routes/post.routes.js';
const app = express();
app.set('view engine', 'ejs');
app.set('views', fileURLToPath(new URL('./views/', import.meta.url)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(fileURLToPath(new URL('./public/', import.meta.url))));
app.use('/', homeRoutes);
app.use('/posts', postRoutes);
app.use((req, res) => res.status(404).render('error', { message: 'Página no encontrada' }));
app.use((error, req, res, next) => {
  console.error(error.message);
  const status = error.status || (['ValidationError', 'CastError'].includes(error.name) ? 400 : 500);
  res.status(status).render('error', { message: status === 500 ? 'No se pudo completar la operación.' : error.message });
});
export default app;
