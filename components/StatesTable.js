"use client";
import { useMemo, useState } from "react";
import { STATES, REGIONS, LEVELS, levelClass } from "@/lib/states";

const n1 = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const Lvl = ({ l }) => <span className={`tag ${levelClass(l)}`}>{l}</span>;

export default function StatesTable() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState("risk");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    const a = STATES.filter((s) => (!region || s.region === region) && (!t || `${s.name} ${s.uf}`.toLowerCase().includes(t)));
    const by = {
      risk: (x, y) => LEVELS.indexOf(y.overall) - LEVELS.indexOf(x.overall) || x.name.localeCompare(y.name, "pt-BR"),
      name: (x, y) => x.name.localeCompare(y.name, "pt-BR"),
      unemp: (x, y) => y.unemp - x.unemp,
      inform: (x, y) => y.inform - x.inform,
      viol: (x, y) => y.viol - x.viol,
    };
    return [...a].sort(by[sort]);
  }, [q, region, sort]);
  return (
    <>
      <div className="toolbar">
        <input placeholder="Buscar estado ou UF" aria-label="Buscar estado ou UF" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Região" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Todas as regiões</option>
          {REGIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select aria-label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="risk">Maior risco geral</option>
          <option value="unemp">Maior desemprego</option>
          <option value="inform">Maior informalidade</option>
          <option value="viol">Maior violência</option>
          <option value="name">Nome (A–Z)</option>
        </select>
      </div>
      <div className="scroll">
        <table>
          <thead><tr><th>Estado</th><th>Geral</th><th>Desemprego</th><th>Informalidade</th><th>Violência</th></tr></thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.uf}>
                <td><b>{s.name}</b><br /><small className="src">{s.uf} · {s.region}</small></td>
                <td><Lvl l={s.overall} /></td>
                <td className="mono">{n1(s.unemp)}% <Lvl l={s.levels.unemp} /></td>
                <td className="mono">{n1(s.inform)}% <Lvl l={s.levels.inform} /></td>
                <td className="mono">{n1(s.viol)} <small className="src">/100 mil</small> <Lvl l={s.levels.viol} /></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5}>Nenhum estado encontrado.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
