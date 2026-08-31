const SECURA_MARK_SRC = "/assets/secura-mark.svg";

export default function SecuraMark({ className = "", ...props }) {
  return (
    <img
      {...props}
      alt=""
      aria-hidden="true"
      className={className}
      decoding="async"
      draggable={false}
      src={SECURA_MARK_SRC}
    />
  );
}
