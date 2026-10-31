// The seven automatic series: display names and number formats, shared by every page.
export const SERIES = [
  { key: "selic_meta", label: "Selic meta", detail: "% ao ano · definida pelo Copom", digits: 2 },
  { key: "ipca_12m", label: "IPCA 12 meses", detail: "inflação oficial (IBGE)", digits: 2 },
  { key: "desemprego", label: "Desemprego", detail: "taxa de desocupação · IBGE", digits: 1 },
  { key: "divida_bruta", label: "Dívida bruta", detail: "governo geral · Banco Central", digits: 1 },
  { key: "focus_ipca_2026", label: "Focus: IPCA 2026", detail: "expectativa de mercado (mediana)", digits: 2 },
  { key: "ptax_usd", label: "Dólar", detail: "PTAX, venda · R$ por US$", digits: 4 },
  { key: "ptax_eur", label: "Euro", detail: "PTAX, venda · R$ por €", digits: 4 },
];
export const SERIES_BY_KEY = Object.fromEntries(SERIES.map((s) => [s.key, s]));
