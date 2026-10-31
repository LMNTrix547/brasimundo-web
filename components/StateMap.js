import { STATES, levelClass } from "@/lib/states";

// Stylised tile grid, not a geographic map: one equal square per state, placed roughly where it sits.
const POS = {
  RR: [0, 2], AP: [0, 4],
  AM: [1, 1], PA: [1, 3], MA: [1, 4], CE: [1, 5], RN: [1, 6],
  AC: [2, 0], RO: [2, 1], MT: [2, 2], TO: [2, 3], PI: [2, 4], PE: [2, 5], PB: [2, 6],
  GO: [3, 3], BA: [3, 4], AL: [3, 5],
  MS: [4, 2], DF: [4, 3], MG: [4, 4], SE: [4, 5],
  PR: [5, 2], SP: [5, 3], RJ: [5, 4], ES: [5, 5],
  SC: [6, 2], RS: [7, 2],
};

export default function StateMap() {
  return (
    <div className="tilemap" role="group" aria-label="Mapa de blocos: nível de risco geral por estado">
      {STATES.map((s) => {
        const [row, col] = POS[s.uf];
        return (
          <div key={s.uf} className={`tile ${levelClass(s.overall)}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}
            title={`${s.name}: risco geral ${s.overall}`} aria-label={`${s.name}: risco geral ${s.overall}`}>
            {s.uf}
          </div>
        );
      })}
    </div>
  );
}
