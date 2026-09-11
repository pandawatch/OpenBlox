import { useEffect, useState } from 'react'
import type { MovementInput } from '../character/CharacterController'

const keyMap: Record<string, keyof MovementInput> = {
  ArrowUp: 'forward',
  KeyW: 'forward',
  ArrowDown: 'forward',
  KeyS: 'forward',
  ArrowLeft: 'right',
  KeyA: 'right',
  ArrowRight: 'right',
  KeyD: 'right',
}

export function useMovementInput(): MovementInput {
  const [pressedKeys, setPressedKeys] = useState(() => new Set<string>())

  useEffect(() => {
    const handleKeyChange = (event: KeyboardEvent, pressed: boolean) => {
      if (!keyMap[event.code]) return
      event.preventDefault()
      setPressedKeys((current) => {
        const next = new Set(current)
        if (pressed) next.add(event.code)
        else next.delete(event.code)
        return next
      })
    }

    const onKeyDown = (event: KeyboardEvent) => handleKeyChange(event, true)
    const onKeyUp = (event: KeyboardEvent) => handleKeyChange(event, false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return {
    forward: Number(pressedKeys.has('KeyW') || pressedKeys.has('ArrowUp')) - Number(pressedKeys.has('KeyS') || pressedKeys.has('ArrowDown')),
    right: Number(pressedKeys.has('KeyD') || pressedKeys.has('ArrowRight')) - Number(pressedKeys.has('KeyA') || pressedKeys.has('ArrowLeft')),
  }
}
