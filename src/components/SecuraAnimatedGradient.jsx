import { useEffect, useRef, useState } from 'react';

const FRAME_INTERVAL = 1000 / 30;
const MAX_DPR = 1.25;

const CONFIG = {
  color1: '#000504',
  color2: '#02BFA6',
  color3: '#14b8a6',
  distortion: 20,
  scale: 0.5,
  speed: 12,
  swirl: 60,
};

const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;
  float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
  float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);
  return vec4(mix(blended_color_2, color3, r2), mix(blended_opacity_2, c3.a, r2));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float noise_scale = .0005 + .006 * u_scale;

  uv -= .5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float n1 = noise(uv + t);
  float n2 = noise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  float shape = 0.;
  float mixer = 0.;
  if (u_shape < .5) {
    vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float sh = 1. - uv.y;
    sh -= .5;
    sh /= (noise_scale * u_resolution.y);
    sh += .5;
    float shape_scaling = .2 * (1. - u_shapeScale);
    shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
    mixer = shape;
  }

  fragColor = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
}`;

const hexToRgba = (hex) => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
  1,
];

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error('Secura gradient shader compilation failed.');
  }
  return shader;
}

export default function SecuraAnimatedGradient({ motionEnabled }) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host || typeof WebGL2RenderingContext === 'undefined') {
      setFailed(true);
      return undefined;
    }

    let frame = 0;
    let lastDraw = 0;
    let visible = true;
    let resizeObserver;
    let intersectionObserver;
    let gl;
    let program;
    let vertexShader;
    let fragmentShader;
    let positionBuffer;

    try {
      gl = canvas.getContext('webgl2', {
        alpha: true,
        antialias: false,
        desynchronized: true,
        powerPreference: 'low-power',
        premultipliedAlpha: true,
      });
      if (!gl) throw new Error('WebGL2 is unavailable.');

      vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Secura gradient shader linking failed.');
      gl.useProgram(program);

      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name) => gl.getUniformLocation(program, name);
      const uniforms = {
        color1: uniform('u_color1'), color2: uniform('u_color2'), color3: uniform('u_color3'),
        distortion: uniform('u_distortion'), pixelRatio: uniform('u_pixelRatio'), proportion: uniform('u_proportion'),
        resolution: uniform('u_resolution'), rotation: uniform('u_rotation'), scale: uniform('u_scale'),
        shape: uniform('u_shape'), shapeScale: uniform('u_shapeScale'), softness: uniform('u_softness'),
        swirl: uniform('u_swirl'), swirlIterations: uniform('u_swirlIterations'), time: uniform('u_time'),
      };
      const colors = [CONFIG.color1, CONFIG.color2, CONFIG.color3].map(hexToRgba);
      gl.uniform1f(uniforms.scale, CONFIG.scale);
      gl.uniform1f(uniforms.rotation, 0);
      colors.forEach((color, index) => gl.uniform4f(uniforms[`color${index + 1}`], ...color));
      gl.uniform1f(uniforms.proportion, .35);
      gl.uniform1f(uniforms.softness, 1);
      gl.uniform1f(uniforms.shape, 0);
      gl.uniform1f(uniforms.shapeScale, .1);
      gl.uniform1f(uniforms.distortion, CONFIG.distortion / 50);
      gl.uniform1f(uniforms.swirl, CONFIG.swirl / 100);
      gl.uniform1f(uniforms.swirlIterations, 10);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.width = Math.max(1, Math.round(host.clientWidth * dpr));
        canvas.height = Math.max(1, Math.round(host.clientHeight * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.pixelRatio, dpr);
      };

      const draw = (timestamp = 0) => {
        gl.uniform1f(uniforms.time, timestamp * 0.001 * ((CONFIG.speed / 100) * 5));
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const tick = (timestamp) => {
        if (!motionEnabled || !visible || document.hidden) {
          frame = 0;
          return;
        }
        if (!lastDraw || timestamp - lastDraw >= FRAME_INTERVAL) {
          draw(timestamp);
          lastDraw = timestamp;
        }
        frame = window.requestAnimationFrame(tick);
      };
      const wake = () => {
        if (motionEnabled && visible && !document.hidden && !frame) {
          host.dataset.animationActive = 'true';
          lastDraw = 0;
          frame = window.requestAnimationFrame(tick);
        }
      };
      const stop = () => {
        window.cancelAnimationFrame(frame);
        frame = 0;
        host.dataset.animationActive = 'false';
      };

      resizeObserver = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) wake();
        else stop();
      }, { rootMargin: '80px', threshold: .01 });
      const handleVisibility = () => (document.hidden ? stop() : wake());
      const handleContextLost = (event) => {
        event.preventDefault();
        stop();
        setFailed(true);
      };

      resizeObserver.observe(host);
      intersectionObserver.observe(host);
      document.addEventListener('visibilitychange', handleVisibility);
      canvas.addEventListener('webglcontextlost', handleContextLost);
      resize();
      draw(0);
      wake();

      return () => {
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      };
    } catch {
      setFailed(true);
      return undefined;
    }
  }, [motionEnabled]);

  return (
    <span ref={hostRef} className="absolute inset-0 overflow-hidden rounded-[11px] bg-[linear-gradient(110deg,#000504,#003b34_68%,#000504)]" aria-hidden="true">
      {!failed ? <canvas ref={canvasRef} className="block size-full" /> : null}
      <span className="absolute inset-0 opacity-[.04] [background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCgkGBAVJOAVJAAAASklEQVQ4y2NgGAWjYBSMglEwCgY/YGRgZBQUYmJiZGQEkYwMjIyMgoKCjIyMIJKBgRFIMjIyAklGRkYGRkFBYEcwMDIyMjAOUQAA1I4HwVwZAkYAAAAASUVORK5CYII=')] [background-size:200px]" />
    </span>
  );
}
