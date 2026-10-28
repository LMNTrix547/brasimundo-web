import Indicator from "@/components/Indicator";
import Notice from "@/components/Notice";
import { loadJson, seriesStatus, formatValue, formatDate } from "@/lib/data";
import { MANUAL } from "@/lib/manual";

export const revalidate = 900;

const ORDER = [
  { key: "selic_meta", label: "Selic meta", detail: "% ao ano · definida pelo Copom", digits: 2 },
  { key: "ipca_12m", label: "IPCA 12 meses", detail: "inflação oficial (IBGE)", digits: 2 },
  { key: "desemprego", label: "Desemprego", detail: "taxa de desocupação · IBGE", digits: 1 },
  { key: "divida_bruta", label: "Dívida bruta", detail: "governo geral · Banco Central", digits: 1 },
  { key: "focus_ipca_2026", label: "Focus: IPCA 2026", detail: "expectativa de mercado (mediana)", digits: 2 },
  { key: "ptax_usd", label: "Dólar", detail: "PTAX, venda · R$ por US$", digits: 4 },
  { key: "ptax_eur", label: "Euro", detail: "PTAX, venda · R$ por €", digits: 4 },
];

export default async function Terminal() {
  const res = await loadJson("latest.json");
  const data = res.ok ? res.data : {};
  const retrieved = Object.values(data)
    .map((s) => s.retrieved_at)
    .filter(Boolean)
    .sort()
    .pop();

  return (
    <>
      <div className="eyebrow">Mercados · ao vivo</div>
      <h1>Terminal</h1>
      <p className="lead">
        Indicadores oficiais com fonte, data e nível de verificação. Atualizados em dias úteis.
      </p>

      {!res.ok && (
        <Notice>
          Não foi possível carregar os dados oficiais agora ({res.reason}). Nenhum valor antigo é
          apresentado como atual.
        </Notice>
      )}

      <h2>Oficiais · Banco Central e IBGE</h2>
      <div className="grid">
        {ORDER.map(({ key, label, detail, digits }) => {
          const s = data[key];
          const status = res.ok ? seriesStatus(key, s) : "missing";
          return (
            <Indicator
              key={key}
              label={label}
              value={s && status !== "missing" ? formatValue(s, digits) : null}
              status={status}
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
