// Decorative tile band from the style guide. Each page gets its own colour order, as the guide asks.
const SCHEMES = [
  ["#F5B700", "#1F4FD8", "#0F8A5F"],
  ["#D63C7B", "#1F4FD8", "#F5B700"],
  ["#0F8A5F", "#F5B700", "#1F4FD8"],
  ["#1F4FD8", "#D63C7B", "#F5B700"],
];

export default function Azulejo({ variant = 0 }) {
  const i = Math.abs(variant) % SCHEMES.length;
  const [a, b, c] = SCHEMES[i];
  const id = `azulejo-${i}`;
  return (
    <svg className="azulejo" width="100%" height="28" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="120" height="28" patternUnits="userSpaceOnUse">
          <rect width="120" height="28" fill="#FFFFFF" />
          <path d="M0 28 A28 28 0 0 1 28 0 L0 0 Z" fill="#0B1F3A" />
          <circle cx="44" cy="14" r="7" fill={c} />
          <path d="M66 0 H90 L66 28 Z" fill={a} />
          <path d="M90 0 V28 H66 Z" fill={b} />
          <path d="M120 28 A28 28 0 0 0 92 0 L120 0 Z" fill="#0B1F3A" />
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${id})`} />
    </svg>
  );
}
