// basic.vert
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  // Pasamos coords de textura al fragment shader (0..1)
  vTexCoord = aTexCoord;

  // p5 ya nos da la posición del vértice en espacio de objeto (aPosition)
  // y matrices para colocarlo correctamente en pantalla:
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
