import GL from 'gl-react'
import React from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  FruitPunch: {
    frag: `
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      //uniform sampler2D inputImageTexture3;
      //uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      void main () {
        vec4 texel = texture2D(inputImageTexture, uv);
        vec4 bbTexel = texture2D(inputImageTexture2, uv);
        //bbTexel.a = .9;

        texel *= texture2D(inputImageTexture5, uv);

        texel.r = (texel.r * .393) + (texel.g *.769) + (texel.b * .189);
        texel.g = (texel.r * .349) + (texel.g *.686) + (texel.b * .168);
        texel.b = (texel.r * .272) + (texel.g *.534) + (texel.b * .131);

        texel = vec4(max(bbTexel.r,texel.r), max(bbTexel.g,texel.g), max(bbTexel.b,texel.b), 1.0);

        gl_FragColor = texel;
      }`
  }
});

module.exports = GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to FruitPunch");
    const [inputImageTexture, inputImageTexture5] = children;
    return <GL.Node
      shader={shaders.FruitPunch}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../assets/fruit_punch.png')),
        //inputImageTexture3: resolveAssetSource(require('../assets/overlayMap.png')),
        //inputImageTexture4: resolveAssetSource(require('../assets/sierraMap.png')),
        inputImageTexture5,
      }}
    />
  },
  {
    displayName: "FruitPunch"
  }
);
