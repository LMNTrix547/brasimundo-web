import Notice from "@/components/Notice";
import { loadJson, seriesStatus, formatDate, ageDays, STATUS_LABEL } from "@/lib/data";

export const revalidate = 900;

const NAMES = {
  selic_meta: "Selic meta",
  ipca_12m: "IPCA 12 meses",
  desemprego: "Desemprego (IBGE)",
  divida_bruta: "Dívida bruta",
  focus_ipca_2026: "Focus: IPCA 2026",
  ptax_usd: "Dólar (PTAX)",
  ptax_eur: "Euro (PTAX)",
};

export default async function Status() {
  const [latest, run] = await Promise.all([loadJson("latest.json"), loadJson("status.json")]);

  return (
    <>
      <div className="eyebrow">Transparência</div>
      <h1>Status dos dados</h1>
      <p className="lead">
        Cada fonte mostra se a última coleta funcionou, qual é a data do dado e se ele pode ser
        usado como atual.
      </p>

      {(!latest.ok || !run.ok) && (
        <Notice>
          Não foi possível ler o registro de coleta ({latest.ok ? run.reason : latest.reason}).
        </Notice>
      )}

      {latest.ok && (
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Fonte</th>
                <th>Coleta ao vivo</th>
                <th>Última coleta</th>
                <th>Data do dado</th>
                <th>Idade do dado</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(NAMES).map((key) => {
                const s = latest.data[key];
                const r = run.ok ? run.data[key] : undefined;
                const status = seriesStatus(key, s);
                const age = s ? ageDays(s.ref_date) : null;
                return (
                  <tr key={key}>
                    <td>{NAMES[key]}</td>
                    <td>{r?.live_fetch === "success" ? "Sucesso" : r ? "Falhou" : "—"}</td>
                    <td>{s ? formatDate(s.retrieved_at) : "—"}</td>
                    <td>{s ? formatDate(s.ref_date) : "—"}</td>
                    <td>{age === null ? "—" : age < 0 ? "data futura" : `${age} ${age === 1 ? "dia" : "dias"}`}</td>
                    <td>
                      <span className={`tag tag-${status}`}>{STATUS_LABEL[status]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <h2>Como ler esta tabela</h2>
      <p>
        <b>Coleta ao vivo</b> indica se a última execução conseguiu buscar o dado na fonte oficial.
        <b> Data do dado</b> é a data de referência do número, não a data da coleta.
        <b> Desatualizado</b> significa que a última coleta bem-sucedida tem mais de 5 dias, ou que a
        data do dado passou do prazo da série.
        <b> Data futura</b> ou <b>Data inválida</b> significa que a fonte trouxe uma data posterior a
        hoje, e o valor não é mostrado como fato.
      </p>
    </>
  );
}
