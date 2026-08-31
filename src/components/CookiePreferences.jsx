import { useState } from "react";

export default function CookiePreferences() {
  const [visible, setVisible] = useState(
    () =>
      typeof localStorage !== "undefined" &&
      !localStorage.getItem("controllo-consent")
  );
  if (!visible) return null;
  const choose = (value) => {
    localStorage.setItem("controllo-consent", value);
    setVisible(false);
  };
  return (
    <aside
      className="fixed right-6 bottom-5 left-6 z-100 mx-auto flex max-w-190 items-center justify-between gap-6 rounded-[18px] border border-line bg-white/96 px-5 py-4.5 shadow-elevated backdrop-blur-2xl max-[760px]:flex-col max-[760px]:items-stretch"
      aria-label="Cookie preferences"
    >
      <div>
        <strong>Your privacy, kept clear.</strong>
        <p className="mt-1.25 mb-0 text-[.65rem] text-muted">
          We use essential storage for site preferences. Optional analytics only
          run when configured.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          className="min-h-11 cursor-pointer border-0 bg-transparent px-3.5 py-0 text-[.68rem] text-muted"
          type="button"
          onClick={() => choose("essential")}
        >
          Essential only
        </button>
        <button
          className="button button--mint"
          type="button"
          onClick={() => choose("accepted")}
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
