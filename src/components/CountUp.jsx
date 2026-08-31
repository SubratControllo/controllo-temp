import { useCallback, useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

function getDecimalPlaces(num) {
  const str = num.toString();

  if (str.includes(".")) {
    const decimals = str.split(".")[1];

    if (parseInt(decimals, 10) !== 0) {
      return decimals.length;
    }
  }

  return 0;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const hasEndedRef = useRef(false);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
  const startValue = direction === "down" ? to : from;
  const endValue = direction === "down" ? from : to;

  const formatValue = useCallback(
    (latest) => {
      const hasDecimals = maxDecimals > 0;
      const options = {
        useGrouping: Boolean(separator),
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formattedNumber = Intl.NumberFormat("en-US", options).format(
        latest,
      );

      return separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
    },
    [maxDecimals, separator],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(startValue);
    }
  }, [formatValue, startValue]);

  useEffect(() => {
    if (!isInView || !startWhen) {
      return undefined;
    }

    if (typeof onStart === "function") {
      onStart();
    }

    hasEndedRef.current = false;
    motionValue.set(startValue);

    const timeoutId = setTimeout(() => {
      motionValue.set(endValue);
    }, delay * 1000);

    const durationTimeoutId = setTimeout(
      () => {
        hasEndedRef.current = true;

        if (ref.current) {
          ref.current.textContent = formatValue(endValue);
        }

        if (typeof onEnd === "function") {
          onEnd();
        }
      },
      delay * 1000 + duration * 1000,
    );

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(durationTimeoutId);
    };
  }, [
    delay,
    duration,
    endValue,
    formatValue,
    isInView,
    motionValue,
    onEnd,
    onStart,
    startValue,
    startWhen,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (hasEndedRef.current) {
        return;
      }

      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [formatValue, springValue]);

  return (
    <span className={className} ref={ref}>
      {formatValue(startValue)}
    </span>
  );
}
