import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Post from '../src/models/Post.js';

test('User exige mayoría de edad y contraseña de ocho caracteres', () => {
  for (const age of [17, undefined]) assert.ok(new User({ age, password: '12345678' }).validateSync()?.errors.age);
  for (const password of ['1234567', undefined]) assert.ok(new User({ age: 18, password }).validateSync()?.errors.password);
  const user = new User({ age: 18, password: '12345678', phoneNumber: '900000001' });
  assert.equal(user.validateSync(), undefined);
  assert.ok(user.createdAt instanceof Date);
});

test('Post aplica límites de título y contenido y fechas por defecto', () => {
  const valid = { title: '12345', content: '1234567890', user: new mongoose.Types.ObjectId() };
  for (const title of ['', '1234', 'x'.repeat(31)]) assert.ok(new Post({ ...valid, title }).validateSync()?.errors.title);
  for (const title of ['12345', 'x'.repeat(30)]) assert.equal(new Post({ ...valid, title }).validateSync(), undefined);
  for (const content of ['', '123456789']) assert.ok(new Post({ ...valid, content }).validateSync()?.errors.content);
  const post = new Post({ ...valid, hashtags: ['nodejs', 'mongodb'] });
  assert.ok(post.createdAt instanceof Date);
  assert.equal(post.updatedAt, undefined);
  assert.deepEqual([...post.hashtags], ['nodejs', 'mongodb']);
});

test('Post rechaza protocolos de imagen distintos de http y https', () => {
  const post = new Post({ title: 'Título válido', content: 'Contenido de prueba', user: new mongoose.Types.ObjectId(), imageUrl: 'javascript:alert(1)' });
  assert.ok(post.validateSync()?.errors.imageUrl);
});
