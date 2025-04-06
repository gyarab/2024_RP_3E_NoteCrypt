import prisma from '$lib/prisma';
import { fail, json, type RequestHandler } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';

export const GET: RequestHandler = async (event) => {
  const user = event.locals.user;
  const noteId = event.url.searchParams.get('noteId');

  if (!user) {
    return json({ success: false, text: 'notLoggedIn' });
  }
  if (!noteId) {
    return json({ success: false, text: 'noteIdMissing' });
  }
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: user.id
    }
  });
  if (!note) {
    return json({ success: false, content: 'noteNotFound' });
  }
  try {
    const noteText = await readFile(`notes/${noteId}.txt`, 'utf-8');
    return json({ success: true, content: noteText, title: note.title, id: note.id });
  } catch (error) {
    console.error('Error reading file:', error);
    return json({ success: false, content: 'noteNotFound' });
  }
};
