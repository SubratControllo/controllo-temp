import { memo, useCallback, useEffect, useRef } from 'react';

const STAR_COLORS = ['#FFFFFF', '#FFFFAA', '#AAAAFF', '#FFAAAA', '#AAFFAA', '#FFAAFF', '#AAFFFF'];
const STAR_DENSITY = 0.00004;
const TWINKLE_PROBABILITY = 0.7;
const MIN_TWINKLE_SPEED = 2;
const MAX_TWINKLE_SPEED = 4;
const PIXEL_SIZE = 5;
const STAR_REGENERATION_INTERVAL = 5000;
const PERCENT_TO_REGENERATE = 0.15;
const SHOOTING_STAR_PIXEL_SIZE = 2;
const TARGET_FPS = 16;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const MAX_DPR = 2;

const BackgroundPixelStars = memo(function BackgroundPixelStars({ motionEnabled = true }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(0);
  const backgroundStarsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const lastRenderTimeRef = useRef(0);
  const sizeRef = useRef({ width: 1, height: 1 });
  const visibleRef = useRef(true);

  const getRandomStartPoint = useCallback(() => ({
    x: Math.random() * sizeRef.current.width,
    y: 0,
    angle: 45 + Math.random() * 90,
  }), []);

  const createNewShootingStar = useCallback(() => {
    const { x, y, angle } = getRandomStartPoint();
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      speed: Math.random() * 5 + 8,
      distance: 0,
      trail: [],
    };
  }, [getRandomStartPoint]);

  const initBackgroundStars = useCallback(() => {
    const { width, height } = sizeRef.current;
    const count = Math.max(1, Math.floor(width * height * STAR_DENSITY));

    backgroundStarsRef.current = Array.from({ length: count }, () => {
      const baseOpacity = Math.random() * 0.5 + 0.5;
      return {
        x: Math.floor(Math.random() * (width / PIXEL_SIZE)) * PIXEL_SIZE,
        y: Math.floor(Math.random() * (height / PIXEL_SIZE)) * PIXEL_SIZE,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        baseOpacity,
        currentOpacity: baseOpacity,
        twinkle: Math.random() < TWINKLE_PROBABILITY,
        twinkleSpeed: MIN_TWINKLE_SPEED + Math.random() * (MAX_TWINKLE_SPEED - MIN_TWINKLE_SPEED),
        twinkleDirection: -1,
        twinkleTimer: 0,
      };
    });
  }, []);

  const regenerateBackgroundStars = useCallback(() => {
    if (!visibleRef.current || !backgroundStarsRef.current.length) return;

    const { width, height } = sizeRef.current;
    const count = Math.max(1, Math.floor(backgroundStarsRef.current.length * PERCENT_TO_REGENERATE));

    for (let index = 0; index < count; index += 1) {
      const starIndex = Math.floor(Math.random() * backgroundStarsRef.current.length);
      const baseOpacity = Math.random() * 0.5 + 0.5;
      backgroundStarsRef.current[starIndex] = {
        x: Math.floor(Math.random() * (width / PIXEL_SIZE)) * PIXEL_SIZE,
        y: Math.floor(Math.random() * (height / PIXEL_SIZE)) * PIXEL_SIZE,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        baseOpacity,
        currentOpacity: baseOpacity,
        twinkle: Math.random() < TWINKLE_PROBABILITY,
        twinkleSpeed: MIN_TWINKLE_SPEED + Math.random() * (MAX_TWINKLE_SPEED - MIN_TWINKLE_SPEED),
        twinkleDirection: -1,
        twinkleTimer: 0,
      };
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!host || !canvas || !context) return undefined;

    let regenerationInterval = 0;
    let shootingStarTimer = 0;

    const draw = (update = false) => {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      backgroundStarsRef.current.forEach((star) => {
        context.fillStyle = star.color;
        context.globalAlpha = star.currentOpacity;
        context.fillRect(star.x, star.y, PIXEL_SIZE, PIXEL_SIZE);

        if (!update || !star.twinkle) return;
        star.twinkleTimer += 1 / TARGET_FPS;

        if (star.twinkleTimer >= star.twinkleSpeed) {
          star.twinkleTimer = 0;
          star.twinkleDirection *= -1;
        }

        const progress = star.twinkleTimer / star.twinkleSpeed;
        if (progress < 0.5) {
          star.currentOpacity = star.twinkleDirection < 0 ? star.baseOpacity : star.baseOpacity * 0.3;
        } else {
          star.currentOpacity = star.twinkleDirection < 0 ? star.baseOpacity * 0.3 : star.baseOpacity;
        }
      });

      if (update) {
        shootingStarsRef.current = shootingStarsRef.current
          .map((star) => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;
            const trail = [...star.trail];

            if (newDistance % 8 < star.speed) trail.push({ x: star.x, y: star.y, opacity: 1 });

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              trail: trail
                .map((point) => ({ ...point, opacity: point.opacity - 0.1 }))
                .filter((point) => point.opacity > 0),
            };
          })
          .filter((star) => star.x >= -30 && star.x <= width + 30 && star.y >= -30 && star.y <= height + 30);
      }

      shootingStarsRef.current.forEach((star) => {
        star.trail.forEach((point) => {
          context.save();
          context.translate(point.x, point.y);
          context.rotate((star.angle * Math.PI) / 180);
          context.translate(-point.x, -point.y);
          context.fillStyle = `rgba(180, 242, 255, ${point.opacity})`;
          context.fillRect(point.x, point.y, SHOOTING_STAR_PIXEL_SIZE, SHOOTING_STAR_PIXEL_SIZE);
          context.restore();
        });

        context.save();
        context.translate(star.x, star.y);
        context.rotate((star.angle * Math.PI) / 180);
        context.translate(-star.x, -star.y);
        context.fillStyle = '#ffffff';
        context.globalAlpha = 1;

        for (let y = 0; y < 2; y += 1) {
          for (let x = 0; x < 4; x += 1) {
            if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue;
            context.fillRect(
              star.x + x * SHOOTING_STAR_PIXEL_SIZE,
              star.y + y * SHOOTING_STAR_PIXEL_SIZE,
              SHOOTING_STAR_PIXEL_SIZE,
              SHOOTING_STAR_PIXEL_SIZE,
            );
          }
        }

        context.restore();
      });

      context.globalAlpha = 1;
    };

    const animateCanvas = (timestamp) => {
      animationFrameRef.current = 0;
      if (!motionEnabled || !visibleRef.current || document.hidden) return;

      if (timestamp - lastRenderTimeRef.current >= FRAME_INTERVAL) {
        lastRenderTimeRef.current = timestamp;
        draw(true);
      }

      animationFrameRef.current = requestAnimationFrame(animateCanvas);
    };

    const wake = () => {
      if (!animationFrameRef.current && motionEnabled && visibleRef.current && !document.hidden) {
        animationFrameRef.current = requestAnimationFrame(animateCanvas);
      }
    };

    const scheduleShootingStar = () => {
      if (motionEnabled && visibleRef.current && !document.hidden) {
        shootingStarsRef.current = [...shootingStarsRef.current, createNewShootingStar()];
      }
      shootingStarTimer = window.setTimeout(scheduleShootingStar, Math.random() * 4000 + 2000);
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      sizeRef.current = { width, height };
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      initBackgroundStars();
      shootingStarsRef.current = [];
      draw();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      } else {
        wake();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry?.isIntersecting ?? true;
      if (visibleRef.current) wake();
      else {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resize();

    if (motionEnabled) {
      scheduleShootingStar();
      regenerationInterval = window.setInterval(regenerateBackgroundStars, STAR_REGENERATION_INTERVAL);
      wake();
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameRef.current);
      window.clearInterval(regenerationInterval);
      window.clearTimeout(shootingStarTimer);
      animationFrameRef.current = 0;
    };
  }, [createNewShootingStar, initBackgroundStars, motionEnabled, regenerateBackgroundStars]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      data-background-pixel-stars=""
      ref={hostRef}
    >
      <canvas className="size-full" ref={canvasRef} />
    </div>
  );
});

export default BackgroundPixelStars;
