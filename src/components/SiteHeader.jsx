import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import HeaderCtaContent from './HeaderCtaContent';
import NavbarIntro, {
  NavbarIntroHighlight,
  NavbarIntroItem,
  NavbarIntroLogo,
  NavbarIntroNav
} from './NavbarIntro';
import { navGroups } from '../data/enterpriseContent';

const finePointerQuery = '(hover: hover) and (pointer: fine) and (min-width: 1081px)';
const panelId = (label) => `nav-panel-${label.toLowerCase().replace(/\s+/g, '-')}`;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const groupRefs = useRef(new Map());
  const triggerRefs = useRef(new Map());
  const closeTimerRef = useRef(null);
  const pointerFocusRef = useRef(false);
  const hoverOpenedGroupRef = useRef(null);
  const focusOpenedGroupRef = useRef(null);
  const suppressFocusOpenRef = useRef(false);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeAll = () => {
    clearCloseTimer();
    hoverOpenedGroupRef.current = null;
    setOpenGroup(null);
    setMenuOpen(false);
  };

  const hasFinePointer = () => (
    typeof window.matchMedia === 'function' && window.matchMedia(finePointerQuery).matches
  );

  const openFromHover = (label) => {
    if (!hasFinePointer()) return;
    clearCloseTimer();
    hoverOpenedGroupRef.current = label;
    setOpenGroup(label);
  };

  const scheduleHoverClose = (label) => {
    if (!hasFinePointer()) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      if (!groupRefs.current.get(label)?.contains(document.activeElement)) {
        if (hoverOpenedGroupRef.current === label) hoverOpenedGroupRef.current = null;
        setOpenGroup((current) => current === label ? null : current);
      }
      closeTimerRef.current = null;
    }, 160);
  };

  const isGroupActive = (group) => {
    const routes = [group.href, ...(group.links?.map(([href]) => href) ?? [])];
    return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  };

  const handleGroupBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearCloseTimer();
      hoverOpenedGroupRef.current = null;
      setOpenGroup(null);
    }
  };

  const handleTriggerFocus = (label) => {
    if (suppressFocusOpenRef.current) return;

    if (pointerFocusRef.current) {
      pointerFocusRef.current = false;
      return;
    }

    clearCloseTimer();
    focusOpenedGroupRef.current = label;
    setOpenGroup(label);
  };

  const handleTriggerClick = (label) => {
    clearCloseTimer();
    pointerFocusRef.current = false;

    if (hoverOpenedGroupRef.current === label) {
      hoverOpenedGroupRef.current = null;
      setOpenGroup(label);
      return;
    }

    if (focusOpenedGroupRef.current === label) {
      focusOpenedGroupRef.current = null;
      setOpenGroup(label);
      return;
    }

    focusOpenedGroupRef.current = null;
    setOpenGroup((current) => current === label ? null : label);
  };

  useEffect(() => {
    clearCloseTimer();
    hoverOpenedGroupRef.current = null;
    focusOpenedGroupRef.current = null;
    pointerFocusRef.current = false;
    setOpenGroup(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closeAll();
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || (!menuOpen && !openGroup)) return;

      const focusTarget = menuOpen ? menuButtonRef.current : triggerRefs.current.get(openGroup);
      suppressFocusOpenRef.current = true;
      closeAll();
      window.requestAnimationFrame(() => {
        focusTarget?.focus();
        suppressFocusOpenRef.current = false;
      });
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, openGroup]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <header ref={headerRef} className="site-header shell pointer-events-none sticky top-4 z-40 pt-4 max-[760px]:top-2 max-[760px]:pt-2">
      <NavbarIntro className="pointer-events-auto relative isolate flex min-h-17 items-center justify-between gap-6 rounded-[22px] border border-navy/9 bg-white/88 py-2.5 pr-3 pl-5 shadow-header backdrop-blur-[18px] max-[760px]:min-h-15 max-[760px]:rounded-[18px] max-[760px]:py-2 max-[760px]:pr-2 max-[760px]:pl-3.5">
        <Link className="relative z-10 inline-flex min-h-11 items-center gap-2.75 text-[1.2rem] font-medium tracking-[-.03em] max-[760px]:text-[1.05rem]" to="/" aria-label="Controllo home" onClick={closeAll}>
          <NavbarIntroLogo>
            <BrandLogo variant="dark" />
          </NavbarIntroLogo>
        </Link>

        <NavbarIntroNav
          id="primary-navigation"
          className={menuOpen
            ? 'primary-nav is-open absolute top-20.5 right-6 left-6 z-10 grid max-h-[calc(100dvh-112px)] gap-0.5 overflow-y-auto overscroll-contain rounded-[18px] border border-line bg-white p-3.5 shadow-elevated min-[1081px]:static min-[1081px]:flex min-[1081px]:max-h-none min-[1081px]:items-center min-[1081px]:gap-6.5 min-[1081px]:overflow-visible min-[1081px]:rounded-none min-[1081px]:border-0 min-[1081px]:bg-transparent min-[1081px]:p-0 min-[1081px]:shadow-none'
            : 'primary-nav relative z-10 hidden items-center gap-6.5 min-[1081px]:flex'}
          aria-label="Primary navigation"
        >
          {navGroups.map((group, groupIndex) => group.links ? (
            <NavbarIntroItem
              ref={(node) => {
                if (node) groupRefs.current.set(group.label, node);
                else groupRefs.current.delete(group.label);
              }}
              className="nav-group relative block min-h-11 min-[1081px]:flex min-[1081px]:items-center"
              delay={0.28 + groupIndex * 0.04}
              key={group.label}
              onMouseEnter={() => openFromHover(group.label)}
              onMouseLeave={() => scheduleHoverClose(group.label)}
              onBlur={handleGroupBlur}
            >
              <button
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-1.25 border-0 bg-transparent px-3 py-0 text-[.84rem] text-nav-text transition-colors hover:text-teal aria-[current=page]:text-teal min-[1081px]:w-auto min-[1081px]:justify-start min-[1081px]:p-0 [&>svg]:w-3.5 [&>svg]:transition-transform aria-expanded:[&>svg]:rotate-180"
                ref={(node) => {
                  if (node) triggerRefs.current.set(group.label, node);
                  else triggerRefs.current.delete(group.label);
                }}
                type="button"
                aria-expanded={openGroup === group.label}
                aria-controls={panelId(group.label)}
                aria-current={isGroupActive(group) ? 'page' : undefined}
                onPointerDown={() => {
                  pointerFocusRef.current = true;
                  focusOpenedGroupRef.current = null;
                }}
                onFocus={() => handleTriggerFocus(group.label)}
                onClick={() => handleTriggerClick(group.label)}
              >
                {group.label}<ChevronDown aria-hidden="true" />
              </button>

              {openGroup === group.label && (
                <div
                  id={panelId(group.label)}
                  className="mega-panel static grid w-auto grid-cols-1 gap-6 rounded-3xl border border-line bg-[#f4f8f7] p-2 shadow-none min-[1081px]:absolute min-[1081px]:top-12 min-[1081px]:left-1/2 min-[1081px]:w-160 min-[1081px]:-translate-x-1/2 min-[1081px]:grid-cols-[180px_1fr] min-[1081px]:bg-white/98 min-[1081px]:p-6 min-[1081px]:shadow-elevated"
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={() => scheduleHoverClose(group.label)}
                >
                  <div className="group/nav-overview relative hidden overflow-hidden rounded-[18px] bg-navy p-4.5 text-white transition-[background-color,box-shadow] duration-300 ease-out min-[1081px]:flex min-[1081px]:flex-col min-[1081px]:items-start min-[1081px]:justify-between">
                    <span
                      className="pointer-events-none absolute right-[-72px] bottom-[-40px] z-0 h-32 w-46 translate-x-7 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,216,173,.28),rgba(16,175,164,.1)_42%,rgba(16,175,164,0)_70%)] opacity-0 blur-xl transition-[opacity,transform] duration-500 ease-out group-hover/nav-overview:translate-x-0 group-hover/nav-overview:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-opacity"
                      aria-hidden="true"
                    />
                    <img
                      className="pointer-events-none absolute right-[-30px] bottom-[-34px] z-0 h-34 w-29 translate-x-5 rotate-[-10deg] scale-95 opacity-[.13] saturate-[.86] transition-[opacity,transform] duration-500 ease-out group-hover/nav-overview:translate-x-0 group-hover/nav-overview:rotate-[-6deg] group-hover/nav-overview:scale-100 group-hover/nav-overview:opacity-[.24] motion-reduce:translate-x-0 motion-reduce:rotate-[-8deg] motion-reduce:scale-100 motion-reduce:transition-opacity"
                      src="/assets/emblemLogo.svg"
                      alt=""
                      aria-hidden="true"
                      draggable="false"
                    />
                    <span className="relative z-10 font-mono text-[.61rem] font-medium leading-normal tracking-widest uppercase text-mint">Explore {group.label}</span>
                    <Link className="relative z-10 flex gap-1.75 text-[.76rem] text-white [&>svg]:size-3.75 [&>svg]:shrink-0 [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5" to={group.href} onClick={closeAll}>View overview <ArrowRight aria-hidden="true" /></Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 min-[761px]:grid-cols-2">
                    {group.links.map(([href, label, detail]) => (
                      <Link className="group/nav-option relative flex min-h-16 flex-col items-start justify-center overflow-hidden rounded-[15px] p-3.5 transition-[background,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-panel-hover focus-visible:bg-panel-hover min-[761px]:min-h-20" to={href} key={href} onClick={closeAll}>
                        <span
                          className="pointer-events-none absolute top-1/2 -right-9 z-0 h-16 w-28 -translate-y-1/2 translate-x-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,216,173,.22),rgba(38,216,173,0)_68%)] opacity-0 blur-lg transition-[opacity,transform] duration-500 ease-out group-hover/nav-option:translate-x-0 group-hover/nav-option:opacity-100 group-focus-visible/nav-option:translate-x-0 group-focus-visible/nav-option:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-opacity"
                          aria-hidden="true"
                        />
                        <img
                          className="pointer-events-none absolute top-1/2 -right-4 z-0 h-23 w-20 -translate-y-1/2 translate-x-5 -rotate-10 scale-95 opacity-0 saturate-[.88] transition-[opacity,transform] duration-500 ease-out group-hover/nav-option:translate-x-0 group-hover/nav-option:-rotate-6 group-hover/nav-option:scale-100 group-hover/nav-option:opacity-[.12] group-focus-visible/nav-option:translate-x-0 group-focus-visible/nav-option:-rotate-6 group-focus-visible/nav-option:scale-100 group-focus-visible/nav-option:opacity-[.12] motion-reduce:translate-x-0 motion-reduce:-rotate-6 motion-reduce:scale-100 motion-reduce:transition-opacity"
                          src="/assets/emblemLogo.svg"
                          alt=""
                          aria-hidden="true"
                          draggable="false"
                        />
                        <strong className="relative z-10 block text-[.76rem]">{label}</strong>
                        <small className="relative z-10 mt-1.25 block text-[.63rem] leading-[1.45] text-muted">{detail}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </NavbarIntroItem>
          ) : (
            <NavbarIntroItem className="flex" delay={0.28 + groupIndex * 0.04} key={group.label}>
              <NavLink className={({ isActive }) => `inline-flex min-h-11 items-center px-3 text-[.84rem] transition-colors hover:text-teal min-[1081px]:p-0 ${isActive ? 'text-teal' : 'text-nav-text'}`} to={group.href} onClick={closeAll}>{group.label}</NavLink>
            </NavbarIntroItem>
          ))}

          <div className="mx-2 mt-2.5 mb-1 hidden gap-2 max-[1080px]:grid min-[1081px]:hidden">
            <Link
              className="button button--ghost min-h-11.5 w-full bg-white/72 px-4 transition-[background-color,color,box-shadow] duration-200 hover:translate-y-0 hover:bg-mint-soft hover:text-teal focus-visible:bg-mint-soft focus-visible:text-teal motion-reduce:hover:translate-y-0"
              to="/pricing"
              onClick={closeAll}
            >
              Start free trial
            </Link>
            <Link className="button button--mint button--directional group/brand-cta relative isolate min-h-11.5 w-full overflow-hidden border border-white/30 px-4 py-0 text-navy transition-transform duration-300 hover:scale-[1.015] hover:bg-mint focus-visible:scale-[1.015] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100" to="/demo" onClick={closeAll}>
              <HeaderCtaContent>Request a Demo</HeaderCtaContent>
            </Link>
          </div>
        </NavbarIntroNav>

        <NavbarIntroItem className="relative z-10 flex items-center gap-2" delay={0.56}>
          <button
            ref={menuButtonRef}
            className="hidden min-h-11 w-11 cursor-pointer place-items-center rounded-[14px] border-0 bg-navy/5 text-navy transition-[background-color,transform] hover:-translate-y-px hover:bg-mint-soft max-[1080px]:inline-grid [&>svg]:size-4.5"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              setOpenGroup(null);
              setMenuOpen((current) => !current);
            }}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <Link
            className="button button--ghost min-h-11.5 bg-white/72 px-4 shadow-[inset_0_0_0_1px_rgba(6,27,50,.16)] transition-[background-color,color,box-shadow] duration-200 hover:translate-y-0 hover:bg-mint-soft hover:text-teal focus-visible:bg-mint-soft focus-visible:text-teal motion-reduce:hover:translate-y-0 max-[1080px]:hidden"
            to="/pricing"
            onClick={closeAll}
          >
            Start free trial
          </Link>
          <Link className="button button--directional group/brand-cta relative isolate min-h-11.5 overflow-hidden border border-white/25 transition-transform duration-300 hover:scale-[1.015] hover:bg-navy focus-visible:scale-[1.015] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 max-[1080px]:hidden" to="/demo" onClick={closeAll}>
            <NavbarIntroHighlight />
            <HeaderCtaContent>Request a Demo</HeaderCtaContent>
          </Link>
        </NavbarIntroItem>
      </NavbarIntro>
    </header>
  );
}
