import { findAllGeometries, findGeometry, getRandomData, makeTexture } from '@/lib/utils';
import { particlesFragment } from '@/shaders/particlesFragment';
import { particlesVertex } from '@/shaders/particlesVertex';
import { simulationFragment } from '@/shaders/simulationFragment';
import { simulationVertex } from '@/shaders/simulationVertex';
import { OrthographicCamera, useFBO, useGLTF, useScroll } from '@react-three/drei'
import { createPortal, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const ParticleCanvas = ({ modelUrls = [] }) => {
  const meshRef = useRef();
  const ponitsRef = useRef();
  const scroll = useScroll();

  const otherCamera = useRef();
  const otherScene = new THREE.Scene();

  const totalModels = 4;
  const width = 256;
  const height = 256;

  const gltf = useGLTF(modelUrls);
  const [textures, setTextures] = useState([]);

  const renderTarget = useFBO(width, height, {
    minFilter: THREE.NearestFilter, // Important because we want to sample square pixels
    magFilter: THREE.NearestFilter,
    generateMipmaps: false, // No need
    colorSpace: THREE.SRGBColorSpace, // No need
    depthBuffer: false, // No need
    stencilBuffer: false, // No need
    format: THREE.RGBAFormat, // Or RGBAFormat instead (to have a color for each particle, for example)
    type: THREE.FloatType // Important because we need precise coordinates (not ints)
  });

  useEffect(() => {
    if (!gltf || gltf.length < totalModels) return;

    let textures = [];
    gltf.map((gltfModel, i) => {
      var geometries = findAllGeometries(gltfModel.scene);
      var mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
      if (i === 0) {
        mergedGeometry.scale(3.9, 3.9, 3.9);
        mergedGeometry.translate(-0.5, 0, 0);
      } else if (i === 1) {
        // mergedGeometry = findGeometry(gltfModel.scene.children[0]);
        mergedGeometry.translate(59, -1, 0);
        mergedGeometry.scale(0.9, 0.9, 0.9);
      } else if (i === 2) {
        mergedGeometry.scale(11.5, 11.5, 11.5);
        mergedGeometry.translate(0, -3.0, 0);
      } else if (i === 3) {
        mergedGeometry.scale(16, 16, 16);
        mergedGeometry.translate(0, -2.4, 0);
        mergedGeometry.rotateY((Math.PI / 180) * 45);
      }
      textures.push(makeTexture(mergedGeometry))
    });

    setTextures(textures);
  }, [gltf]);

  useEffect(() => {
    if (textures.length !== totalModels) return;

    const data = getRandomData(width, height, 25);
    const positions = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
    positions.needsUpdate = true;

    var tempTexture = [...textures];
    tempTexture.splice(3, 0, positions);
    setTextures(tempTexture);
  }, [textures]);

  const points = useMemo(() => {
    const length = width * height;

    let vertices = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      vertices[i3 + 0] = (i % width) / width;
      vertices[i3 + 1] = (i / width) / height;
    }

    return new THREE.BufferAttribute(vertices, 3);
  }, []);

  const geometry = useMemo(() => {
    if (textures.length < totalModels) return null;

    const bufferGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,

      -1, -1, 0,
      1, 1, 0,
      -1, 1, 0
    ]);

    const uv = new Float32Array([
      0, 1,
      1, 1,
      1, 0,

      0, 1,
      1, 0,
      0, 0
    ]);

    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    bufferGeometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

    return bufferGeometry;
  }, [textures]);

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(otherScene, otherCamera.current);
    gl.setRenderTarget(null);

    const model = Math.floor(scroll.range(0, (1 / scroll.pages) * 5) / 0.25) + 1;
    var scrollVal = scroll.range(0, (1 / scroll.pages) * 5);

    if (scrollVal < (model * 0.25) + 0.02 && scrollVal > (model * 0.25) - 0.02)
      scrollVal = model * 0.25;

    if (meshRef?.current?.material) {
      meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
      meshRef.current.material.uniforms.uScroll.value = scrollVal;
    }
    
    ponitsRef.current.material.uniforms.uPositions.value = renderTarget.texture;
  });

  return (
    <>
      {createPortal(
        <>
          <OrthographicCamera
            left={-1}
            right={1}
            top={1}
            bottom={-1}
            near={0.00000001}
            far={1}
            ref={otherCamera}
          />
          {textures.length === (totalModels + 1) && geometry && (
            <mesh ref={meshRef} geometry={geometry}>
              <shaderMaterial
                uniforms={{
                  uTextureA: { type: "t", value: textures[0] },
                  uTextureB: { type: "t", value: textures[1] },
                  uTextureC: { type: "t", value: textures[2] },
                  uTextureD: { type: "t", value: textures[3] },
                  uTextureE: { type: "t", value: textures[4] },
                  uScroll: { value: 0.0 },
                  uTime: { value: 0.0 },
                }}
                vertexShader={simulationVertex}
                fragmentShader={simulationFragment}
              />
            </mesh>
          )}
        </>,
        otherScene
      )}
      <points ref={ponitsRef}>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{
            uPositions: { value: null },
            uPixelRatio: { value: 1.75 },
          }}
          vertexShader={particlesVertex}
          fragmentShader={particlesFragment}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default ParticleCanvas