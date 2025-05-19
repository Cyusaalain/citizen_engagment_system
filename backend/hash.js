// File: hash.js

import bcrypt from 'bcrypt';

const  regis = '12345';

const hashPassword = async () => {
  const hash = await bcrypt.hash('regis', 10);
  console.log('✅ Bcrypt hash:\n\n', hash, '\n');
};

hashPassword();