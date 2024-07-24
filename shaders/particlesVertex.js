export const particlesVertex = /* glsl */ `
uniform sampler2D uPositions;//RenderTarget containing the transformed positions
uniform float uPixelRatio;
varying vec3 vPos;

void main() {

  //the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
  vec3 pos = texture2D( uPositions, position.xy ).xyz;
  //pos now contains a 3D position in space, we can use it as a regular vertex

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = 10.0 * uPixelRatio;
  gl_PointSize *= (1.2 / - viewPosition.z);

  vPos = pos;
}
`