export type Vector3 = [number, number, number]

export type PlayerSnapshot = {
  id: string
  name: string
  position: Vector3
  color: string
}

export type WorldSnapshot = {
  worldId: string
  players: PlayerSnapshot[]
}

export type JoinWorldRequest = {
  worldId: string
  name: string
  color: string
}
