import Reveal from "../components/Reveal";

const trustMarks = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "NIST", "ISO 42001"];

export default function TrustStrip({ motionEnabled }) {
  return (
    <section
      className="bg-white pt-11.5 pb-18"
      aria-label="Framework paths supported by the platform experience"
    >
      <Reveal
        className="shell grid grid-cols-[240px_1fr] items-center gap-12 max-[760px]:grid-cols-1 max-[760px]:gap-6"
        motionEnabled={motionEnabled}
      >
        <p className="m-0 text-[.78rem] text-muted">
          Build one operating rhythm across the assurance paths that matter.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-6 font-medium text-[#748494] tracking-[-.02em] max-[760px]:justify-start max-[760px]:gap-x-7 max-[760px]:gap-y-4.5">
          {trustMarks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
