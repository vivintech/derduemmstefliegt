import { db } from '@/lib/db'

export async function GET() {
  // Creating an empty record on db and returning the id of it
  const createdRoom = await db.chatRoom.create({
    data: {},
  })

  return new Response(createdRoom.id)
}
