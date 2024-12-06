import prisma from '$lib/prisma';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Your own logic for dealing with plaintext password strings; be careful!

async function getUserFromDb(email: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      email: email as string
    }
  });
  return user;
}

export const { signIn, signOut, handle } = SvelteKitAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        user = await getUserFromDb(credentials.email as string);

        if (!user) {
          // Optionally, this is also the place you could do a user registration
          throw new Error('Unregistered email.');
        }

        const isPwCorrect = await bcrypt.compare(credentials.password as string, user.pwHash);

        if (!isPwCorrect) {
          throw new Error('Invalid credentials.');
        }

        // return JSON object with the user data
        return user;
      }
    })
  ]
});
