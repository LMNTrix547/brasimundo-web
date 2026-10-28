export const metadata = { title: "Metodologia · Brasimundo" };

const LEVELS = [
  ["N1", "Relatado por uma pessoa, sem documento."],
  ["N2", "Documentado com recibo ou contrato."],
  ["N3", "Corroborado por uma segunda fonte."],
  ["N4", "Transação verificada em registro."],
  ["N5", "Oficial: IBGE, Banco Central, B3, CVM."],
];

export default function Metodologia() {
  return (
    <>
      <div className="eyebrow">Como funciona</div>
      <h1>Metodologia</h1>
      <p className="lead">
        Cada número tem fonte, data, nível de verificação e situação. Quando os dados não bastam,
        dizemos isso.
      </p>

      <h2>Níveis de verificação</h2>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>Nível</th>
              <th>Significado</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map(([code, text]) => (
              <tr key={code}>
                <td><b>{code}</b></td>
                <td>{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Regras de exibição</h2>
      <p>
        Um valor só aparece como atual se a data de referência não estiver no futuro, se a última
        coleta bem-sucedida tiver ocorrido há no máximo 5 dias e se a data de referência estiver
        dentro do prazo da série. Valores que falham nesses testes ficam com o aviso
        correspondente.
      </p>
      <p>
        Os indicadores oficiais são coletados diretamente das APIs abertas do Banco Central. Os
        indicadores marcados como manuais são inseridos à mão e mostram a data do registro.
      </p>
    </>
  );
}
