import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';
import { writeFile } from 'node:fs/promises';

export const load: PageServerLoad = async (event) => {
  const userNotes = await prisma.note.findMany({
    where: {
      userId: event.locals.user?.id
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return { user: event.locals.user, notes: userNotes };
};

export const actions: Actions = {
  save: async (event) => {
    const formData = await event.request.formData();

    const title = formData.get('title');
    const encryptedContent = formData.get('content');
    const encrypted = formData.get('encrypted');
    const id = formData.get('id');

    const uuid = crypto.randomUUID();

    if (!title || !encryptedContent || !event.locals.user) {
      return fail(400, { msg: 'missingFields' });
    }

    if (id) {
      console.log('updating', id);

      const note = await prisma.note.findUnique({
        where: {
          id: id as string,
          userId: event.locals.user.id
        }
      });

      if (!note) {
        return fail(400, { msg: 'noteNotFound' });
      }

      await prisma.note.update({
        where: {
          id: id as string
        },
        data: {
          title: title as string,
          encrypted: encrypted === 'true'
        }
      });

      await writeFile(`./notes/${id}.txt`, encryptedContent as string);

      return { msg: 'ok' };
    }

    await prisma.note.create({
      data: {
        id: uuid,
        title: title as string,
        encrypted: encrypted === 'true',
        userId: event.locals.user.id
      }
    });

    await writeFile(`./notes/${uuid}.txt`, encryptedContent as string);

    return { msg: 'ok' };
  }
};
