import GL from 'gl-react'
import React from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
  Valencia: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      mat3 saturateMatrix = mat3(
                                1.1402,
                                -0.0598,
                                -0.061,
                                -0.1174,
                                1.0826,
                                -0.1186,
                                -0.0228,
                                -0.0228,
                                1.1772);
      vec3 lumaCoeffs = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .8333333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .1666666)).b
                    );

                    vec3 bbTexel2 = texture2D(inputImageTexture4, uv).rgb;
                    texel.r = texture2D(inputImageTexture3, vec2(bbTexel2.r, (1.0-texel.r))).r;
                    texel.g = texture2D(inputImageTexture3, vec2(bbTexel2.g, (1.0-texel.g))).g;
                    texel.b = texture2D(inputImageTexture3, vec2(bbTexel2.b, (1.0-texel.b))).b;

        texel = saturateMatrix * texel;
        float luma = dot(lumaCoeffs, texel);
        texel = vec3(
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.r))).r,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.g))).g,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.b))).b);


        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

module.exports = GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Valencia");
    const [inputImageTexture, inputImageTexture4] = children;
    return <GL.Node
      shader={shaders.Valencia}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: resolveAssetSource(require('../assets/valenciaMap.png')),
        inputImageTexture3: resolveAssetSource(require('../assets/valenciaGradientMap.png')),
        inputImageTexture4,
      }}
    />
  },
  {
    displayName: "Valencia"
  }
);
