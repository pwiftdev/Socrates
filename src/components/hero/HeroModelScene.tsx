import { Center, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import { useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'
import { HERO_MODEL_PATH } from '@/lib/constants'
import { heroScrollEase, HeroCamera } from './HeroCamera'

useGLTF.preload(HERO_MODEL_PATH)

const TARGET_HEIGHT = 1.05
const TARGET_SWEEP = 0.52

/** Base orientation so the bust faces the camera at scroll midpoint */
const FACE_CAMERA_Y = Math.PI

function ScrollDrivenRotation({
  scrollProgress,
  rotationFrom,
  rotationTo,
  children,
}: {
  scrollProgress: MotionValue<number>
  rotationFrom: number
  rotationTo: number
  children: ReactNode
}) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const t = heroScrollEase(scrollProgress.get())
    groupRef.current.rotation.y =
      FACE_CAMERA_Y + rotationFrom + (rotationTo - rotationFrom) * t
  })

  return <group ref={groupRef}>{children}</group>
}

/** Slide mesh within the canvas so the bust hugs the viewport edge, not the canvas center */
function ScrollDrivenPan({
  scrollProgress,
  panFrom,
  panTo,
  children,
}: {
  scrollProgress: MotionValue<number>
  panFrom: number
  panTo: number
  children: ReactNode
}) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const t = heroScrollEase(scrollProgress.get())
    groupRef.current.position.x = panFrom + (panTo - panFrom) * t
  })

  return <group ref={groupRef}>{children}</group>
}

function normalizeScene(scene: THREE.Group) {
  const clone = scene.clone(true)

  let box = new THREE.Box3().setFromObject(clone)
  let size = box.getSize(new THREE.Vector3())

  const isFlat = size.y < size.x * 0.6 && size.y < size.z * 0.6
  if (isFlat) {
    if (size.z >= size.x) {
      clone.rotation.x = -Math.PI / 2
    } else {
      clone.rotation.z = Math.PI / 2
    }
    clone.updateMatrixWorld(true)
    box = new THREE.Box3().setFromObject(clone)
    size = box.getSize(new THREE.Vector3())
  }

  const center = box.getCenter(new THREE.Vector3())
  clone.position.sub(center)

  const height = size.y > 0 ? size.y : 1
  const sweep = Math.hypot(size.x, size.z) || 1
  const scale = Math.min(TARGET_HEIGHT / height, TARGET_SWEEP / sweep)
  clone.scale.setScalar(scale)

  return clone
}

type SocratesStatueProps = {
  bustOffsetX?: number
  fitMargin?: number
  modelRotationY?: number
  scrollProgress?: MotionValue<number>
  scrollRotationFrom?: number
  scrollRotationTo?: number
  scrollPanFrom?: number
  scrollPanTo?: number
}

export function SocratesStatue({
  bustOffsetX = 0,
  fitMargin = 1.38,
  modelRotationY = 0,
  scrollProgress,
  scrollRotationFrom = -0.72,
  scrollRotationTo = 0.72,
  scrollPanFrom = -0.52,
  scrollPanTo = 0.52,
}: SocratesStatueProps) {
  const anchorRef = useRef<Group>(null)
  const { scene } = useGLTF(HERO_MODEL_PATH)
  const model = useMemo(() => normalizeScene(scene), [scene])

  const bust = <primitive object={model} />

  const statue = scrollProgress ? (
    <ScrollDrivenRotation
      scrollProgress={scrollProgress}
      rotationFrom={scrollRotationFrom}
      rotationTo={scrollRotationTo}
    >
      {bust}
    </ScrollDrivenRotation>
  ) : (
    <group rotation={[0, FACE_CAMERA_Y + modelRotationY, 0]}>{bust}</group>
  )

  return (
    <>
      <HeroCamera
        target={anchorRef}
        fitMargin={fitMargin}
        scrollProgress={scrollProgress}
      />
      {scrollProgress ? (
        <ScrollDrivenPan
          scrollProgress={scrollProgress}
          panFrom={scrollPanFrom}
          panTo={scrollPanTo}
        >
          <group ref={anchorRef}>
            <Center>{statue}</Center>
          </group>
        </ScrollDrivenPan>
      ) : (
        <group ref={anchorRef} position={[bustOffsetX, 0, 0]}>
          <Center>{statue}</Center>
        </group>
      )}
    </>
  )
}
