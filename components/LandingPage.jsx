"use client";
import { PresentationControls, Scroll, ScrollControls, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import AllSections from './AllSections';
import ParticleCanvas from './ParticleCanvas';

const LandingPage = () => {
  return (
    <div className='w-full h-full bg-transparent fixed top-0 bottom-0 left-0 right-0 z-20'>
      <div className='fixed top-0 left-0 bottom-0 right-0 z-10'
        style={{background: 'linear-gradient(to bottom, rgba(82, 82, 82, 0) 0%, rgba(0, 0, 0, 0.2) 100%)'}}
      ></div>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={10} position={[1.0, 0, -1]} />
        <spotLight position={[0, 4, 4]} intensity={200} distance={15} angle={0.5} penumbra={1} decay={1} />

        <ScrollControls pages={5} damping={0.25} style={{zIndex: '20'}}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            // rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            cursor={false}
          >
            <ParticleCanvas
              modelUrls={[
                '/models/music/music.glb',
                '/models/radio/radio.gltf',
                '/models/ukulele/g.gltf',
                '/models/mic/d.glb',
              ]}
            />
          </PresentationControls>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <AllSections />
          </Scroll>
        </ScrollControls>

        <Sparkles noise={0} count={500} speed={0.01} size={0.6} color={"#FFD2BE"} opacity={10} scale={[20, 100, 20]}></Sparkles>
        <Sparkles noise={0} count={50} speed={0.01} size={10} color={"#FFF"} opacity={2} scale={[30, 100, 10]} ></Sparkles>
      </Canvas>
    </div>
  )
}

export default LandingPage