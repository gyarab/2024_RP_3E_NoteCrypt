import bcrypt from 'bcryptjs';

export async function saltAndHashPassword(password: string): Promise<string | null> {
  if (!password) return null;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
