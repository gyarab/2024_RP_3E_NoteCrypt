import prisma from '$lib/prisma';
import { lucia } from '$lib/server/auth';
import { hashPassword } from '$lib/server/hashPassword';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      return fail(400, { msg: 'passwordsDontMatch' });
    }

    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hashPassword(password as string);

    await prisma.user.create({
      data: {
        id: userId,
        email: email as string,
        username: username as string,
        passwordHash: passwordHash as string
      }
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    redirect(302, '/home');
  }
};
