// File: hash.js

import bcrypt from 'bcrypt';

const raw = '12345'; // replace with your real admin password

const hashPassword = async () => {
  const hash = await bcrypt.hash(raw, 10);
  console.log('✅ Bcrypt hash:\n\n', hash, '\n');
};

hashPassword();