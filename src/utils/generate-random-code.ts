import type { RandomReader } from '@oslojs/crypto/random';
import { generateRandomString } from '@oslojs/crypto/random';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  },
};

export const generateRandomCode = () => {
  return generateRandomString(random, alphabet, 8);
};
