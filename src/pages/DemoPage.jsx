import { CheckCircle2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import LeadForm from '../components/LeadForm';

const expectations = [
  'A practical view of your current operating friction',
  'A walkthrough shaped around your program',
  'Clear next steps, whether or not Controllo is the fit'
];

export default function DemoPage() {
  return <>
    <PageMeta
      title="Request a demo"
      description="Request a focused Controllo walkthrough shaped around your compliance program and readiness priorities."
    />
    <section className="-mt-[100px] min-h-[900px] bg-[linear-gradient(135deg,var(--color-navy),#073d58)] pt-[210px] pb-[120px] text-white max-[760px]:pt-[170px] max-[760px]:pb-[90px]">
      <div className="shell grid grid-cols-[.9fr_1.1fr] items-start gap-[90px] max-[1080px]:grid-cols-1 max-[760px]:gap-[52px]">
        <div className="relative top-auto min-[1081px]:sticky min-[1081px]:top-[150px]">
          <p className="eyebrow text-mint">A focused readiness conversation</p>
          <h1>Bring one real workflow. Leave with a clearer path.</h1>
          <p className="lede mt-[26px] text-[#b8cad6]">We’ll focus the conversation on where evidence, controls, risk, or audit work is losing momentum in your program.</p>
          <div className="mt-[70px] border-t border-white/15 pt-[30px]">
            <h2 className="text-[1rem]!">What to expect</h2>
            {expectations.map((item) => <p className="flex items-center gap-2.5 text-[.76rem] text-[#c4d4dd] [&>svg]:w-[17px] [&>svg]:text-mint" key={item}><CheckCircle2 aria-hidden="true" />{item}</p>)}
          </div>
        </div>
        <div className="rounded-[30px] bg-white p-9 text-navy shadow-form max-[760px]:p-[22px]"><LeadForm /></div>
      </div>
    </section>
  </>;
}
