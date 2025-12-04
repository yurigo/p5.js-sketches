// #ifdef GL_ES
// precision mediump float;
// #endif

// attribute vec3 aPosition;
// attribute vec2 aTexCoord;

// varying vec2 vTexCoord;

// uniform mat4 uProjectionMatrix;
// uniform mat4 uModelViewMatrix;

// void main() {
//   vTexCoord = aTexCoord;
//   gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
// }


// precision highp float; varying vec2 vPos;
// attribute vec3 aPosition;
// void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }


precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

varying vec2 vTexCoord;
varying vec3 vNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

void main() {
  vTexCoord = aTexCoord;
  vNormal = uNormalMatrix * aNormal;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}