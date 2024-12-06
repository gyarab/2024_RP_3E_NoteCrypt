import prisma from '$lib/prisma';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
  signUp: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const pwHash = data.get('pwHash');
    const name = data.get('name');

    console.log(name, email, pwHash);

    if (!email || !pwHash || !name) {
      return fail(400);
    }

    await prisma.user.create({
      data: {
        email: email as string,
        name: name as string,
        pwHash: pwHash as string
      }
    });
  }
} satisfies Actions;
