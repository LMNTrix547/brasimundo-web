import { EVENTS, CALENDAR_AS_OF } from "@/lib/calendar";

export const metadata = { title: "Calendário econômico · Brasimundo" };
export const revalidate = 3600;

const fmt = (iso) => iso.split("-").reverse().join("/");
const daysUntil = (iso) => Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z")) / 86400000);

export default function Calendario() {
  const upcoming = EVENTS.filter((e) => daysUntil(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));
  const next = upcoming[0];
  return (
    <>
      <div className="eyebrow">Mercados · agenda</div>
      <h1>Calendário econômico</h1>
      <p className="lead">
        Decisões e divulgações que movem juros, câmbio, bolsa e consumo até o fim de 2026. Só entram
        datas confirmadas em calendários oficiais ou comunicados.
      </p>

      {next ? (
        <div className="box" style={{ marginTop: 20 }}>
          <small>Próximo evento</small>
          <div className="num">{fmt(next.date)}</div>
          <div>{next.title}</div>
          <div className="meta">
            <span className="tag tag-ok">{daysUntil(next.date) === 0 ? "hoje" : `em ${daysUntil(next.date)} ${daysUntil(next.date) === 1 ? "dia" : "dias"}`}</span>
            <span className="src">{next.source}</span>
          </div>
        </div>
      ) : (
        <div className="notice">Não há mais datas confirmadas na lista. Ela precisa ser atualizada.</div>
      )}

      <h2>Datas que movem o mercado</h2>
      <div className="scroll">
        <table>
          <thead><tr><th>Data</th><th>Tema</th><th>Evento</th><th>Fonte</th></tr></thead>
          <tbody>
            {upcoming.map((e) => (
              <tr key={e.date + e.title}>
                <td className="mono">{fmt(e.date)}</td>
                <td><span className="tag">{e.theme}</span></td>
                <td>{e.title}</td>
                <td className="src">{e.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="src" style={{ marginTop: 14 }}>
        Lista conferida em {CALENDAR_AS_OF}. Caged e balança comercial ainda não têm datas oficiais
        publicadas para o período. Eventos passados saem da lista automaticamente.
      </p>
    </>
  );
}
