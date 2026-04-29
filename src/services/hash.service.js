import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  if (!password) throw new Error('Password is required for hashing');
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain, hashed) => {
  if (!plain || !hashed) return false;
  return await bcrypt.compare(plain, hashed);
};

export default { hashPassword, comparePassword };
