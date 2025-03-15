import prisma from '$lib/prisma';
import { lucia } from '$lib/server/auth';
import { fail, type Actions } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';
const { compare } = bcryptjs;

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const user = await prisma.user.findFirst({
      where: {
        email: email as string
      }
    });

    if (!user) return fail(400, { msg: 'userNotFound' });

    const passwordMatch = await compare(password as string, user.passwordHash);

    if (!passwordMatch) {
      return fail(400, { msg: 'incorrectPassword' });
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    return { msg: 'ok' };
  }
};
