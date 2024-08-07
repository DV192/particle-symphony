export const simulationFragment = /* glsl */ `
uniform sampler2D uTextureA;//DATA Texture containing original uTextureA
uniform sampler2D uTextureB;
uniform sampler2D uTextureC;
uniform sampler2D uTextureD;
uniform sampler2D uTextureE;
uniform float uScroll;
uniform float uTime;
varying vec2 vUv;

mat3 rotationMatrix3(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy,
  vec2(12.9898,78.233)))*
  43758.5453123);
}

float remap(float value, float inputMin, float inputMax, float outputMin, float outputMax) {
  return outputMin + ((outputMax - outputMin) / (inputMax - inputMin)) * (value - inputMin);
}

void main() {

  float range = 1.0 / 4.0;
  vec3 pos;

  vec3 textureA = rotationMatrix3(vec3(1.0, 0.0, 0.0), sin(uTime) * 0.1) * texture2D( uTextureA, vUv ).xyz;
  vec3 textureB = rotationMatrix3(vec3(1.0, 0.0, 0.0), sin(uTime) * 0.1) * texture2D( uTextureB, vUv ).xyz;
  vec3 textureC = rotationMatrix3(vec3(1.0, 0.0, 0.0), sin(uTime) * 0.1) * texture2D( uTextureC, vUv ).xyz;
  vec3 textureD = rotationMatrix3(vec3(1.0, 0.0, 0.0), sin(uTime) * 0.1) * texture2D( uTextureD, vUv ).xyz;
  vec3 textureE = rotationMatrix3(vec3(1.0, 0.0, 0.0), sin(uTime) * 0.1) * texture2D( uTextureE, vUv ).xyz;

  // multiplication factor is for lining control while scattering
  // float mulFactor = 0.2;
  // float r = random(vUv) * mulFactor;

  // clamp -> value, min, max - r
  // remap -> clamp, minInput, maxInput - r, minOutput, maxOutput
  // float t = remap(clamp(uScroll - (r * 0.5), 0.0, 1.0 - r), 0.0, 1.0 - r, 0.0, 1.0);
  // float t = remap(clamp((uScroll/4.0) - (r * 0.5), 0.0, range - r), 0.0, range - r, 0.0, 1.0);

  if (uScroll < range) {
    float r = random(vUv) * 0.2;
    float t = remap(clamp(uScroll - (r * 0.5), range * 0.0, range * 1.0 - r), range * 0.0, range * 1.0 - r, 0.0, 1.0);
    pos = mix(textureA, textureB, t);
  } else if (uScroll < range * 2.0) {
    float r = random(vUv) * 0.2;
    float t = remap(clamp(uScroll - (r * 0.5), range * 1.0, range * 2.0 - r), range * 1.0, range * 2.0 - r, 0.0, 1.0);
    pos = mix(textureB, textureC, t);
  } else if (uScroll < range * 3.0) {
  //  (uScroll < range * 3.0)
    float r = random(vUv) * 0.2;
    float t = remap(clamp(uScroll - (r * 0.5), range * 2.0, range * 3.0 - r), range * 2.0, range * 3.0 - r, 0.0, 1.0);
    pos = mix(textureC, textureD, t);
  } else {
    float r = random(vUv) * 0.2;
    float t = remap(clamp(uScroll - (r * 0.5), range * 3.0, range * 4.0 - r), range * 3.0, range * 4.0 - r, 0.0, 1.0);
    pos = mix(textureD, textureE, t);
  }

  gl_FragColor = vec4( pos, 1.0 );
}
`