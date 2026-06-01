import { useFrame, useThree } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import { useLayoutEffect, type RefObject } from 'react'
import * as THREE from 'three'

export function heroScrollEase(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

type HeroCameraProps = {
  target: RefObject<THREE.Object3D | null>
  fitMargin?: number
  /** When set, re-fit every frame while the bust rotates in world space */
  scrollProgress?: MotionValue<number>
}

const FOV_DEG = 40

export function fitCameraToTarget(
  camera: THREE.PerspectiveCamera,
  target: THREE.Object3D,
  viewport: { width: number; height: number },
  fitMargin: number,
) {
  target.updateWorldMatrix(true, true)
  const box = new THREE.Box3().setFromObject(target)
  const size = box.getSize(new THREE.Vector3())

  if (size.length() < 0.001) return false

  const center = box.getCenter(new THREE.Vector3())
  const lookY = center.y

  const fovRad = (FOV_DEG * Math.PI) / 180
  const halfFovTan = Math.tan(fovRad / 2)
  const aspect = viewport.width / viewport.height
  const m = fitMargin

  const distForHeight = ((size.y * 0.5) / halfFovTan) * m
  const distForWidth = ((size.x * 0.5) / (halfFovTan * aspect)) * m
  const distForDepth = ((Math.hypot(size.x, size.z) * 0.5) / halfFovTan) * m
  const distance = Math.max(distForHeight, distForWidth, distForDepth)

  camera.position.set(center.x, lookY, center.z + distance)
  camera.lookAt(center.x, lookY, center.z)
  camera.fov = FOV_DEG
  camera.near = 0.01
  camera.far = 200
  camera.updateProjectionMatrix()
  return true
}

export function HeroCamera({
  target,
  fitMargin = 1.38,
  scrollProgress,
}: HeroCameraProps) {
  const camera = useThree((state) => state.camera)
  const viewport = useThree((state) => state.size)

  useLayoutEffect(() => {
    if (scrollProgress) return
    if (!(camera instanceof THREE.PerspectiveCamera)) return

    let cancelled = false
    let attempts = 0

    const tryFit = () => {
      if (cancelled) return

      if (!target.current || viewport.width < 1 || viewport.height < 1) {
        if (attempts++ < 60) requestAnimationFrame(tryFit)
        return
      }

      const ok = fitCameraToTarget(
        camera,
        target.current,
        viewport,
        fitMargin,
      )
      if (!ok && attempts++ < 60) requestAnimationFrame(tryFit)
    }

    tryFit()

    return () => {
      cancelled = true
    }
  }, [camera, target, fitMargin, scrollProgress, viewport.width, viewport.height])

  useFrame(() => {
    if (!scrollProgress) return
    if (!(camera instanceof THREE.PerspectiveCamera) || !target.current) return
    if (viewport.width < 1 || viewport.height < 1) return

    fitCameraToTarget(camera, target.current, viewport, fitMargin)
  })

  return null
}
