import Calculators from "@/components/Calculators";

export const metadata = { title: "Calculadoras · Brasimundo" };

export default function Calculadoras() {
  return (
    <>
      <div className="eyebrow">Viver e crescer</div>
      <h1>Calculadoras</h1>
      <p className="lead">
        As contas que todo negócio precisa fazer antes de decidir. Tudo é calculado no seu aparelho;
        nenhum número é enviado a lugar nenhum.
      </p>
      <Calculators />
      <p className="src" style={{ marginTop: 14 }}>
        Estimativas simples, sem tributação específica. Não substituem a orientação de um contador.
      </p>
    </>
  );
}
