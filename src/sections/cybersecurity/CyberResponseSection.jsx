import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function CyberResponseSection({ items, motionEnabled }) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!motionEnabled || typeof IntersectionObserver === 'undefined') return undefined;
    const rows = Array.from(listRef.current?.querySelectorAll('[data-response-index]') ?? []);
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveIndex(Number(current.target.dataset.responseIndex));
    }, { threshold: [0.45, 0.6, 0.75], rootMargin: '-12% 0px -28% 0px' });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [motionEnabled, items]);

  const active = items[activeIndex];

  return (
    <section className="section bg-white" aria-labelledby="cyber-response-title">
      <div className="shell">
        <header className="section-heading max-w-210"><p className="eyebrow">A connected cyber program</p><h2 id="cyber-response-title">Turn compliance friction into clearer action.</h2><p className="lede mt-6">Modern cyber and cloud programs must keep evidence reviewable, extend work across overlapping frameworks, respond to changing environments, assess risk consistently, and coordinate with auditors—without adding another disconnected system.</p></header>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(340px,.72fr)] items-start gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
          <ol ref={listRef} className="list-none border-t border-line pl-0" aria-label="Cybersecurity challenges and responses">
            {items.map((item, index) => (
              <li className="grid min-h-62 content-center border-b border-line py-9 max-[760px]:min-h-0" data-response-index={index} data-testid={`cyber-response-row-${index}`} key={item.id}>
                <span className="font-mono text-[.62rem] text-teal">0{index + 1}</span>
                <h3 className="mt-5 max-w-150">{item.challenge}</h3>
                <p className="mt-4 mb-0 max-w-165 text-[.88rem] leading-[1.75] text-muted">{item.response}</p>
                <div className="mt-5 hidden border-l-2 border-mint pl-4 max-[1080px]:block"><strong className="block text-[.78rem]">{item.visual.value}</strong><span className="text-[.68rem] text-muted">{item.visual.detail}</span></div>
              </li>
            ))}
          </ol>
          <div className="sticky top-32 rounded-[24px] border border-navy/12 bg-navy p-7 text-white shadow-elevated max-[1080px]:hidden" aria-label="Current Controllo response example">
            <span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-mint">Illustrative response</span>
            <motion.div key={active.id} initial={motionEnabled ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }}>
              <p className="mt-18 mb-2 text-[.72rem] text-[#b8c8d5]">{active.visual.label}</p>
              <h3 className="text-white">{active.visual.value}</h3>
              <p className="mt-4 mb-0 text-[.75rem] leading-[1.65] text-[#b8c8d5]">{active.visual.detail}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
