// Turns a list of numbers into SVG polyline points. Returns null when a line makes no sense.
export function sparkPoints(values, width = 120, height = 32, pad = 3) {
  const v = values.filter((x) => Number.isFinite(x));
  if (v.length < 3) return null;
  const min = Math.min(...v), max = Math.max(...v);
  const span = max - min || 1; // flat series draw a flat line instead of dividing by zero
  const pts = v.map((x, i) => [
    pad + (i / (v.length - 1)) * (width - 2 * pad),
    max === min ? height / 2 : height - pad - ((x - min) / span) * (height - 2 * pad),
  ]);
  return { pts, line: pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "), min, max, last: pts[pts.length - 1] };
}
