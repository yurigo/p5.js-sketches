// basic.frag
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vTexCoord;

void main() {
  // vTexCoord va de 0..1
  vec2 st = vTexCoord;

  float r = st.x;
  float g = st.y;
  float b = 0.5 + 0.5 * sin(u_time);

  gl_FragColor = vec4(r, g, b, 1.0);
}
