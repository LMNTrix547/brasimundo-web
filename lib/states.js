// State risk snapshot transcribed from the Brasimundo site (version of 23/10/2026).
// Unemployment and informality: IBGE, PNAD Contínua, 2nd quarter 2026.
// Violent deaths per 100k: Anuário Brasileiro de Segurança Pública 2026 (2025 data).
// Levels are the ones the site published; the overall level is the highest of the three.
export const STATES_AS_OF = "23/10/2026";
export const LEVELS = ["Baixo", "Médio", "Alto", "Muito alto"];
const L = { B: "Baixo", M: "Médio", A: "Alto", V: "Muito alto" };
// name, UF, region, unemployment %, informality %, violence per 100k, levels (unemp, inform, violence)
const RAW = [
  ["Rondônia","RO","Norte",2.6,42.0,28.1,"BAA"], ["Acre","AC","Norte",6.6,43.7,21.6,"MAA"],
  ["Amazonas","AM","Norte",7.5,51.7,18.5,"MVM"], ["Roraima","RR","Norte",5.0,42.7,19.5,"BAM"],
  ["Pará","PA","Norte",6.2,55.9,28.4,"MVA"], ["Amapá","AP","Norte",9.8,44.5,42.5,"AAV"],
  ["Tocantins","TO","Norte",4.1,37.8,19.3,"BMM"], ["Maranhão","MA","Nordeste",6.0,56.9,29.7,"MVA"],
  ["Piauí","PI","Nordeste",8.3,49.5,17.1,"MAM"], ["Ceará","CE","Nordeste",6.6,48.7,34.7,"MAV"],
  ["Rio Grande do Norte","RN","Nordeste",5.6,41.3,29.1,"BAA"], ["Paraíba","PB","Nordeste",5.4,45.8,24.6,"BAA"],
  ["Pernambuco","PE","Nordeste",8.3,45.4,33.0,"MAV"], ["Alagoas","AL","Nordeste",7.9,43.4,33.1,"MAV"],
  ["Sergipe","SE","Nordeste",7.9,47.3,22.1,"MAA"], ["Bahia","BA","Nordeste",9.1,50.7,36.8,"AVV"],
  ["Minas Gerais","MG","Sudeste",3.8,36.5,12.9,"BMM"], ["Espírito Santo","ES","Sudeste",2.3,40.0,22.0,"BAA"],
  ["Rio de Janeiro","RJ","Sudeste",7.1,37.1,22.6,"MMA"], ["São Paulo","SP","Sudeste",5.4,30.1,7.8,"BMB"],
  ["Paraná","PR","Sul",3.1,30.5,15.5,"BMM"], ["Santa Catarina","SC","Sul",2.1,25.4,7.6,"BBB"],
  ["Rio Grande do Sul","RS","Sul",4.2,29.6,11.3,"BBM"], ["Mato Grosso do Sul","MS","Centro-Oeste",2.7,29.2,20.2,"BBA"],
  ["Mato Grosso","MT","Centro-Oeste",2.2,34.1,22.9,"BMA"], ["Goiás","GO","Centro-Oeste",4.0,36.1,16.5,"BMM"],
  ["Distrito Federal","DF","Centro-Oeste",6.5,28.7,9.6,"MBB"],
];
export const STATES = RAW.map(([name, uf, region, unemp, inform, viol, lv]) => {
  const levels = { unemp: L[lv[0]], inform: L[lv[1]], viol: L[lv[2]] };
  const overall = [levels.unemp, levels.inform, levels.viol].sort((a, b) => LEVELS.indexOf(b) - LEVELS.indexOf(a))[0];
  return { name, uf, region, unemp, inform, viol, levels, overall };
});
export const REGIONS = ["Norte", "Nordeste", "Sudeste", "Sul", "Centro-Oeste"];
export const levelClass = (l) => "lvl-" + l.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
