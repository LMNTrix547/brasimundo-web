// Indicators still entered by hand, shown with the date they were recorded.
// Automated indicators (unemployment, debt, Focus forecast) now come from latest.json.
// Ibovespa needs a B3 licence for live data; the trade surplus has no open feed set up yet.
export const MANUAL = [
  { id: "ibov", label: "Ibovespa", value: "206.912", asOf: "05/10/2026", note: "+7,70% no dia" },
  { id: "superavit", label: "Superávit comercial", value: "US$ 61,8 bi", asOf: "set/2026", note: "2026 até setembro" },
];
