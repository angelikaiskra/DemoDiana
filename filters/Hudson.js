import GL from 'gl-react'
import React from 'react'

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  Hudson: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;

        vec3 bbTexel2 = texture2D(inputImageTexture5, uv).rgb;
        texel.r = texture2D(inputImageTexture3, vec2(bbTexel2.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel2.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel2.b, (1.0-texel.b))).b;

        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;
      }`
  }
});

module.exports = GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Hudson");
    const [inputImageTexture, inputImageTexture5] = children;
    return <GL.Node
      shader={shaders.Hudson}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../assets/hudsonBackground.png')),
        inputImageTexture3: resolveAssetSource(require('../assets/overlayMap.png')),
        inputImageTexture4: resolveAssetSource(require('../assets/hudsonMap.png')),
        inputImageTexture5,
      }}
    />
  },
  {
    displayName: "Hudson"
  }
);
