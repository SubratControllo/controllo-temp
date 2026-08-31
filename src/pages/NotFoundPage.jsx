import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The requested Controllo page could not be found."
      />
      <section className="relative -mt-[100px] min-h-[760px] overflow-hidden bg-navy pt-[230px] pb-[120px] text-white">
        <div className="not-found__wave" aria-hidden="true" />
        <div className="shell relative z-[1]">
          <span className="font-mono text-[.65rem] font-medium leading-none text-mint">
            404 / SIGNAL LOST
          </span>
          <h1 className="mt-[30px]">This path has drifted.</h1>
          <p className="mt-5 mb-[34px] text-[#b8cad6]">
            The page may have moved, but your readiness path is still here.
          </p>
          <Link className="button button--mint button--directional" to="/">
            Return home <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
