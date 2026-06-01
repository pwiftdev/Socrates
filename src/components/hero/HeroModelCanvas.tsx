import { Canvas } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import { Suspense } from 'react'
import { SocratesStatue } from './HeroModelScene'

export type HeroModelCanvasProps = {
  className?: string
  bustOffsetX?: number
  /** Brighter marble lighting (philosopher stage) */
  bright?: boolean
  fitMargin?: number
  modelRotationY?: number
  scrollProgress?: MotionValue<number>
  scrollRotationFrom?: number
  scrollRotationTo?: number
  scrollPanFrom?: number
  scrollPanTo?: number
}

export function HeroModelCanvas({
  className = '',
  bustOffsetX = 0,
  bright = false,
  fitMargin = 1.38,
  modelRotationY = 0,
  scrollProgress,
  scrollRotationFrom,
  scrollRotationTo,
  scrollPanFrom,
  scrollPanTo,
}: HeroModelCanvasProps) {
  return (
    <div
      className={`bg-transparent ${className || 'h-full w-full'}`}
      aria-hidden
    >
      <Canvas
        className="touch-none size-full !bg-transparent"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          premultipliedAlpha: true,
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.domElement.style.background = 'transparent'
        }}
      >
        <ambientLight
          intensity={bright ? 0.62 : 0.35}
          color="#e8e6e1"
        />
        <directionalLight
          position={[4, 6, 5]}
          intensity={bright ? 2 : 1.4}
          color="#f5f3ef"
        />
        <directionalLight
          position={[-4, 2, -2]}
          intensity={bright ? 0.75 : 0.45}
          color="#d8d8de"
        />
        <directionalLight
          position={[0, 0, 6]}
          intensity={bright ? 0.5 : 0.25}
          color="#e8e6e1"
        />
        <Suspense fallback={null}>
          <SocratesStatue
            bustOffsetX={bustOffsetX}
            fitMargin={fitMargin}
            modelRotationY={modelRotationY}
            scrollProgress={scrollProgress}
            scrollRotationFrom={scrollRotationFrom}
            scrollRotationTo={scrollRotationTo}
            scrollPanFrom={scrollPanFrom}
            scrollPanTo={scrollPanTo}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
