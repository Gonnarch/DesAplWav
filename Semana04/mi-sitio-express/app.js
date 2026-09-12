const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/mainRoutes'));
app.use((req, res) => res.status(404).render('notFound', { title: 'Página no encontrada', url: req.originalUrl }));
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));
}
module.exports = app;
