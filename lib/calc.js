// Pure calculator functions. Return null when inputs are invalid.
const ok = (...v) => v.every((x) => Number.isFinite(x));

export function pricing({ cost, tax, overhead, profit }) {
  if (!ok(cost, tax, overhead, profit) || cost <= 0 || tax < 0 || overhead < 0 || profit < 0) return null;
  const pct = (tax + overhead + profit) / 100;
  if (pct >= 1) return null;
  const price = cost / (1 - pct);
  return { price, markup: price / cost, margin: (price - cost) / price };
}

export function breakEven({ fixed, price, variable }) {
  if (!ok(fixed, price, variable) || fixed < 0 || price <= 0 || variable < 0) return null;
  const contribution = price - variable;
  if (contribution <= 0) return null;
  const units = Math.ceil(fixed / contribution);
  return { units, revenue: units * price, contribution };
}

export function monthlyProfit({ revenue, costs }) {
  if (!ok(revenue, costs) || revenue < 0 || costs < 0) return null;
  const profit = revenue - costs;
  return { profit, margin: revenue > 0 ? profit / revenue : 0 };
}
