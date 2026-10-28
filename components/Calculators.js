"use client";
import { useState } from "react";
import { pricing, breakEven, monthlyProfit } from "@/lib/calc";

const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = (n) => (n * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
const int = (n) => n.toLocaleString("pt-BR");

function Field({ label, value, set, step = "any" }) {
  return (
    <label className="field">
      {label}
      <input type="number" inputMode="decimal" step={step} value={value} onChange={(e) => set(e.target.value)} />
    </label>
  );
}
const Bad = () => <div className="notice">Preencha valores válidos. Os percentuais somados precisam ficar abaixo de 100%.</div>;

export default function Calculators() {
  const [p, setP] = useState({ cost: "60", tax: "12", overhead: "15", profit: "10" });
  const [b, setB] = useState({ fixed: "15000", price: "80", variable: "50" });
  const [m, setM] = useState({ revenue: "40000", costs: "33000" });
  const rp = pricing({ cost: +p.cost, tax: +p.tax, overhead: +p.overhead, profit: +p.profit });
  const rb = breakEven({ fixed: +b.fixed, price: +b.price, variable: +b.variable });
  const rm = monthlyProfit({ revenue: +m.revenue, costs: +m.costs });
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
      <div className="box">
        <b>Preço de venda e markup</b>
        <Field label="Custo por unidade (R$)" value={p.cost} set={(v) => setP({ ...p, cost: v })} />
        <Field label="Impostos e taxas (% do preço)" value={p.tax} set={(v) => setP({ ...p, tax: v })} />
        <Field label="Despesas fixas rateadas (% do preço)" value={p.overhead} set={(v) => setP({ ...p, overhead: v })} />
        <Field label="Lucro desejado (% do preço)" value={p.profit} set={(v) => setP({ ...p, profit: v })} />
        {rp ? (
          <div className="result" aria-live="polite">
            <div className="num">{brl(rp.price)}</div>
            <small>Markup {rp.markup.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}× · margem bruta {pct(rp.margin)}</small>
          </div>
        ) : <Bad />}
      </div>
      <div className="box">
        <b>Ponto de equilíbrio</b>
        <Field label="Custos fixos por mês (R$)" value={b.fixed} set={(v) => setB({ ...b, fixed: v })} />
        <Field label="Preço médio de venda (R$)" value={b.price} set={(v) => setB({ ...b, price: v })} />
        <Field label="Custo variável por unidade (R$)" value={b.variable} set={(v) => setB({ ...b, variable: v })} />
        {rb ? (
          <div className="result" aria-live="polite">
            <div className="num">{int(rb.units)} un./mês</div>
            <small>Faturamento mínimo {brl(rb.revenue)} · margem de contribuição {brl(rb.contribution)} por unidade</small>
          </div>
        ) : <div className="notice">O preço precisa cobrir o custo variável.</div>}
      </div>
      <div className="box">
        <b>Lucro do mês</b>
        <Field label="Faturamento (R$)" value={m.revenue} set={(v) => setM({ ...m, revenue: v })} />
        <Field label="Custos e despesas (R$)" value={m.costs} set={(v) => setM({ ...m, costs: v })} />
        {rm ? (
          <div className="result" aria-live="polite">
            <div className="num" style={{ color: rm.profit >= 0 ? "var(--ok)" : "var(--bad)" }}>{brl(rm.profit)}</div>
            <small>Margem {pct(rm.margin)}</small>
          </div>
        ) : <Bad />}
      </div>
    </div>
  );
}
