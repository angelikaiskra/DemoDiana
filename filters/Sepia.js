import GL from "gl-react";
import React from "react";
import PropTypes from "prop-types";

import mixArrays from "../utils/mixarrays";

const shaders = GL.Shaders.create({
  Sepia: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform mat4 sepia;
      void main () {
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;
        texel.r = texture2D(inputImageTexture, vec2(bbTexel2.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture, vec2(bbTexel2.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture, vec2(bbTexel2.b, (1.0-texel.b))).b;

        gl_FragColor = sepia * texture2D(inputImageTexture, uv);
      }
    `
  }
});

export default GL.createComponent(
  ({ children }) => {
    if (!children || children.length !== 2) throw new Error("You must provide 2 children to Sepia");
  const [inputImageTexture, inputImageTexture2] = children;
  const sepia = mixArrays([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ], [
    .3, .3, .3, 0,
    .6, .6, .6, 0,
    .1, .1, .1, 0,
    0.2, 0, -0.2, 1
  ], 1);

  return (
    <GL.Node
      shader={shaders.Sepia}
      uniforms={{
        inputImageTexture,
        inputImageTexture2,
        sepia,
      }}
    />
  );
},
{
  displayName: "Sepia",
  defaultProps: {
    sepia: 0,
  }
});
