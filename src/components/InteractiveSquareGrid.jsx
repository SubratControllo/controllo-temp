import { useEffect, useRef } from 'react';

const FRAME_INTERVAL = 1000 / 30;
const MAX_DPR = 2;

export default function InteractiveSquareGrid({
  cellSize = 54,
  className = '',
  color = '#26d8ad',
  interactive = true,
  mobileCellSize = 42,
  motionEnabled = true,
  speed = 6,
  ...rest
}) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!host || !canvas || !context) return undefined;

    const interactionTarget = host.parentElement ?? host;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let animationFrame = 0;
    let height = 1;
    let hoverStrength = 0;
    let lastPaint = 0;
    let pointer = null;
    let visible = true;
    let width = 1;

    const canMove = () => motionEnabled && !reduceMotion.matches;
    const canInteract = () => interactive && width > 760 && finePointer.matches;

    const draw = (now = performance.now()) => {
      const size = width <= 760 ? mobileCellSize : cellSize;
      const travel = canMove() ? ((now / 1000) * speed) % size : 0;
      const startX = -size + travel;
      const startY = -size + travel * 0.62;

      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      context.strokeStyle = color;

      context.globalAlpha = 0.09;
      for (let x = startX; x <= width + size; x += size) {
        context.beginPath();
        context.moveTo(Math.round(x) + 0.5, 0);
        context.lineTo(Math.round(x) + 0.5, height);
        context.stroke();
      }

      for (let y = startY; y <= height + size; y += size) {
        context.beginPath();
        context.moveTo(0, Math.round(y) + 0.5);
        context.lineTo(width, Math.round(y) + 0.5);
        context.stroke();
      }

      const targetStrength = pointer && canInteract() ? 1 : 0;
      hoverStrength = canMove()
        ? hoverStrength + (targetStrength - hoverStrength) * 0.18
        : targetStrength;

      if (pointer && hoverStrength > 0.01) {
        const column = Math.floor((pointer.x - startX) / size);
        const row = Math.floor((pointer.y - startY) / size);
        const x = startX + column * size;
        const y = startY + row * size;
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 2.2);

        glow.addColorStop(0, 'rgba(38, 216, 173, 0.13)');
        glow.addColorStop(0.35, 'rgba(38, 216, 173, 0.055)');
        glow.addColorStop(1, 'rgba(38, 216, 173, 0)');
        context.globalAlpha = hoverStrength;
        context.fillStyle = glow;
        context.fillRect(x - size * 1.7, y - size * 1.7, size * 4.4, size * 4.4);

        context.save();
        context.globalAlpha = 0.1 * hoverStrength;
        context.fillStyle = color;
        context.shadowBlur = 18;
        context.shadowColor = color;
        context.fillRect(x + 1, y + 1, size - 2, size - 2);
        context.restore();

        const sheen = context.createLinearGradient(x, y, x, y + size);
        sheen.addColorStop(0, 'rgba(255, 255, 255, 0.13)');
        sheen.addColorStop(0.46, 'rgba(255, 255, 255, 0.025)');
        sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
        context.globalAlpha = 0.62 * hoverStrength;
        context.fillStyle = sheen;
        context.fillRect(x + 1, y + 1, size - 2, size - 2);

        context.globalAlpha = 0.5 * hoverStrength;
        context.lineWidth = 1.25;
        context.strokeStyle = color;
        context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, size, size);
      }

      context.globalAlpha = 1;
    };

    const tick = (now) => {
      animationFrame = 0;
      if (!visible || document.hidden) return;

      if (now - lastPaint >= FRAME_INTERVAL) {
        draw(now);
        lastPaint = now;
      }

      if (canMove()) animationFrame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!animationFrame && visible && !document.hidden) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const handlePointerMove = (event) => {
      if (!canInteract()) return;
      const bounds = host.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      wake();
    };

    const handlePointerLeave = () => {
      pointer = null;
      wake();
    };

    const handlePreferenceChange = () => {
      pointer = canInteract() ? pointer : null;
      draw();
      wake();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) wake();
      else {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    interactionTarget.addEventListener('pointermove', handlePointerMove, { passive: true });
    interactionTarget.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reduceMotion.addEventListener('change', handlePreferenceChange);
    finePointer.addEventListener('change', handlePreferenceChange);
    resize();
    wake();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      interactionTarget.removeEventListener('pointermove', handlePointerMove);
      interactionTarget.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reduceMotion.removeEventListener('change', handlePreferenceChange);
      finePointer.removeEventListener('change', handlePreferenceChange);
      cancelAnimationFrame(animationFrame);
    };
  }, [cellSize, color, interactive, mobileCellSize, motionEnabled, speed]);

  return (
    <div
      className={['interactive-square-grid', className].filter(Boolean).join(' ')}
      data-slot="interactive-square-grid"
      ref={hostRef}
      {...rest}
    >
      <canvas
        aria-hidden="true"
        className="interactive-square-grid__canvas"
        ref={canvasRef}
      />
    </div>
  );
}
