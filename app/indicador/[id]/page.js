import Link from "next/link";
import { notFound } from "next/navigation";
import Sparkline from "@/components/Sparkline";
import Notice from "@/components/Notice";
import { loadJson, loadHistory, seriesStatus, formatValue, formatDate, STATUS_LABEL } from "@/lib/data";
import { SERIES, SERIES_BY_KEY } from "@/lib/series";

export const revalidate = 900;
export const dynamicParams = false;
export function generateStaticParams() { return SERIES.map((s) => ({ id: s.key })); }
export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `${SERIES_BY_KEY[id]?.label ?? "Indicador"} · Brasimundo` };
}

export default async function Indicador({ params }) {
  const { id } = await params;
  const meta = SERIES_BY_KEY[id];
  if (!meta) notFound();
  const [latest, run, history] = await Promise.all([loadJson("latest.json"), loadJson("status.json"), loadHistory(id, 120)]);
  const s = latest.ok ? latest.data[id] : undefined;
  const r = run.ok ? run.data[id] : undefined;
  const status = latest.ok ? seriesStatus(id, s) : "missing";
  const shown = status === "ok" || status === "stale";
  const values = history.map((h) => h.value);
  const min = values.length ? Math.min(...values) : null;
  const max = values.length ? Math.max(...values) : null;
  const fmt = (v) => formatValue({ ...s, value: v }, meta.digits);

  return (
    <>
      <p><Link href="/">← Terminal</Link></p>
      <div className="eyebrow">Indicador · origem e histórico</div>
      <h1>{meta.label}</h1>
      <p className="lead">{meta.detail}</p>

      {!latest.ok && <Notice>Não foi possível carregar os dados ({latest.reason}).</Notice>}

      {s && (
        <div className="box" style={{ marginTop: 18 }}>
          <div className="num" style={{ fontSize: 44 }}>{shown ? fmt(s.value) : "—"}</div>
          <div className="meta"><span className={`tag tag-${status}`}>{STATUS_LABEL[status]}</span></div>
          {history.length >= 3 && shown && (
            <div style={{ marginTop: 18 }}>
              <Sparkline values={values} width={600} height={140} big />
              <div className="src" style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span>{formatDate(history[0].ref_date)}</span>
                <span>mín. {fmt(min)} · máx. {fmt(max)}</span>
                <span>{formatDate(history[history.length - 1].ref_date)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {s && (
        <>
          <h2>De onde vem este número</h2>
          <div className="scroll">
            <table>
              <tbody>
                <tr><th>Fonte</th><td>{s.source}</td></tr>
                <tr><th>Série</th><td>{s.name}</td></tr>
                <tr><th>Nível de verificação</th><td>{s.verification_level} · oficial</td></tr>
                <tr><th>Licença</th><td>{s.license}</td></tr>
                <tr><th>Frequência</th><td>{s.frequency}</td></tr>
                <tr><th>Data do dado</th><td className="mono">{formatDate(s.ref_date)}</td></tr>
                <tr><th>Coletado em</th><td className="mono">{formatDate(s.retrieved_at)}</td></tr>
                <tr><th>Última coleta ao vivo</th><td>{r ? (r.live_fetch === "success" ? "Sucesso" : "Falhou") : "—"}</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {history.length > 0 && (
        <>
          <h2>Últimos registros</h2>
          <div className="scroll">
            <table>
              <thead><tr><th>Data do dado</th><th>Valor</th></tr></thead>
              <tbody>
                {[...history].reverse().slice(0, 15).map((h) => (
                  <tr key={h.ref_date}><td className="mono">{formatDate(h.ref_date)}</td><td className="mono">{s ? fmt(h.value) : h.value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="src" style={{ marginTop: 12 }}>
            Histórico guardado pela coleta automática. Pontos anteriores à primeira coleta vêm da mesma fonte oficial.
          </p>
        </>
      )}
      {history.length === 0 && latest.ok && <p className="src">Ainda não há histórico guardado para esta série.</p>}
    </>
  );
}
