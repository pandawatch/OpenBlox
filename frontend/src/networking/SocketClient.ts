import { io, type Socket } from 'socket.io-client'
import type { JoinWorldRequest, PlayerSnapshot, WorldSnapshot } from '@openblox/shared-types'

export class SocketClient {
  private readonly socket: Socket

  constructor(url = import.meta.env.VITE_API_URL ?? 'http://localhost:3001') {
    this.socket = io(url, { autoConnect: false })
  }

  connect(): void {
    this.socket.connect()
  }

  disconnect(): void {
    this.socket.disconnect()
  }

  onReady(listener: (socketId: string) => void): () => void {
    const handleReady = () => listener(this.socket.id ?? '')
    this.socket.on('server:ready', handleReady)
    return () => this.socket.off('server:ready', handleReady)
  }

  onWorldSnapshot(listener: (snapshot: WorldSnapshot) => void): () => void {
    this.socket.on('world:snapshot', listener)
    return () => this.socket.off('world:snapshot', listener)
  }

  joinWorld(request: JoinWorldRequest): void {
    this.socket.emit('world:join', request)
  }

  sendPosition(position: PlayerSnapshot['position']): void {
    this.socket.emit('player:position', { position })
  }
}
