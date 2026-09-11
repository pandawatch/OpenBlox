import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Raycaster, Vector2 } from 'three'
import { CharacterController } from '../../gameplay/character/CharacterController'
import { useMovementInput } from '../../gameplay/input/useMovementInput'

type Target = { id: number; position: [number, number, number]; color: string; alive: boolean }
const startingTargets: Target[] = [
  { id: 1, position: [-5, 1.2, -8], color: '#ef3340', alive: true },
  { id: 2, position: [4, 1.5, -12], color: '#2672d8', alive: true },
  { id: 3, position: [8, 1.1, -5], color: '#ef3340', alive: true },
  { id: 4, position: [-8, 1.7, -15], color: '#2672d8', alive: true },
]

function LocalPlayer({ onPosition }: { onPosition: (position: [number, number, number]) => void }) {
  const controller = useRef(new CharacterController())
  const input = useMovementInput()
  const { camera } = useThree()
  const yaw = useRef(0)
  const pitch = useRef(0)
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== document.body) return
      yaw.current -= event.movementX * 0.0025
      pitch.current = Math.max(-1.35, Math.min(1.35, pitch.current - event.movementY * 0.0025))
    }
    document.addEventListener('mousemove', onMouseMove)
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])
  useFrame((_, delta) => {
    const state = controller.current.update({ forward: input.forward * Math.cos(yaw.current) + input.right * Math.sin(yaw.current), right: input.right * Math.cos(yaw.current) - input.forward * Math.sin(yaw.current) }, Math.min(delta, 0.05))
    camera.position.set(state.position[0], 1.65, state.position[2])
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
    onPosition(state.position)
  })
  return null
}

function Arena({ targets, onShoot, onPosition }: { targets: Target[]; onShoot: (id: number) => void; onPosition: (position: [number, number, number]) => void }) {
  const { camera, scene } = useThree()
  const raycaster = useRef(new Raycaster())
  useEffect(() => {
    const shoot = () => {
      raycaster.current.setFromCamera(new Vector2(0, 0), camera)
      const hit = raycaster.current.intersectObjects(scene.children, true).find((item) => item.object.userData.targetId)
      if (hit?.object.userData.targetId) onShoot(hit.object.userData.targetId as number)
    }
    const onClick = () => { document.body.requestPointerLock(); shoot() }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [camera, onShoot, scene])
  return <><LocalPlayer onPosition={onPosition} />{targets.filter((target) => target.alive).map((target) => <group key={target.id} position={target.position}><mesh userData={{ targetId: target.id }} castShadow><boxGeometry args={[1.3, 2.2, 0.65]} /><meshStandardMaterial color={target.color} roughness={0.65} /></mesh><mesh position={[0, 1.5, 0]} userData={{ targetId: target.id }} castShadow><boxGeometry args={[0.85, 0.85, 0.85]} /><meshStandardMaterial color="#e9b18f" roughness={0.9} /></mesh></group>)}<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[50, 50]} /><meshStandardMaterial color="#303b51" roughness={1} /></mesh><mesh position={[0, 5, -20]}><boxGeometry args={[32, 10, 1]} /><meshStandardMaterial color="#202a3e" /></mesh><mesh position={[-14, 3, -8]}><boxGeometry args={[1, 6, 22]} /><meshStandardMaterial color="#3e4a62" /></mesh><mesh position={[14, 3, -8]}><boxGeometry args={[1, 6, 22]} /><meshStandardMaterial color="#3e4a62" /></mesh></>
+}
+
+export function PlayWorld({ worldName, onExit }: { worldName: string; onExit: () => void }) {
+  const [targets, setTargets] = useState(startingTargets)
+  const [score, setScore] = useState(0)
+  const [ammo, setAmmo] = useState(12)
+  const [position, setPosition] = useState<[number, number, number]>([0, 1, 0])
+  const handleShoot = (id: number) => { if (ammo <= 0) return; setAmmo((value) => value - 1); setTargets((current) => current.map((target) => target.id === id ? { ...target, alive: false } : target)); setScore((value) => value + 1) }
+  return <div className="fps-game" onContextMenu={(event) => event.preventDefault()}><Canvas camera={{ position: [0, 1.65, 5], fov: 78 }} shadows><color attach="background" args={['#91a7c2']} /><ambientLight intensity={1.2} /><directionalLight position={[-4, 10, 4]} intensity={2.4} castShadow /><Arena targets={targets} onShoot={handleShoot} onPosition={setPosition} /></Canvas><div className="fps-topbar"><span className="fps-brand">OPENBLOX <b>/</b> {worldName}</span><span className="fps-round">ROUND 01 &nbsp; | &nbsp; 1V1</span><button className="fps-exit" type="button" onClick={() => { document.exitPointerLock(); onExit() }}>LEAVE</button></div><div className="crosshair"><i /><i /><i /><i /><b>+</b></div><div className="fps-hud"><div className="health"><span>HEALTH</span><strong>100</strong><div><i /></div></div><div className="weapon"><span>RIFLE</span><strong>{String(ammo).padStart(2, '0')} <small>/ 12</small></strong><button type="button" onClick={() => setAmmo(12)}>R RELOAD</button></div></div><div className="scoreboard"><span>YOU</span><strong>{score}</strong><em>:</em><strong>0</strong><span>RIVAL</span></div><div className="fps-hint">CLICK TO AIM &nbsp; • &nbsp; WASD TO MOVE &nbsp; • &nbsp; CLICK TO FIRE &nbsp; • &nbsp; {Math.round(position[0])}, {Math.round(position[2])}</div>{targets.every((target) => !target.alive) && <div className="round-won"><strong>ROUND WON</strong><span>All rivals eliminated</span><button type="button" onClick={() => { setTargets(startingTargets); setScore(0); setAmmo(12) }}>PLAY AGAIN</button></div>}</div>
+}
