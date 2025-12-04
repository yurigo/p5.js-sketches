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

// Create crater patterns
float craters(vec2 st, float scale) {
  st *= scale;
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);
  
  float m_dist = 1.0;
  
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = vec2(noise(i_st + neighbor), noise(i_st + neighbor + vec2(100.0, 200.0)));
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      
      // Create crater rim effect
      if (dist < 0.4) {
        float crater = smoothstep(0.4, 0.3, dist) - smoothstep(0.3, 0.2, dist);
        m_dist = min(m_dist, 1.0 - crater);
      }
    }
  }
  
  return m_dist;
}

// Fractal Brownian Motion for surface detail
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 2.0;
  
  for (int i = 0; i < 4; i++) {
    value += amplitude * smoothNoise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

void main() {
  vec2 st = vTexCoord;
  
  // Base lunar regolith texture
  float surface = fbm(st * 12.0);
  
  // Add multiple layers of craters at different scales
  float largeCraters = craters(st, 3.0);
  float mediumCraters = craters(st, 6.0);
  float smallCraters = craters(st, 12.0);
  
  // Combine crater layers
  float craterPattern = largeCraters * mediumCraters * smallCraters;
  
  // Moon base color (grey with slight variation)
  vec3 darkGrey = vec3(0.25, 0.25, 0.27);
  vec3 lightGrey = vec3(0.55, 0.55, 0.57);
  
  // Mix colors based on surface detail
  vec3 lunarColor = mix(darkGrey, lightGrey, surface);
  
  // Apply crater shadows
  lunarColor *= craterPattern;
  
  // Add some darker "maria" (seas) regions
  float maria = smoothNoise(st * 2.0);
  if (maria < 0.3) {
    lunarColor *= 0.7;
  }
  
  // Add subtle lighting variation
  vec2 center = st - 0.5;
  float dist = length(center);
  float lighting = smoothstep(0.5, 0.2, dist);
  lunarColor *= (0.6 + 0.4 * lighting);
  
  gl_FragColor = vec4(lunarColor, 1.0);
}
