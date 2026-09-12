const games = [];
const fields = ['nombre', 'genero', 'plataforma', 'desarrollador', 'anio'];
const index = (req, res) => res.render('games', { title: 'Videojuegos', games, error: '', values: {} });
const create = (req, res) => {
  const values = Object.fromEntries(fields.map(key => [key, typeof req.body?.[key] === 'string' ? req.body[key].trim() : '']));
  if (fields.some(key => !values[key] || values[key].length > 120) || !/^\d{4}$/.test(values.anio) || Number(values.anio) < 1950 || Number(values.anio) > new Date().getFullYear() + 5) {
    return res.status(400).render('games', { title: 'Videojuegos', games, error: 'Completa los cinco campos. El año debe estar entre 1950 y ' + (new Date().getFullYear() + 5) + '.', values });
  }
  games.push(values);
  res.redirect('/games');
};
module.exports = { index, create };
