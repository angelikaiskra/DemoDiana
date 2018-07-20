import GL from "gl-react";
import React from "react";

const shaders = GL.Shaders.create({
  multiply: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t1;
uniform sampler2D t2;
void main () {
  vec4 c1 = texture2D(t1, uv);
  vec4 c2 = texture2D(t2, uv);
  gl_FragColor = vec4((c1.rgb + c2.rgb) / 2.0, c1.a + c2.a);
}
`
  }
});

module.exports = GL.createComponent(
  ({ width, height, children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Multiply");
    const [t1, t2] = children;
    return <GL.Node
      shader={shaders.multiply}
      width={width}
      height={height}
      uniforms={{ t1, t2 }}
    />;
  },
  { displayName: "Multiply" });
