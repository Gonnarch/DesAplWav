const { test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');
test('Flujos del laboratorio: navegación, contacto, registros, validación y 404', async () => {
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, data) => fetch(base + path, { method: 'POST', body: new URLSearchParams(data), redirect: 'manual' });
  try {
    for (const path of ['/', '/about', '/contact', '/admin', '/games']) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200);
      assert.match(await response.text(), /href="\/games"/);
    }
    let response = await post('/contact', { nombre: 'Prueba', email: 'prueba@example.com', mensaje: '<script>alert(1)</script>' });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), '/admin');
    let html = await (await fetch(base + '/admin')).text();
    assert.match(html, /&lt;script&gt;/);
    assert.doesNotMatch(html, /<script>alert/);
    assert.equal((await post('/contact', { nombre: 'Prueba', email: 'invalido', mensaje: 'Hola' })).status, 400);
    assert.equal((await post('/games', { nombre: 'Portal 2', genero: 'Puzles', plataforma: 'PC', desarrollador: 'Valve', anio: '2011' })).status, 302);
    html = await (await fetch(base + '/games')).text();
    assert.match(html, /<td>Portal 2<\/td>/);
    assert.match(html, /<td>2011<\/td>/);
    assert.equal((await post('/games', { nombre: 'Incompleto' })).status, 400);
    assert.equal((await post('/games', { nombre: 'Juego', genero: 'RPG', plataforma: 'PC', desarrollador: 'Estudio', anio: 'abc' })).status, 400);
    response = await fetch(base + '/ruta-inexistente');
    assert.equal(response.status, 404);
    assert.match(await response.text(), /ruta-inexistente/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
