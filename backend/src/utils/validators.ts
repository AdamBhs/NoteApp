import bcrypt from 'bcryptjs';

export const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error comparing passwords: ', error);
    return;
  }
};

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 5);
  } catch (error) {
    console.error('Error hashing password: ', error);
    return;
  }
};
