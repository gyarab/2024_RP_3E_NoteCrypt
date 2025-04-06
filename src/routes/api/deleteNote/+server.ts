
import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { unlink } from 'node:fs/promises';

export const DELETE: RequestHandler = async (event) => {
  const user = event.locals.user;
  const noteId = event.url.searchParams.get('noteId');

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

  await prisma.note.delete({
    where: {
      id: noteId
    }
  });

  try {
    await unlink(`notes/${noteId}.txt`);
    return json({ msg: 'ok' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return json({ msg: 'noteNotFound' });
  }

};
