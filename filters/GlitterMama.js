import GL from 'gl-react'
import React from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  GlitterMama: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;

      float blendOverlay(float base, float blend) {
        base *= 1.3;

      	return base < 0.5
            ?
            (2.0*base*blend)
            :
            (1.0-2.0*(1.0-base)*(1.0-blend));
      }

      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec4 bbTexel = texture2D(inputImageTexture2, uv);
        vec4 ccTexel = texture2D(inputImageTexture4, uv);
        vec4 ddTexel = texture2D(inputImageTexture3, uv);

        texel = vec4(max(bbTexel.r,texel.r), max(bbTexel.g,texel.g), max(bbTexel.b,texel.b), 1.0);
        texel = vec4(max(bbTexel.r,texel.r), max(bbTexel.g,texel.g), max(bbTexel.b,texel.b), 1.0);

        ccTexel = vec4(blendOverlay(ccTexel.r,texel.r),blendOverlay(ccTexel.g,texel.g),blendOverlay(ccTexel.b,texel.b), 1.0);
        texel *= ccTexel;

        texel = vec4(min(ddTexel.r,texel.r), min(ddTexel.g,texel.g), min(ddTexel.b,texel.b), 1.0);

        gl_FragColor = texel;
      }`
  }
});

module.exports = GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to GlitterMama");
    const [inputImageTexture, inputImageTexture4] = children;
    return <GL.Node
      shader={shaders.GlitterMama}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../assets/lightercolor.png')),
        inputImageTexture3: resolveAssetSource(require('../assets/glitter_darken.png')),
        inputImageTexture4,
      }}
    />
  },
  {
    displayName: "GlitterMama"
  }
);
