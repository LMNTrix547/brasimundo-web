// Reads the ingestion outputs and applies the site's data-status rules.
// Nothing is shown as current unless it passes these checks.

const BASE = process.env.DATA_BASE_URL?.replace(/\/+$/, "");
const REVALIDATE_SECONDS = 15 * 60;

export async function loadJson(file) {
  if (!BASE) return { ok: false, reason: "DATA_BASE_URL não configurada" };
  try {
    const res = await fetch(`${BASE}/${file}`, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status} ao ler ${file}` };
    return { ok: true, data: await res.json() };
  } catch (err) {
    return { ok: false, reason: `Falha de rede: ${err.message}` };
  }
}

export async function loadText(file) {
  if (!BASE) return { ok: false, reason: "DATA_BASE_URL não configurada" };
  try {
    const res = await fetch(`${BASE}/${file}`, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status} ao ler ${file}` };
    return { ok: true, data: await res.text() };
  } catch (err) {
    return { ok: false, reason: `Falha de rede: ${err.message}` };
  }
}

// History saved by the ingestion job: one CSV per series (ref_date,value,retrieved_at,verification_level).
// Returns rows oldest-first, without future dates, or an empty list when unavailable.
export async function loadHistory(id, limit = 120) {
  const res = await loadText(`history/${id}.csv`);
  if (!res.ok) return [];
  const today = new Date().toISOString().slice(0, 10);
  const rows = res.data.trim().split(/\r?\n/).slice(1).map((line) => {
    const [ref_date, value] = line.split(",");
    return { ref_date, value: Number(value) };
  }).filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.ref_date) && Number.isFinite(r.value) && r.ref_date <= today);
  rows.sort((a, b) => a.ref_date.localeCompare(b.ref_date));
  return rows.slice(-limit);
}

// Age in whole days between an ISO date (YYYY-MM-DD) and now. Negative = future.
export function ageDays(isoDate) {
  const t = Date.parse(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}

// Maximum age in days of the reference date, per series. null = no limit on the reference date:
// a rate can stay unchanged for months, so Selic is judged by the collection date only.
const REF_MAX_DAYS = {
  selic_meta: null,
  ipca_12m: 75,
  desemprego: 100,
  divida_bruta: 100,
  focus_ipca_2026: 14,
  ptax_usd: 5,
  ptax_eur: 5,
};

// The collection job runs on weekdays. If the last successful collection is older than this,
// nothing is being refreshed, whatever the reference dates say.
const COLLECTION_MAX_DAYS = 5;

// Decides what a series may be shown as. The site checks the dates itself and does not
// trust the data_status flag written by the ingestion job.
// "ok"          valid, collected recently, within its reference window
// "stale"       not collected recently, or reference date older than its window
// "future-date" reference date is after today: never shown as a fact
// "missing"     no value available
export function seriesStatus(id, series) {
  if (!series || series.value == null) return "missing";
  const refAge = ageDays(series.ref_date);
  if (refAge === null) return "missing";
  if (refAge < 0) return "future-date";
  const collectedAge = ageDays(String(series.retrieved_at ?? "").slice(0, 10));
  if (collectedAge === null || collectedAge > COLLECTION_MAX_DAYS) return "stale";
  const limit = REF_MAX_DAYS[id];
  if (limit != null && refAge > limit) return "stale";
  return "ok";
}

const pt = (n, digits = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export function formatValue(series, digits = 2) {
  if (series.unit === "R$") return `R$ ${pt(series.value, 4)}`;
  if (series.unit === "% do PIB") return `${pt(series.value, digits)}% do PIB`;
  if (series.unit?.startsWith("%")) return `${pt(series.value, digits)}%`;
  return pt(series.value, digits);
}

export function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}

export const STATUS_LABEL = {
  ok: "Atualizado",
  stale: "Desatualizado",
  "future-date": "Data inválida",
  missing: "Sem dado",
};
