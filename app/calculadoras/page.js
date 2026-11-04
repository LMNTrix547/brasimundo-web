import Hero from "@/components/Hero";
import Calculators from "@/components/Calculators";

export const metadata = { title: "Calculadoras · Brasimundo" };

export default function Calculadoras() {
  return (
    <>
      <Hero variant={3} eyebrow={<>Viver e crescer</>} title={<>Calculadoras</>} lead={<>
        As contas que todo negócio precisa fazer antes de decidir. Tudo é calculado no seu aparelho;
        nenhum número é enviado a lugar nenhum.
      </>} />
      <Calculators />
      <p className="src" style={{ marginTop: 14 }}>
        Estimativas simples, sem tributação específica. Não substituem a orientação de um contador.
      </p>
    </>
  );
}
