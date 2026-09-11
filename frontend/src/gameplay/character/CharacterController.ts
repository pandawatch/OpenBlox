export type MovementInput = {
  forward: number
  right: number
}

export type CharacterState = {
  position: [number, number, number]
  velocity: [number, number, number]
  grounded: boolean
}

export class CharacterController {
  private state: CharacterState = {
    position: [0, 1, 0],
    velocity: [0, 0, 0],
    grounded: true,
  }

  getState(): CharacterState {
    return {
      position: [...this.state.position] as [number, number, number],
      velocity: [...this.state.velocity] as [number, number, number],
      grounded: this.state.grounded,
    }
  }

  update(input: MovementInput, delta: number): CharacterState {
    const acceleration = 24
    const maxSpeed = 5
    const damping = Math.min(1, delta * 10)
    const gravity = 22
    const horizontalLength = Math.hypot(input.forward, input.right) || 1
    const targetX = (input.right / horizontalLength) * maxSpeed * Math.min(1, Math.hypot(input.forward, input.right))
    const targetZ = (input.forward / horizontalLength) * maxSpeed * Math.min(1, Math.hypot(input.forward, input.right))

    this.state.velocity[0] += (targetX - this.state.velocity[0]) * Math.min(1, acceleration * delta)
    this.state.velocity[2] += (targetZ - this.state.velocity[2]) * Math.min(1, acceleration * delta)
    if (input.forward === 0 && input.right === 0) {
      this.state.velocity[0] *= 1 - damping
      this.state.velocity[2] *= 1 - damping
    }

    this.state.velocity[1] -= gravity * delta
    this.state.position[0] += this.state.velocity[0] * delta
    this.state.position[1] += this.state.velocity[1] * delta
    this.state.position[2] += this.state.velocity[2] * delta

    if (this.state.position[1] <= 1) {
      this.state.position[1] = 1
      this.state.velocity[1] = 0
      this.state.grounded = true
    } else {
      this.state.grounded = false
    }

    return this.getState()
  }
}
