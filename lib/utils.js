import * as THREE from 'three';

export function findGeometry(object) {
  // Check if the object has geometry
  if (object.geometry !== undefined) {
    // Return the geometry if found
    return object.geometry;
  } else {
    // If the object has children, recursively search for geometry
    if (object.children.length > 0) {
      for (let i = 0; i < object.children.length; i++) {
        const geometry = findGeometry(object.children[i]);
        if (geometry !== undefined) {
          return geometry;
        }
      }
    }
  }
  // Return undefined if no geometry is found
  return undefined;
}

export function makeTexture(g) {

  let vertAmount = g.attributes.position.count;
  let texWidth = Math.ceil(Math.sqrt(vertAmount));
  let texHeight = Math.ceil(vertAmount / texWidth);

  let data = new Float32Array(texWidth * texHeight * 4);

  for (let i = 0; i < vertAmount; i++) {
    const x = g.attributes.position.array[i * 3 + 0];
    const y = g.attributes.position.array[i * 3 + 1];
    const z = g.attributes.position.array[i * 3 + 2];
    const w = 0;

    data[i * 4 + 0] = x;
    data[i * 4 + 1] = y;
    data[i * 4 + 2] = z;
    data[i * 4 + 3] = w;
  }

  let dataTexture = new THREE.DataTexture(data, texWidth, texHeight, THREE.RGBAFormat, THREE.FloatType);
  dataTexture.needsUpdate = true;

  return dataTexture;
}

// Function to apply world matrix to geometry
export function applyWorldMatrixToGeometry(object) {
  if (object.geometry) {
    object.updateMatrixWorld(true);
    const matrixWorld = object.matrixWorld;
    object.geometry.applyMatrix4(matrixWorld);
  }
}

// Function to find all geometries and transform points to world coordinates
export function findAllGeometries(object) {
  let geometries = [];

  // If the object has geometry, apply world matrix and add to the list
  if (object.geometry) {
    applyWorldMatrixToGeometry(object);
    geometries.push(object.geometry);
  }

  // If the object has children, recursively find all geometries
  if (object.children.length > 0) {
    for (let i = 0; i < object.children.length; i++) {
      geometries = geometries.concat(findAllGeometries(object.children[i]));
    }
  }

  return geometries;
}