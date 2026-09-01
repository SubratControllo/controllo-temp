import { useCallback, useEffect, useRef, useState } from 'react';
import { FileCheck2, RefreshCw, ScanSearch, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const SECURA_REVIEW_DELAYS = { scope: 650, reviewing: 850 };

export default function CyberSecuraSection({ content, motionEnabled }) {
  const panelRef = useRef(null);
  const timersRef = useRef([]);
  const hasPlayedRef = useRef(false);
  const canPlay = motionEnabled && typeof IntersectionObserver !== 'undefined';
  const [phase, setPhase] = useState(canPlay ? 'scope' : 'result');

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setPhase('scope');
    timersRef.current = [
      window.setTimeout(() => setPhase('reviewing'), SECURA_REVIEW_DELAYS.scope),
      window.setTimeout(
        () => setPhase('result'),
        SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing
      )
    ];
  }, [clearTimers]);

  useEffect(() => {
    if (!canPlay) {
      clearTimers();
      setPhase('result');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45 && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          play();
        }
      },
      { threshold: [0.45] }
    );

    observer.observe(panelRef.current);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [canPlay, clearTimers, play]);

  return (
    <section className="section overflow-hidden bg-navy text-white" aria-labelledby="cyber-secura-title">
      <div className="shell grid grid-cols-[.82fr_1.18fr] items-center gap-20 max-[1080px]:grid-cols-1">
        <div className="max-w-150">
          <p className="eyebrow text-mint">{content.eyebrow}</p>
          <h2 id="cyber-secura-title" className="text-white">{content.title}</h2>
          <p className="mt-6 mb-0 text-[1rem] leading-[1.75] text-[#b8c8d5]">{content.description}</p>
          <ol className="mt-9 grid grid-cols-4 gap-2 border-t border-white/14 pt-5 max-[520px]:grid-cols-2" aria-label="Secura review workflow">
            {content.workflow.map((step, index) => (
              <li className="list-none font-mono text-[.64rem] text-mint" key={step}>
                0{index + 1} · {step}
              </li>
            ))}
          </ol>
        </div>

        <article
          ref={panelRef}
          className="min-h-145 overflow-hidden rounded-[26px] border border-white/14 bg-white text-navy shadow-form max-[760px]:min-h-155"
          aria-label="Illustrative Secura control review"
          data-phase={phase}
        >
          <header className="flex min-h-15 items-center justify-between border-b border-line px-5">
            <span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-teal">Control review dossier</span>
            <span className="text-[.64rem] text-muted">Illustrative product view</span>
          </header>

          <motion.div
            key={phase}
            className="p-6 max-[520px]:p-4"
            initial={canPlay ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
          >
              {phase === 'scope' && (
                <div>
                  <ShieldCheck className="size-5 text-teal" aria-hidden="true" />
                  <p className="mt-8 font-mono text-[.65rem] uppercase text-teal">Review scope</p>
                  <h3 className="mt-2">{content.control}</h3>
                  <ul className="mt-8 list-none border-t border-line pl-0">
                    {content.sources.map((source) => (
                      <li className="flex min-h-14 items-center justify-between border-b border-line text-[.75rem]" key={source.label}>
                        <span>{source.label}</span>
                        <span className="text-muted">{source.state}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {phase === 'reviewing' && (
                <div className="grid min-h-112 place-items-center text-center">
                  <div>
                    <ScanSearch className="mx-auto size-8 text-teal" aria-hidden="true" />
                    <h3 className="mt-5">Reviewing connected context</h3>
                    <p className="mt-3 text-[.75rem] text-muted">Requirement · Implementation · Policy · Evidence</p>
                  </div>
                </div>
              )}

              {phase === 'result' && (
                <div>
                  <FileCheck2 className="size-5 text-teal" aria-hidden="true" />
                  <p className="mt-8 font-mono text-[.65rem] uppercase text-teal">Review result</p>
                  <h3 className="mt-2">2 gaps identified</h3>
                  <ul className="mt-7 list-none border-t border-line pl-0">
                    {content.gaps.map((gap) => (
                      <li className="border-b border-line py-4 text-[.76rem]" aria-label={`Gap: ${gap}`} key={gap}>
                        {gap}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-[18px] bg-mint-soft p-5">
                    <span className="font-mono text-[.6rem] uppercase text-teal">Recommended review action</span>
                    <p className="mt-3 mb-0 text-[.78rem] leading-[1.6]">{content.recommendation}</p>
                  </div>
                  <p className="mt-4 text-[.68rem] text-muted">Validate findings before taking action.</p>
                </div>
              )}
          </motion.div>

          <div className="flex justify-end border-t border-line px-5 py-3">
            <button
              className="inline-flex min-h-11.5 items-center gap-2 rounded-[14px] border border-line bg-white px-4 text-[.72rem] text-teal"
              type="button"
              onClick={() => {
                hasPlayedRef.current = true;
                if (canPlay) play();
                else setPhase('result');
              }}
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Replay Secura review
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
