import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
  return { user: event.locals.user };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(400);
    }

    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    redirect(302, '/auth/signin');
  }
};
