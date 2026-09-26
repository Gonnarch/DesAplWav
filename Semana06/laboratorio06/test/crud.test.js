import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import app from '../src/server.js';
import User from '../src/models/User.js';
import Post from '../src/models/Post.js';

test('CRUD HTTP con persistencia real, relaciones y validación en edición', { skip: !process.env.TEST_MONGO_URI }, async () => {
  // Base exclusiva creada por esta prueba; no toca la base socialmedia.
  await mongoose.connect(process.env.TEST_MONGO_URI, { dbName: 'semana06_test_' + Date.now() });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const send = (url, data) => fetch(origin + url, { method: 'POST', redirect: 'manual', body: new URLSearchParams(data) });
  try {
    await User.init();
    const user = await User.create({ name: 'Test', lastName: 'Uno', email: 'test@example.com', age: 18, password: '12345678' });
    const second = await User.create({ name: 'Test', lastName: 'Dos', email: 'second@example.com', age: 20, password: 'abcdefgh' });
    await assert.rejects(User.create({ email: 'test@example.com', age: 18, password: '12345678' }), { code: 11000 });
    assert.notEqual((await User.findById(user.id).select('+password')).password, '12345678');
    assert.equal((await User.findById(user.id)).password, undefined);
    assert.equal((await fetch(origin + '/')).status, 200);
    assert.match(await (await fetch(origin + '/posts')).text(), /Aún no hay publicaciones/);
    const data = { userId: user.id, title: 'Prueba CRUD', content: 'Contenido original de prueba', hashtags: '#nodejs, mongodb #nodejs', imageUrl: '' };
    assert.equal((await send('/posts', data)).status, 303);
    const post = await Post.findOne({ title: data.title });
    assert.ok(post);
    assert.deepEqual([...post.hashtags], ['nodejs', 'mongodb']);
    assert.equal((await Post.findById(post.id).populate('user')).user.name, 'Test');
    assert.equal((await fetch(origin + '/posts/' + post.id + '/edit')).status, 200);
    assert.equal((await send('/posts/' + post.id + '/update', { ...data, title: 'mal' })).status, 400);
    assert.equal((await Post.findById(post.id)).title, data.title);
    assert.equal((await send('/posts', { ...data, userId: new mongoose.Types.ObjectId().toString() })).status, 400);
    assert.equal((await send('/posts', { ...data, userId: 'invalido' })).status, 400);
    assert.equal((await send('/posts', { ...data, content: 'corto' })).status, 400);
    assert.equal((await send('/posts', { ...data, imageUrl: 'javascript:alert(1)' })).status, 400);
    assert.equal((await send('/posts/' + post.id + '/update', { ...data, userId: second.id, title: 'Título actualizado', content: '<script>alert(1)</script>', imageUrl: 'https://example.com/test.png', hashtags: 'editado' })).status, 303);
    const updated = await Post.findById(post.id);
    assert.equal(updated.user.toString(), second.id);
    assert.equal(updated.imageUrl, 'https://example.com/test.png');
    assert.deepEqual([...updated.hashtags], ['editado']);
    assert.ok(updated.updatedAt instanceof Date);
    assert.equal(updated.createdAt.getTime(), post.createdAt.getTime());
    const html = await (await fetch(origin + '/posts')).text();
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(!html.includes('<script>alert(1)</script>'));
    assert.equal((await fetch(origin + '/posts/' + post.id + '/delete')).status, 404);
    assert.equal((await send('/posts/' + post.id + '/delete', {})).status, 303);
    assert.equal(await Post.findById(post.id), null);
    assert.equal((await fetch(origin + '/posts/' + post.id + '/edit')).status, 404);
    assert.equal((await send('/posts/' + post.id + '/delete', {})).status, 404);
    assert.equal((await fetch(origin + '/posts/not-an-id/edit')).status, 400);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});
