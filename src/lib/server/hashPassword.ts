import bcryptjs from 'bcryptjs';
const { genSalt, hash } = bcryptjs;

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
