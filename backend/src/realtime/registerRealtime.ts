import type { Server, Socket } from 'socket.io'
import type { JoinWorldRequest, Vector3 } from '@openblox/shared-types'
import { RoomManager } from './RoomManager.js'

export function registerRealtime(io: Server): void {
  const rooms = new RoomManager()
  const playerWorlds = new Map<string, string>()

  io.on('connection', (socket: Socket) => {
    socket.emit('server:ready', { id: socket.id, message: 'OpenBlox server connected' })

    socket.on('world:join', (request: JoinWorldRequest) => {
      playerWorlds.set(socket.id, request.worldId)
      socket.join(request.worldId)
      io.to(request.worldId).emit('world:snapshot', rooms.join(socket.id, request))
    })

    socket.on('player:position', ({ position }: { position: Vector3 }) => {
      const worldId = playerWorlds.get(socket.id)
      if (!worldId) return
      const boundedPosition: Vector3 = [
        clamp(position[0], -16, 16),
        clamp(position[1], 1, 20),
        clamp(position[2], -16, 16),
      ]
      const snapshot = rooms.updatePosition(worldId, socket.id, boundedPosition)
      if (snapshot) io.to(worldId).emit('world:snapshot', snapshot)
    })

    socket.on('disconnect', () => {
      const worldId = playerWorlds.get(socket.id)
      if (!worldId) return
      playerWorlds.delete(socket.id)
      const snapshot = rooms.leave(socket.id, worldId)
      if (snapshot) io.to(worldId).emit('world:snapshot', snapshot)
    })
  })
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Number.isFinite(value) ? Math.min(maximum, Math.max(minimum, value)) : minimum
}
