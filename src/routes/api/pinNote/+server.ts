import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';

export const GET: RequestHandler = async (event) => {
  const user = event.locals.user;
  const noteId = event.url.searchParams.get('noteId');
  const pinned = event.url.searchParams.get('pinned');

  console.log(event.url.searchParams);

  if (!user) {
    return json({ msg: 'notLoggedIn' });
  }
  if (!noteId) {
    return json({ msg: 'noteIdMissing' });
  }
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: user.id
    }
  });
  if (!note) {
    return json({ msg: 'noteNotFound' });
  }

  await prisma.note.update({
    where: {
      id: noteId,
      userId: user.id
    },
    data: {
      pinned: pinned === 'true'
    }
  });

  return json({ msg: 'ok' });
};
