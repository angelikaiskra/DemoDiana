import GL from 'gl-react'
import React from 'react'

const shaders = GL.Shaders.create({
  Nothing: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;
        gl_FragColor = texel;
      }`
  }
});

module.exports = GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Nothing");
    const [inputImageTexture, inputImageTexture2] = children;
    return <GL.Node
      shader={shaders.Nothing}
      uniforms={{
        inputImageTexture,
        inputImageTexture2
      }}
    />
  },
  {
    displayName: "Nothing"
  }
);
