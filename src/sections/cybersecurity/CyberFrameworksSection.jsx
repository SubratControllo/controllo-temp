import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, FileCheck2, Layers3, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const sharedControls = [
  ['Access governance', ShieldCheck],
  ['Asset inventory', Layers3],
  ['Incident response', FileCheck2],
];

const emptyConnectorGeometry = {
  controlPaths: Array(3).fill(''),
  coveragePaths: Array(10).fill(''),
  height: 1,
  width: 1,
};

const pointFor = (element, containerBox) => {
  const box = element.getBoundingClientRect();
  return {
    x: box.left + box.width / 2 - containerBox.left,
    y: box.top + box.height / 2 - containerBox.top,
  };
};

const formatPoint = ({ x, y }) => `${Number(x.toFixed(2))} ${Number(y.toFixed(2))}`;

function buildConnectorGeometry(field, sources, hub, targets) {
  const fieldBox = field.getBoundingClientRect();
  if (!fieldBox.width || !fieldBox.height) return null;

  const hubPoint = pointFor(hub, fieldBox);
  const sourcePoints = sources.map((source) => pointFor(source, fieldBox));
  const targetPoints = targets.map((target) => pointFor(target, fieldBox));
  const isVertical = sourcePoints.every((point) => point.y < hubPoint.y - 8);

  const controlPaths = sourcePoints.map((source) => {
    if (isVertical) {
      const midY = (source.y + hubPoint.y) / 2;
      return `M ${formatPoint(source)} C ${formatPoint({ x: source.x, y: midY })} ${formatPoint({ x: hubPoint.x, y: midY })} ${formatPoint(hubPoint)}`;
    }

    const midX = (source.x + hubPoint.x) / 2;
    return `M ${formatPoint(source)} C ${formatPoint({ x: midX, y: source.y })} ${formatPoint({ x: midX, y: hubPoint.y })} ${formatPoint(hubPoint)}`;
  });

  const targetYs = targetPoints.map(({ y }) => y);
  const busStartY = Math.min(...targetYs);
  const busEndY = Math.max(...targetYs);
  const leftTargetXs = targetPoints.filter((_, index) => index % 2 === 0).map(({ x }) => x);
  const rightTargetXs = targetPoints.filter((_, index) => index % 2 === 1).map(({ x }) => x);
  const busX = (
    Math.max(...leftTargetXs) + Math.min(...rightTargetXs)
  ) / 2;
  const trunk = isVertical
    ? `M ${formatPoint(hubPoint)} H ${Number(busX.toFixed(2))} V ${Number(busStartY.toFixed(2))}`
    : `M ${formatPoint(hubPoint)} H ${Number(busX.toFixed(2))}`;
  const bus = `M ${formatPoint({ x: busX, y: busStartY })} V ${Number(busEndY.toFixed(2))}`;
  const branches = targetPoints.map((target) => (
    `M ${formatPoint({ x: busX, y: target.y })} L ${formatPoint(target)}`
  ));

  return {
    controlPaths,
    coveragePaths: [trunk, bus, ...branches],
    height: Number(fieldBox.height.toFixed(2)),
    width: Number(fieldBox.width.toFixed(2)),
  };
}

function FlowPath({ d, type, isAnimated, targetIndex }) {
  return (
    <path
      className={`framework-flow framework-flow-${type} fill-none stroke-teal/35`}
      d={d}
      data-flow={type}
      data-flow-target={targetIndex}
      pathLength="1"
      strokeDasharray={isAnimated ? 1 : undefined}
      strokeDashoffset={isAnimated ? 1 : undefined}
      strokeLinecap="round"
      strokeWidth="1.35"
      vectorEffect="non-scaling-stroke"
    />
  );
}

export default function CyberFrameworksSection({ frameworks, motionEnabled }) {
  const figureRef = useRef(null);
  const connectorFieldRef = useRef(null);
  const hubRef = useRef(null);
  const sourceRefs = useRef([]);
  const targetRefs = useRef([]);
  const connectorGeometrySignatureRef = useRef('');
  const [connectorGeometry, setConnectorGeometry] = useState(emptyConnectorGeometry);
  const canAnimate = motionEnabled && typeof IntersectionObserver !== 'undefined';

  const measureConnectorGeometry = () => {
    const field = connectorFieldRef.current;
    const hub = hubRef.current;
    const sources = sourceRefs.current.filter(Boolean);
    const targets = targetRefs.current.filter(Boolean);
    if (
      !field
      || !hub
      || sources.length !== sharedControls.length
      || targets.length === 0
      || targets.length !== frameworks.length
    ) {
      return;
    }

    const nextGeometry = buildConnectorGeometry(field, sources, hub, targets);
    if (!nextGeometry) return;

    const signature = [
      nextGeometry.width,
      nextGeometry.height,
      ...nextGeometry.controlPaths,
      ...nextGeometry.coveragePaths,
    ].join('|');
    if (signature === connectorGeometrySignatureRef.current) return;

    connectorGeometrySignatureRef.current = signature;
    setConnectorGeometry(nextGeometry);
  };

  useLayoutEffect(() => {
    measureConnectorGeometry();
  });

  useLayoutEffect(() => {
    const field = connectorFieldRef.current;
    const hub = hubRef.current;
    const sources = sourceRefs.current.filter(Boolean);
    const targets = targetRefs.current.filter(Boolean);
    if (!field || !hub || sources.length !== sharedControls.length || !targets.length) {
      return undefined;
    }

    let animationFrame;
    let disposed = false;
    const recalculate = () => {
      animationFrame = undefined;
      if (disposed) return;
      measureConnectorGeometry();
    };
    const scheduleRecalculation = () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(recalculate);
    };

    recalculate();

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(scheduleRecalculation);
    [field, hub, ...sources, ...targets].forEach((element) => resizeObserver?.observe(element));
    window.addEventListener('resize', scheduleRecalculation);
    document.fonts?.ready?.then(scheduleRecalculation).catch(() => {});

    return () => {
      disposed = true;
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleRecalculation);
    };
  }, [frameworks]);

  useEffect(() => {
    if (!canAnimate || !figureRef.current) return undefined;

    let observer;
    let hasPlayed = false;
    const context = gsap.context(() => {
      const controlPaths = gsap.utils.toArray('.framework-flow-control');
      const coveragePaths = gsap.utils.toArray('.framework-flow-coverage');
      const endpoints = gsap.utils.toArray('[data-framework-endpoint]');
      const frameworkNames = gsap.utils.toArray('.framework-field-name');
      const emblem = figureRef.current.querySelector('.framework-field-emblem');

      gsap.set([...controlPaths, ...coveragePaths], {
        attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 },
      });
      gsap.set(emblem, { autoAlpha: 0, scale: 0.84, transformOrigin: '50% 50%' });
      gsap.set(endpoints, { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%' });
      gsap.set(frameworkNames, { autoAlpha: 0, y: 6 });

      const timeline = gsap.timeline({ paused: true });
      timeline
        .to(controlPaths, {
          attr: { 'stroke-dashoffset': 0 },
          duration: 0.54,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .to(emblem, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, '-=0.16')
        .to(coveragePaths, {
          attr: { 'stroke-dashoffset': 0 },
          duration: 0.78,
          stagger: 0.06,
          ease: 'power2.inOut',
        }, '-=0.08')
        .to(endpoints, {
          autoAlpha: 1,
          scale: 1.12,
          duration: 0.18,
          stagger: 0.04,
          ease: 'power3.out',
        }, '-=0.52')
        .to(endpoints, {
          scale: 1,
          duration: 0.18,
          stagger: 0.04,
          ease: 'power3.out',
        }, '-=0.08')
        .to(frameworkNames, {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          stagger: 0.05,
          ease: 'power3.out',
        }, '-=0.38');

      observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          if (isVisible) {
            if (!hasPlayed) hasPlayed = true;
            if (timeline.progress() < 1) timeline.play();
          } else if (timeline.progress() < 1) {
            timeline.pause();
          }
        },
        { threshold: [0, 0.35] },
      );
      observer.observe(figureRef.current);
    }, figureRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, [canAnimate]);

  const initialFlowStyle = canAnimate ? { opacity: 0 } : undefined;
  const initialEndpointStyle = canAnimate ? { opacity: 0, transform: 'scale(.92)' } : undefined;

  return (
    <section
      className="section overflow-hidden bg-white"
      aria-labelledby="cyber-frameworks-title"
    >
      <div className="shell grid grid-cols-[.72fr_1.28fr] items-center gap-18 max-[1080px]:grid-cols-1">
        <div className="max-w-145">
          <p className="eyebrow">Framework coverage</p>
          <h2 id="cyber-frameworks-title">Start with one framework. Expand when you need to.</h2>
          <p className="lede mt-6">
            Activate the cyber and cloud requirements relevant today, then extend mapped controls
            and linked evidence as customer, regulatory, and market expectations evolve.
          </p>
          <p className="mt-8 font-mono text-[.68rem] text-muted">
            100+ global and regional frameworks
          </p>
          <Link
            className="group mt-8 inline-flex min-h-11.5 items-center gap-2 text-[.8rem] font-medium text-teal transition-colors duration-200 hover:text-navy focus-visible:text-navy"
            to="/frameworks"
          >
            Explore All Frameworks
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div role="region" aria-label="Reusable framework coverage">
          <figure
            ref={figureRef}
            className="relative isolate overflow-hidden border-y border-line bg-mist select-none"
            aria-label="Shared controls mapped to distinct framework scope"
            data-motion={canAnimate ? 'animated' : 'static'}
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_40%_54%,rgba(38,216,173,.13),transparent_34%)]"
              aria-hidden="true"
            />

            <div className="flex min-h-21 items-center border-b border-line px-7 py-5 max-[520px]:px-5">
              <h3 className="text-[1.05rem] font-medium">Shared controls, distinct framework scope</h3>
            </div>

            <div
              ref={connectorFieldRef}
              className="relative grid min-h-105 grid-cols-[31%_28%_41%] max-[760px]:min-h-0 max-[760px]:grid-cols-1"
              data-connector-field
            >
              <svg
                className="pointer-events-none absolute inset-0 z-0 size-full"
                data-connector-svg
                viewBox={`0 0 ${connectorGeometry.width} ${connectorGeometry.height}`}
                aria-hidden="true"
              >
                {connectorGeometry.controlPaths.map((path, index) => (
                  <FlowPath d={path} type="control" isAnimated={canAnimate} key={`control-${index}`} />
                ))}
                {connectorGeometry.coveragePaths.map((path, index) => (
                  <FlowPath
                    d={path}
                    type="coverage"
                    isAnimated={canAnimate}
                    key={`coverage-${index}`}
                    targetIndex={index >= 2 ? index - 2 : undefined}
                  />
                ))}
              </svg>

              <ul
                className="relative z-10 grid list-none grid-rows-3 py-8 pl-7 pr-4 max-[760px]:h-36 max-[760px]:grid-cols-3 max-[760px]:grid-rows-1 max-[760px]:gap-2 max-[760px]:px-4 max-[760px]:py-5"
                aria-label="Reusable control areas"
              >
                {sharedControls.map(([label, Icon], index) => (
                  <li
                    className="relative flex min-w-0 items-center gap-3 pr-3 max-[760px]:flex-col max-[760px]:justify-start max-[760px]:gap-2 max-[760px]:px-1 max-[760px]:pb-2 max-[760px]:text-center"
                    key={label}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-teal/20 bg-mist text-teal" aria-hidden="true">
                      <Icon className="size-4" strokeWidth={1.7} />
                    </span>
                    <span className="bg-mist py-1 text-[.74rem] font-medium leading-tight max-[760px]:text-[.65rem]">{label}</span>
                    <span
                      ref={(element) => { sourceRefs.current[index] = element; }}
                      className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-teal max-[760px]:right-auto max-[760px]:top-auto max-[760px]:bottom-0 max-[760px]:left-1/2 max-[760px]:translate-y-1/2 max-[760px]:-translate-x-1/2"
                      data-control-anchor={index}
                      data-connector-dot
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>

              <div className="relative z-10 flex items-center justify-end max-[760px]:h-24 max-[760px]:justify-center">
                <div
                  ref={hubRef}
                  className="framework-field-emblem relative flex size-16 items-center justify-center rounded-full border border-teal/25 bg-white shadow-[0_14px_35px_rgba(6,27,50,.1)]"
                  data-connector-hub
                  style={initialFlowStyle}
                >
                  <span className="absolute inset-[-9px] rounded-full border border-teal/10" aria-hidden="true" />
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-8"
                    data-testid="framework-field-emblem"
                    draggable="false"
                    src="/assets/emblemLogo.svg"
                  />
                </div>
              </div>

              <ul
                className="relative z-10 grid list-none grid-cols-2 grid-rows-4 gap-x-5 py-6 pr-7 pl-5 max-[760px]:h-80 max-[760px]:gap-x-0 max-[760px]:px-4 max-[760px]:pt-2 max-[760px]:pb-5"
                aria-label="Featured cyber and cloud frameworks"
              >
                {frameworks.map((framework, index) => (
                  <li
                    className={`flex min-w-0 items-center gap-2 ${index % 2 === 0 ? 'flex-row-reverse justify-start pr-5' : 'pl-5'}`}
                    data-motion={canAnimate ? 'animated' : 'static'}
                    key={framework.name}
                  >
                    <span
                      ref={(element) => { targetRefs.current[index] = element; }}
                      className="framework-field-endpoint size-2 shrink-0 rounded-full border-2 border-mist bg-teal shadow-[0_0_0_1px_rgba(8,127,140,.28)]"
                      data-connector-dot
                      data-framework-endpoint={index}
                      style={initialEndpointStyle}
                      aria-hidden="true"
                    />
                    <span
                      className="framework-field-name bg-mist py-1 pr-1 text-[.7rem] font-medium leading-tight text-navy max-[520px]:text-[.64rem]"
                      style={initialFlowStyle}
                    >
                      {framework.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
