import { memo, useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

const MAX_COLORS = 8;
const MAX_DPR = 2;

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform int uColorCount;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t) {
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float segment = floor(scaled);
  float blend = fract(scaled);

  if (segment < 1.0) return mix(uColor0, uColor1, blend);
  if (segment < 2.0 && count > 2) return mix(uColor1, uColor2, blend);
  if (segment < 3.0 && count > 3) return mix(uColor2, uColor3, blend);
  if (segment < 4.0 && count > 4) return mix(uColor3, uColor4, blend);
  if (segment < 5.0 && count > 5) return mix(uColor4, uColor5, blend);
  if (segment < 6.0 && count > 6) return mix(uColor5, uColor6, blend);
  if (segment < 7.0 && count > 7) return mix(uColor6, uColor7, blend);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv0 = fragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  vec2 position = uv0 * 2.0 - 1.0;
  position.x *= aspect;
  vec2 rotated = rotate2D(position, uAngle);
  rotated.x /= aspect;
  vec2 uv = rotated * 0.5 + 0.5;

  vec2 distortedUv = uv;
  if (uDistort > 0.0) {
    float wave = 0.01 * uDistort;
    distortedUv.x += sin(distortedUv.y * 6.0) * wave;
    distortedUv.y += cos(distortedUv.x * 6.0) * wave;
  }

  float gradientPosition = distortedUv.x;
  if (uMirror > 0.5) {
    gradientPosition = 1.0 - abs(1.0 - 2.0 * fract(gradientPosition));
  }
  vec3 base = getGradientColor(gradientPosition);

  vec2 spotlightPosition = vec2(iMouse.x / iResolution.x, iMouse.y / iResolution.y);
  float distanceToSpotlight = length(uv0 - spotlightPosition);
  float radius = max(uSpotlightRadius, 0.0001);
  float normalizedDistance = distanceToSpotlight / radius;
  float spotlight = (1.0 - 2.0 * pow(normalizedDistance, uSpotlightSoftness)) * uSpotlightOpacity;

  float stripeCount = max(uBlindCount, 1.0);
  float stripe = fract(distortedUv.x * stripeCount);
  float stripeAA = clamp(stripeCount * 1.25 / min(iResolution.x, iResolution.y), 0.001, 0.12);
  float edgeDistance = min(stripe, 1.0 - stripe);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, edgeDistance);
  stripe = mix(stripe, 0.5, edgeBlend);
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;

  vec3 color = vec3(spotlight) + base - vec3(stripe);
  color += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
  fragColor = vec4(color, 1.0);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

function hexToRgb(hex) {
  const color = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(color.slice(0, 2), 16) / 255,
    parseInt(color.slice(2, 4), 16) / 255,
    parseInt(color.slice(4, 6), 16) / 255,
  ];
}

function prepareStops(stops) {
  const colors = (stops?.length ? stops : ['#061B32', '#26D8AD']).slice(0, MAX_COLORS);
  if (colors.length === 1) colors.push(colors[0]);
  const count = colors.length;
  while (colors.length < MAX_COLORS) colors.push(colors.at(-1));
  return { colors: colors.map(hexToRgb), count };
}

const callIfFunction = (target, method) => {
  if (target && typeof target[method] === 'function') target[method]();
};

const GradientBlinds = memo(function GradientBlinds({
  angle = -8,
  blindCount = 10,
  blindMinWidth = 92,
  className = '',
  distortAmount = 0.3,
  dpr,
  gradientColors,
  mirrorGradient = true,
  motionEnabled = true,
  mouseDampening = 0.18,
  noise = 0.08,
  shineDirection = 'right',
  spotlightOpacity = 0.72,
  spotlightRadius = 0.65,
  spotlightSoftness = 1.2,
}) {
  const hostRef = useRef(null);
  const animationFrameRef = useRef(0);
  const visibleRef = useRef(false);
  const mouseTargetRef = useRef([0, 0]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !motionEnabled || typeof WebGLRenderingContext === 'undefined') return undefined;

    let renderer;
    let program;
    let geometry;
    let mesh;

    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(dpr ?? window.devicePixelRatio ?? 1, MAX_DPR),
      });
    } catch {
      return undefined;
    }

    const { gl } = renderer;
    const canvas = gl.canvas;
    const { colors, count } = prepareStops(gradientColors);
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (angle * Math.PI) / 180 },
      uNoise: { value: noise },
      uBlindCount: { value: Math.max(1, blindCount) },
      uSpotlightRadius: { value: spotlightRadius },
      uSpotlightSoftness: { value: spotlightSoftness },
      uSpotlightOpacity: { value: spotlightOpacity },
      uMirror: { value: mirrorGradient ? 1 : 0 },
      uDistort: { value: distortAmount },
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: colors[0] },
      uColor1: { value: colors[1] },
      uColor2: { value: colors[2] },
      uColor3: { value: colors[3] },
      uColor4: { value: colors[4] },
      uColor5: { value: colors[5] },
      uColor6: { value: colors[6] },
      uColor7: { value: colors[7] },
      uColorCount: { value: count },
    };

    try {
      program = new Program(gl, { fragment: fragmentShader, uniforms, vertex: vertexShader });
      geometry = new Triangle(gl);
      mesh = new Mesh(gl, { geometry, program });
    } catch {
      callIfFunction(renderer, 'destroy');
      return undefined;
    }

    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.display = 'block';
    canvas.style.height = '100%';
    canvas.style.mixBlendMode = 'lighten';
    canvas.style.width = '100%';
    host.appendChild(canvas);

    let lastTimestamp = 0;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      renderer.setSize(width, height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];

      if (!mouseTargetRef.current[0] && !mouseTargetRef.current[1]) {
        const center = [gl.drawingBufferWidth / 2, gl.drawingBufferHeight / 2];
        uniforms.iMouse.value = center;
        mouseTargetRef.current = [...center];
      }

      const maximumByWidth = Math.max(1, Math.floor(width / blindMinWidth));
      uniforms.uBlindCount.value = Math.max(1, Math.min(blindCount, maximumByWidth));
    };

    const stop = () => {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    };

    const draw = (timestamp) => {
      animationFrameRef.current = 0;
      if (!visibleRef.current || document.hidden) return;

      const elapsed = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
      lastTimestamp = timestamp;
      const factor = 1 - Math.exp(-elapsed / Math.max(0.0001, mouseDampening));
      const current = uniforms.iMouse.value;
      const target = mouseTargetRef.current;
      current[0] += (target[0] - current[0]) * factor;
      current[1] += (target[1] - current[1]) * factor;
      uniforms.iTime.value = timestamp * 0.001;

      try {
        renderer.render({ scene: mesh });
        animationFrameRef.current = requestAnimationFrame(draw);
      } catch {
        stop();
      }
    };

    const wake = () => {
      if (!animationFrameRef.current && visibleRef.current && !document.hidden) {
        lastTimestamp = 0;
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      const scaleX = gl.drawingBufferWidth / Math.max(bounds.width, 1);
      const scaleY = gl.drawingBufferHeight / Math.max(bounds.height, 1);
      mouseTargetRef.current = [
        (event.clientX - bounds.left) * scaleX,
        (bounds.bottom - event.clientY) * scaleY,
      ];
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else wake();
    };

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    const intersectionObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true;
        if (visibleRef.current) wake();
        else stop();
      }, { rootMargin: '80px', threshold: 0.01 });
    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

    resizeObserver?.observe(host);
    intersectionObserver?.observe(host);
    if (!intersectionObserver) visibleRef.current = true;
    if (!resizeObserver) window.addEventListener('resize', resize);
    if (finePointer) window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resize();
    wake();

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      if (finePointer) window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (canvas.parentElement === host) host.removeChild(canvas);
      callIfFunction(mesh, 'remove');
      callIfFunction(geometry, 'remove');
      callIfFunction(program, 'remove');
      callIfFunction(renderer, 'destroy');
    };
  }, [
    angle,
    blindCount,
    blindMinWidth,
    distortAmount,
    dpr,
    gradientColors,
    mirrorGradient,
    motionEnabled,
    mouseDampening,
    noise,
    shineDirection,
    spotlightOpacity,
    spotlightRadius,
    spotlightSoftness,
  ]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(120deg,#061b32,#0b2946_48%,#087f8c)] ${className}`}
      data-gradient-blinds=""
      ref={hostRef}
    />
  );
});

export default GradientBlinds;
