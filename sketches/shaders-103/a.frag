#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
varying vec2 vTexCoord;

void main() {
  float v = 0.5 + 0.5 * sin(10.0 * vTexCoord.x + u_time * 2.0);
  gl_FragColor = vec4(v, 0.2, 0.8, 1.0);
}