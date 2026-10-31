import Indicator from "@/components/Indicator";
import Notice from "@/components/Notice";
import { loadJson, loadHistory, seriesStatus, formatValue, formatDate } from "@/lib/data";
import { SERIES } from "@/lib/series";
import { MANUAL } from "@/lib/manual";

export const revalidate = 900;

export default async function Terminal() {
  const [res, histories] = await Promise.all([
    loadJson("latest.json"),
    Promise.all(SERIES.map((s) => loadHistory(s.key, 60))),
  ]);
  const data = res.ok ? res.data : {};
  const retrieved = Object.values(data).map((s) => s.retrieved_at).filter(Boolean).sort().pop();

  return (
    <>
      <div className="eyebrow">Mercados · ao vivo</div>
      <h1>Terminal</h1>
      <p className="lead">
        Indicadores oficiais com fonte, data e nível de verificação. Atualizados em dias úteis.
        Clique em um número para ver a origem e o histórico.
      </p>

      {!res.ok && (
        <Notice>
          Não foi possível carregar os dados oficiais agora ({res.reason}). Nenhum valor antigo é
          apresentado como atual.
        </Notice>
      )}

      <h2>Oficiais · Banco Central e IBGE</h2>
      <div className="grid">
        {SERIES.map(({ key, label, detail, digits }, i) => {
          const s = data[key];
          const status = res.ok ? seriesStatus(key, s) : "missing";
          return (
            <Indicator
              key={key}
              href={`/indicador/${key}`}
              label={label}
              value={s && status !== "missing" ? formatValue(s, digits) : null}
              status={status}
              spark={histories[i].map((r) => r.value)}
              detail={s ? `${detail} · ref. ${formatDate(s.ref_date)}` : detail}
              source={s ? `${s.source} · ${s.verification_level}` : null}
            />
          );
        })}
      </div>
      {retrieved && (
        <p className="lead" style={{ fontSize: 14 }}>
          Última coleta: {formatDate(retrieved)}. Detalhes em <a href="/status">Status dos dados</a>.
        </p>
      )}

      <h2>Manuais · inseridos à mão</h2>
      <p className="lead" style={{ fontSize: 14 }}>
        Estes números ainda não são coletados automaticamente. Cada um mostra a data em que foi
        registrado.
      </p>
      <div className="grid">
        {MANUAL.map((m) => (
          <div className="box" key={m.id}>
            <small>{m.label}</small>
            <div className="num">{m.value}</div>
            <small>{m.note}</small>
            <div className="meta">
              <span className="tag tag-stale">Manual · {m.asOf}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
