import type { JoinWorldRequest, PlayerSnapshot, Vector3, WorldSnapshot } from '@openblox/shared-types'

export class RoomManager {
  private readonly rooms = new Map<string, Map<string, PlayerSnapshot>>()

  join(socketId: string, request: JoinWorldRequest): WorldSnapshot {
    const room = this.rooms.get(request.worldId) ?? new Map<string, PlayerSnapshot>()
    room.set(socketId, { id: socketId, name: request.name, color: request.color, position: [0, 1, 0] })
    this.rooms.set(request.worldId, room)
    return this.snapshot(request.worldId)
  }

  updatePosition(worldId: string, socketId: string, position: Vector3): WorldSnapshot | undefined {
    const player = this.rooms.get(worldId)?.get(socketId)
    if (!player) return undefined
    player.position = position
    return this.snapshot(worldId)
  }

  leave(socketId: string, worldId: string): WorldSnapshot | undefined {
    const room = this.rooms.get(worldId)
    if (!room) return undefined
    room.delete(socketId)
    if (room.size === 0) this.rooms.delete(worldId)
    return room.size > 0 ? this.snapshot(worldId) : undefined
  }

  private snapshot(worldId: string): WorldSnapshot {
    return { worldId, players: [...(this.rooms.get(worldId)?.values() ?? [])] }
  }
}
