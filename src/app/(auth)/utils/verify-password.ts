import { verify } from '@node-rs/argon2';

export const verifyPassword = async (
  passwordHash: string,
  password: string,
) => {
  return await verify(passwordHash, password);
};
