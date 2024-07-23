"use client";
import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import AllSections from './AllSections';

const LandingPage = () => {
  return (
    <div className='w-full h-full bg-transparent fixed top-0 bottom-0 left-0 right-0 z-20'>
      <Canvas>
        <ambientLight intensity={0.5} color={new THREE.Color('#ffffff')} />
        <directionalLight intensity={0.1} color={new THREE.Color('#ffffff')} position={[0.25, 0.25, 0.25]} />
        <spotLight position={[0, 2, 0]} angle={10.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />

        <ScrollControls pages={5} damping={0.25}>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <AllSections />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default LandingPage