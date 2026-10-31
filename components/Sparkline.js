import { sparkPoints } from "@/lib/spark";

// Decorative trend line. The number next to it carries the information, so it is hidden from screen readers.
export default function Sparkline({ values, width = 120, height = 32, big = false }) {
  const s = sparkPoints(values, width, height, big ? 6 : 3);
  if (!s) return null;
  return (
    <svg className={big ? "spark big" : "spark"} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <polyline points={s.line} fill="none" stroke="currentColor" strokeWidth={big ? 1.6 : 1.5} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={s.last[0]} cy={s.last[1]} r={big ? 2.4 : 2} fill="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
