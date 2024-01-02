import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'


// Forwards the event to all clients
export async function POST(req: Request) {
  const { text, roomId } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)

  // Make chats persistent, works also without it, but only until the page gets refreshed
  await db.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  })

  return new Response(JSON.stringify({ success: true }))
}
