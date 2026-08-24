const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = Number(process.env.PORT || 4000);
const dataDirectory = path.join(__dirname, 'data');
fs.mkdirSync(dataDirectory, { recursive: true });
const database = new Database(path.join(dataDirectory, 'ridetrack.db'));
database.pragma('journal_mode = WAL');
database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mobile TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

app.use(cors());
app.use(express.json());

const userResponse = (user) => ({
  id: user.id,
  fullName: user.full_name,
  email: user.email,
  mobile: user.mobile,
  createdAt: user.created_at,
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/auth/register', async (request, response) => {
  const fullName = String(request.body?.fullName || '').trim();
  const email = String(request.body?.email || '').trim().toLowerCase();
  const mobile = String(request.body?.mobile || '').trim();
  const password = String(request.body?.password || '').trim();

  if (!fullName) {
    return response.status(400).json({ message: 'Full name is required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!/^\+?[0-9]{9,15}$/.test(mobile)) {
    return response.status(400).json({ message: 'Please enter a valid mobile number.' });
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  const existingUser = database
    .prepare('SELECT email, mobile FROM users WHERE email = ? OR mobile = ?')
    .get(email, mobile);

  if (existingUser) {
    const duplicateField = existingUser.email === email ? 'email address' : 'mobile number';
    return response.status(409).json({ message: `An account already exists for this ${duplicateField}.` });
  }

  const user = {
    id: crypto.randomUUID(),
    full_name: fullName,
    email,
    mobile,
    password_hash: await bcrypt.hash(password, 12),
    created_at: new Date().toISOString(),
  };

  database
    .prepare(
      `INSERT INTO users (id, full_name, email, mobile, password_hash, created_at)
       VALUES (@id, @full_name, @email, @mobile, @password_hash, @created_at)`
    )
    .run(user);

  return response.status(201).json({
    user: userResponse(user),
    token: crypto.randomBytes(32).toString('hex'),
  });
});

app.post('/api/auth/login', async (request, response) => {
  const identifier = String(request.body?.identifier || '').trim();
  const password = String(request.body?.password || '').trim();
  const email = identifier.toLowerCase();

  if (!identifier || !password) {
    return response.status(400).json({ message: 'Email/mobile and password are required.' });
  }

  const user = database
    .prepare('SELECT * FROM users WHERE email = ? OR mobile = ?')
    .get(email, identifier);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return response.status(401).json({ message: 'Invalid email/mobile or password.' });
  }

  return response.json({
    user: userResponse(user),
    token: crypto.randomBytes(32).toString('hex'),
  });
});

app.listen(port, () => {
  console.log(`RideTrack API listening on http://localhost:${port}`);
});
