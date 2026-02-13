'use client';

import { Box } from 'lucide-react';

export function ThreeDViewer() {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--brown-medium)]/10 to-[var(--green-sage)]/10 border-2 border-dashed border-[var(--tan-light)] flex items-center justify-center">
      <div className="text-center p-8">
        <Box
          size={64}
          className="text-[var(--green-deep)] mx-auto mb-4 animate-pulse"
          strokeWidth={1.5}
        />
        <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--brown-deep)] font-semibold mb-2">
          Interactive 3D Model
        </h3>
        <p className="text-[var(--text-body)] text-sm max-w-md">
          Drag to rotate • Scroll to zoom
        </p>
        <p className="text-[var(--text-body)]/60 text-xs mt-2">
          (React Three Fiber integration placeholder - load .glb model from Sketchfab)
        </p>
      </div>
    </div>
  );
}

// Example implementation with React Three Fiber (commented out):
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
//
// function Model() {
//   const { scene } = useGLTF('/path-to-model.glb');
//   return <primitive object={scene} />;
// }
//
// export function ThreeDViewer() {
//   return (
//     <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
//       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//         <Model />
//         <OrbitControls
//           enableZoom={true}
//           enablePan={false}
//           minDistance={3}
//           maxDistance={10}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </div>
//   );
// }
