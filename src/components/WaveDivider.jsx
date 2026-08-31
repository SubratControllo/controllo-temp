import { motion } from "motion/react";

const wavePaths = {
  back: "M0 108C180 42 360 174 540 108S900 42 1080 108S1260 174 1440 108C1620 42 1800 174 1980 108S2340 42 2520 108S2700 174 2880 108V240H0Z",
  middle:
    "M0 132C240 60 420 186 680 120C900 64 1160 176 1440 132C1680 60 1860 186 2120 120C2340 64 2600 176 2880 132V240H0Z",
  front:
    "M0 160C220 98 430 198 700 148C960 100 1180 194 1440 160C1660 98 1870 198 2140 148C2400 100 2620 194 2880 160V240H0Z",
};

export default function WaveDivider({
  back = "#bff4e8",
  middle = "#63e4cf",
  front = "#ffffff",
  y = 0,
}) {
  return (
    <div
      className="wave-divider pointer-events-none absolute inset-x-0 -bottom-0.5 z-2 h-57.5 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div className="relative size-full" style={{ y }}>
        <svg
          className="wave-divider__wave wave-divider__wave--back absolute bottom-0 left-0 block h-full w-[200%] will-change-transform"
          viewBox="0 0 2880 240"
          preserveAspectRatio="none"
        >
          <path d={wavePaths.back} fill={back} opacity="0.66" />
        </svg>
        <svg
          className="wave-divider__wave wave-divider__wave--middle absolute bottom-0 left-0 block h-full w-[200%] will-change-transform"
          viewBox="0 0 2880 240"
          preserveAspectRatio="none"
        >
          <path d={wavePaths.middle} fill={middle} opacity="0.48" />
        </svg>
        <svg
          className="wave-divider__wave wave-divider__wave--front absolute bottom-0 left-0 block h-full w-[200%] will-change-transform"
          viewBox="0 0 2880 240"
          preserveAspectRatio="none"
        >
          <path d={wavePaths.front} fill={front} />
        </svg>
      </motion.div>
    </div>
  );
}
