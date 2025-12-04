#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
varying vec2 vTexCoord;

void main() {
  vec2 st = vTexCoord - 0.5;
  float d = length(st) * 2.0;

  float r = 1.0 - d;
  float g = 0.3 + 0.3 * sin(u_time + d * 10.0);
  float b = 0.0;

  gl_FragColor = vec4(r, g, b, 1.0);
}
