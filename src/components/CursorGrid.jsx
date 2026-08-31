import { useEffect, useRef } from "react";
import "./CursorGrid.css";

const FALLOFF_CURVES = {
  linear: (value) => value,
  smooth: (value) => value * value * (3 - 2 * value),
  sharp: (value) => value * value * value,
};

const colorCache = new Map();

const hexToRgb = (hex) => {
  const cached = colorCache.get(hex);
  if (cached) return cached;

  const raw = hex.replace("#", "");
  const normalized =
    raw.length === 3
      ? raw
          .split("")
          .map((character) => character + character)
          .join("")
      : raw;
  const value = Number.parseInt(normalized.slice(0, 6), 16);

  const rgb = [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  colorCache.set(hex, rgb);
  return rgb;
};

export default function CursorGrid({
  cellSize = 70,
  color = "#d946ef",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  activation = "pointer",
  autoSpeed = 72,
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({});
  const wakeRef = useRef(null);

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    activation,
    autoSpeed,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return undefined;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let width = 0;
    let height = 0;
    const pulses = [];
    let animationFrame = 0;
    let running = false;
    let lastFrame = 0;
    let isVisible = activation !== "viewport";
    let animationStartedAt = 0;

    const rebuild = () => {
      const props = propsRef.current;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * devicePixelRatio));
      canvas.height = Math.max(1, Math.round(height * devicePixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      columns = Math.ceil(width / props.cellSize);
      rows = Math.ceil(height / props.cellSize);
      offsetX = 0;
      offsetY = 0;
      alphas = new Float32Array(columns * rows);
      touched = new Float64Array(columns * rows);
    };

    const cellCenter = (index) => {
      const { cellSize: size } = propsRef.current;
      const centerX = offsetX + (index % columns) * size + size / 2;
      const centerY =
        offsetY + Math.floor(index / columns) * size + size / 2;

      return [centerX, centerY];
    };

    const energize = (x, y, boost = 1, now = performance.now()) => {
      const props = propsRef.current;
      const activeRadius = Math.max(props.radius, 1);
      const ease =
        FALLOFF_CURVES[props.falloff] ?? FALLOFF_CURVES.linear;
      const minimumColumn = Math.max(
        0,
        Math.floor((x - activeRadius - offsetX) / props.cellSize),
      );
      const maximumColumn = Math.min(
        columns - 1,
        Math.floor((x + activeRadius - offsetX) / props.cellSize),
      );
      const minimumRow = Math.max(
        0,
        Math.floor((y - activeRadius - offsetY) / props.cellSize),
      );
      const maximumRow = Math.min(
        rows - 1,
        Math.floor((y + activeRadius - offsetY) / props.cellSize),
      );

      for (let row = minimumRow; row <= maximumRow; row += 1) {
        for (let column = minimumColumn; column <= maximumColumn; column += 1) {
          const index = row * columns + column;
          const [centerX, centerY] = cellCenter(index);
          const distance = Math.hypot(centerX - x, centerY - y);

          if (distance > activeRadius) continue;

          const level =
            ease(1 - distance / activeRadius) * props.maxOpacity * boost;

          if (level > alphas[index]) alphas[index] = level;
          if (level > 0) touched[index] = now;
        }
      }
    };

    const draw = (now) => {
      const props = propsRef.current;
      const elapsed = Math.min(now - lastFrame, 50);
      lastFrame = now;
      context.clearRect(0, 0, width, height);

      if (props.activation === "viewport" && isVisible) {
        const elapsedSeconds = (now - animationStartedAt) / 1000;
        const travelWidth = width + props.radius * 2;
        const x =
          ((elapsedSeconds * props.autoSpeed + props.radius) % travelWidth) -
          props.radius;
        const y =
          height * (0.5 + Math.sin(elapsedSeconds * 0.9) * 0.16);
        energize(x, y, 0.72, now);
      }

      const [red, green, blue] = hexToRgb(props.color);

      if (props.gridOpacity > 0) {
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${props.gridOpacity})`;
        context.lineWidth = 1;
        context.beginPath();

        for (let column = 0; column <= columns; column += 1) {
          const x = Math.round(offsetX + column * props.cellSize) + 0.5;
          context.moveTo(x, 0);
          context.lineTo(x, height);
        }

        for (let row = 0; row <= rows; row += 1) {
          const y = Math.round(offsetY + row * props.cellSize) + 0.5;
          context.moveTo(0, y);
          context.lineTo(width, y);
        }

        context.stroke();
      }

      for (let pulseIndex = pulses.length - 1; pulseIndex >= 0; pulseIndex -= 1) {
        const pulse = pulses[pulseIndex];
        const ringRadius =
          ((now - pulse.startedAt) / 1000) * props.pulseSpeed;

        if (ringRadius > Math.hypot(width, height)) {
          pulses.splice(pulseIndex, 1);
          continue;
        }

        const band = props.cellSize;
        const minimumColumn = Math.max(
          0,
          Math.floor((pulse.x - ringRadius - band - offsetX) / props.cellSize),
        );
        const maximumColumn = Math.min(
          columns - 1,
          Math.floor((pulse.x + ringRadius + band - offsetX) / props.cellSize),
        );
        const minimumRow = Math.max(
          0,
          Math.floor((pulse.y - ringRadius - band - offsetY) / props.cellSize),
        );
        const maximumRow = Math.min(
          rows - 1,
          Math.floor((pulse.y + ringRadius + band - offsetY) / props.cellSize),
        );

        for (let row = minimumRow; row <= maximumRow; row += 1) {
          for (let column = minimumColumn; column <= maximumColumn; column += 1) {
            const index = row * columns + column;
            const [centerX, centerY] = cellCenter(index);
            const distance = Math.hypot(centerX - pulse.x, centerY - pulse.y);

            if (
              Math.abs(distance - ringRadius) < band / 2 &&
              props.maxOpacity > alphas[index]
            ) {
              alphas[index] = props.maxOpacity;
              touched[index] = now;
            }
          }
        }
      }

      let hasVisibleCells = pulses.length > 0;
      const fadeStep = elapsed / Math.max(props.fadeDuration, 16);
      const halfCell = props.cellSize / 2;

      for (let index = 0; index < alphas.length; index += 1) {
        let alpha = alphas[index];
        if (alpha <= 0) continue;

        if (now - touched[index] > props.holdTime) {
          alpha = Math.max(0, alpha - fadeStep);
          alphas[index] = alpha;
          if (alpha <= 0) continue;
        }

        hasVisibleCells = true;
        const [centerX, centerY] = cellCenter(index);
        const gradient = context.createRadialGradient(
          centerX,
          centerY,
          halfCell * 0.1,
          centerX,
          centerY,
          props.cellSize,
        );
        gradient.addColorStop(
          0,
          `rgba(${red}, ${green}, ${blue}, ${alpha})`,
        );
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

        const x = centerX - halfCell + 0.5;
        const y = centerY - halfCell + 0.5;
        const size = props.cellSize - 1;
        context.beginPath();

        if (props.cellRadius > 0) {
          context.roundRect(x, y, size, size, props.cellRadius);
        } else {
          context.rect(x, y, size, size);
        }

        if (props.fillOpacity > 0) {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * props.fillOpacity})`;
          context.fill();
        }

        context.strokeStyle = gradient;
        context.lineWidth = props.lineWidth;
        context.stroke();
      }

      if (
        hasVisibleCells ||
        (props.activation === "viewport" && isVisible)
      ) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const localPoint = (event) => {
      const bounds = canvas.getBoundingClientRect();
      return [event.clientX - bounds.left, event.clientY - bounds.top];
    };

    const handlePointerMove = (event) => {
      const [x, y] = localPoint(event);
      energize(x, y);
      wake();
    };

    const handlePointerDown = (event) => {
      if (!propsRef.current.clickPulse) return;

      const [x, y] = localPoint(event);
      pulses.push({ x, y, startedAt: performance.now() });
      wake();
    };

    const resizeObserver = new ResizeObserver(() => {
      rebuild();
      wake();
    });
    const intersectionObserver =
      activation === "viewport"
        ? new IntersectionObserver(
            ([entry]) => {
              const nextVisible =
                entry.isIntersecting && entry.intersectionRatio >= 0.15;

              if (nextVisible === isVisible) return;

              isVisible = nextVisible;
              if (isVisible) {
                animationStartedAt = performance.now();
                alphas.fill(0);
                touched.fill(0);
                wake();
              } else {
                cancelAnimationFrame(animationFrame);
                running = false;
              }
            },
            { threshold: 0.15 },
          )
        : null;

    resizeObserver.observe(container);
    intersectionObserver?.observe(container);
    rebuild();
    wake();
    if (activation === "pointer") {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (activation === "pointer") {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerdown", handlePointerDown);
      }
      wakeRef.current = null;
    };
  }, [activation, cellSize]);

  useEffect(() => {
    wakeRef.current?.();
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius]);

  return (
    <div
      ref={containerRef}
      className={`cursor-grid${className ? ` ${className}` : ""}`}
      data-testid="cursor-grid"
      data-activation={activation}
      data-interactive={activation === "pointer" ? "true" : "false"}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="cursor-grid__canvas" />
    </div>
  );
}
