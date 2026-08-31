import Reveal from "../components/Reveal";

export default function ProofSection({ motionEnabled }) {
  return (
    <section className="section bg-shell" id="customers">
      <div className="shell grid grid-cols-[1.12fr_.88fr] items-center gap-20 max-[1080px]:grid-cols-1 max-[760px]:gap-13">
        <Reveal motionEnabled={motionEnabled}>
          <div>
            <p className="eyebrow">A program leaders can explain</p>
            <h2>Proof should arrive with its context intact.</h2>
            <p className="lede mt-6">
              Keep the source, owner, scope, review, and decision connected from
              daily operations through the audit conversation.
            </p>
            <small className="mt-8 block font-mono text-[.58rem] font-medium leading-[1.6] tracking-wider uppercase text-teal">
              Customer evidence and quantified outcomes will be published only
              after approval.
            </small>
          </div>
        </Reveal>
        <Reveal
          className="grid gap-3.5"
          motionEnabled={motionEnabled}
          delay={0.08}
        >
          <div className="grid min-h-22.5 grid-cols-[92px_1fr] items-center gap-5 rounded-[20px] bg-white/62 px-5.5 py-5 max-[420px]:grid-cols-[76px_1fr]">
            <strong className="text-[1.7rem]">Current</strong>
            <span className="text-[.76rem] text-muted">
              Evidence stays linked to scope, ownership, and review status.
            </span>
          </div>
          <div className="grid min-h-22.5 grid-cols-[92px_1fr] items-center gap-5 rounded-[20px] bg-white/62 px-5.5 py-5 max-[420px]:grid-cols-[76px_1fr]">
            <strong className="text-[1.7rem]">Reusable</strong>
            <span className="text-[.76rem] text-muted">
              Approved controls can support more than one assurance path.
            </span>
          </div>
          <div className="grid min-h-22.5 grid-cols-[92px_1fr] items-center gap-5 rounded-[20px] bg-white/62 px-5.5 py-5 max-[420px]:grid-cols-[76px_1fr]">
            <strong className="text-[1.7rem]">Visible</strong>
            <span className="text-[.76rem] text-muted">
              Leaders can understand readiness without reconstructing the trail.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
