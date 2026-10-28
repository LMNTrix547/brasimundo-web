import StatesTable from "@/components/StatesTable";
import { STATES, STATES_AS_OF, LEVELS, levelClass } from "@/lib/states";

export const metadata = { title: "Estados · Brasimundo" };

export default function Estados() {
  const count = (l) => STATES.filter((s) => s.overall === l).length;
  return (
    <>
      <div className="eyebrow">Brasil em dados · gestão de risco</div>
      <h1>Risco por estado</h1>
      <p className="lead">
        Os 27 estados na mesma régua para desemprego, informalidade e violência. O nível geral é o
        maior dos três, porque uma média esconderia o problema mais grave.
      </p>
      <div className="pill-row">
        {[...LEVELS].reverse().map((l) => (
          <div className="box stat" key={l}>
            <small>{l === "Baixo" ? "Só riscos baixos" : `Pior risco em ${l}`}</small>
            <div className="num">{count(l)}</div>
            <span className={`tag ${levelClass(l)}`}>{l}</span>
          </div>
        ))}
      </div>
      <h2>Ranking</h2>
      <StatesTable />
      <p className="src" style={{ marginTop: 14 }}>
        Desemprego e informalidade: IBGE, PNAD Contínua, 2º trimestre de 2026. Mortes violentas por
        100 mil habitantes: Anuário Brasileiro de Segurança Pública 2026 (dados de 2025). Valores e
        níveis transcritos à mão do site Brasimundo em {STATES_AS_OF}; ainda não são coletados
        automaticamente.
      </p>
    </>
  );
}
