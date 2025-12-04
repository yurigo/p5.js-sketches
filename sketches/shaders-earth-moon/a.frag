#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
varying vec2 vTexCoord;

// Simple noise function
float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Smoothed noise
float smoothNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  
  float a = noise(i);
  float b = noise(i + vec2(1.0, 0.0));
  float c = noise(i + vec2(0.0, 1.0));
  float d = noise(i + vec2(1.0, 1.0));
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal Brownian Motion for terrain
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 2.0;
  
  for (int i = 0; i < 5; i++) {
    value += amplitude * smoothNoise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

void main() {
  vec2 st = vTexCoord;
  
  // Create moving cloud layer
  vec2 cloudSt = st * 8.0 + vec2(u_time * 0.05, 0.0);
  float clouds = fbm(cloudSt) * 0.3;
  
  // Create terrain (continents)
  vec2 terrainSt = st * 6.0;
  float terrain = fbm(terrainSt);
  
  // Ocean color (deep blue)
  vec3 oceanColor = vec3(0.05, 0.3, 0.6);
  
  // Land color (green/brown mix)
  vec3 landColor = vec3(0.2, 0.5, 0.15);
  
  // Cloud color (white)
  vec3 cloudColor = vec3(1.0, 1.0, 1.0);
  
  // Mix ocean and land based on terrain height
  vec3 baseColor = mix(oceanColor, landColor, smoothstep(0.45, 0.55, terrain));
  
  // Add clouds on top
  vec3 finalColor = mix(baseColor, cloudColor, smoothstep(0.6, 0.8, clouds));
  
  // Add some atmospheric glow
  vec2 center = st - 0.5;
  float dist = length(center);
  float vignette = smoothstep(0.5, 0.3, dist);
  finalColor *= (0.7 + 0.3 * vignette);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
