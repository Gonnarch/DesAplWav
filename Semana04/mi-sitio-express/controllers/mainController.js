const messages = [];
const home = (req, res) => res.render('home', { title: 'Inicio' });
const about = (req, res) => res.render('about', { title: 'Acerca de' });
const contact = (req, res) => res.render('contact', { title: 'Contacto', error: '', values: {} });
const saveContact = (req, res) => {
  const values = Object.fromEntries(['nombre', 'email', 'mensaje'].map(key => [key, typeof req.body?.[key] === 'string' ? req.body[key].trim() : '']));
  if (!values.nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || !values.mensaje || values.nombre.length > 100 || values.email.length > 254 || values.mensaje.length > 2000) {
    return res.status(400).render('contact', { title: 'Contacto', error: 'Completa todos los campos con un correo válido y respeta las longitudes máximas.', values });
  }
  messages.push(values);
  console.log('Mensaje recibido:', values);
  res.redirect('/admin');
};
const admin = (req, res) => res.render('admin', { title: 'Mensajes recibidos', messages });
module.exports = { home, about, contact, saveContact, admin };
