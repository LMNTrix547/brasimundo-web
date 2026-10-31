import { loadJson, ageDays } from "@/lib/data";

// Header strip: how many sources were collected live on the last run, and how long ago.
export default async function Pulse() {
  const res = await loadJson("status.json");
  let text, tone;
  if (!res.ok) {
    text = "Status das fontes indisponível";
    tone = "warn";
  } else {
    const runs = Object.values(res.data);
    const ok = runs.filter((r) => r.live_fetch === "success").length;
    const last = runs.map((r) => r.run_at).filter(Boolean).sort().pop();
    const age = last ? ageDays(last.slice(0, 10)) : null;
    const [y, m, d] = (last ?? "").slice(0, 10).split("-");
    const when = last ? `${d}/${m}` : "—";
    const late = age === null || age > 5;
    text = `${ok} de ${runs.length} fontes ao vivo · coleta ${when}${late ? " (atrasada)" : ""}`;
    tone = ok === runs.length && !late ? "ok" : "warn";
  }
  return (
    <a href="/status" className={`pulse pulse-${tone}`} title="Ver o status de cada fonte">
      <span className="dot" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );
}
