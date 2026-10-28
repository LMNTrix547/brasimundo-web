// Confirmed dates as published on the Brasimundo site (version of 23/10/2026).
// Only dates confirmed in official calendars or announcements belong here.
// Caged and the trade balance have no official dates published for this period.
export const CALENDAR_AS_OF = "23/10/2026";
export const EVENTS = [
  ["2026-10-28", "Juros EUA", "FOMC: decisão (reunião de 27 e 28 out)", "Federal Reserve"],
  ["2026-10-30", "Emprego", "PNAD Contínua mensal, set/2026", "IBGE"],
  ["2026-11-04", "Juros Brasil", "Copom: decisão (reunião de 3 e 4 nov)", "Banco Central"],
  ["2026-11-10", "Juros Brasil", "Ata do Copom (reunião de nov), 8h", "Banco Central"],
  ["2026-11-12", "Inflação", "IPCA outubro/2026", "IBGE"],
  ["2026-11-26", "Inflação", "IPCA-15 novembro/2026", "IBGE"],
  ["2026-11-27", "Varejo", "Black Friday 2026", "Site Brasimundo"],
  ["2026-11-27", "Emprego", "PNAD Contínua mensal, out/2026", "IBGE"],
  ["2026-11-30", "Trabalho", "13º salário: prazo da 1ª parcela", "Site Brasimundo"],
  ["2026-12-02", "PIB", "PIB do 3º trimestre/2026, Contas Nacionais", "IBGE"],
  ["2026-12-09", "Juros Brasil", "Copom: decisão (reunião de 8 e 9 dez)", "Banco Central"],
  ["2026-12-09", "Juros EUA", "FOMC: decisão e projeções (reunião de 8 e 9 dez)", "Federal Reserve"],
  ["2026-12-11", "Inflação", "IPCA novembro/2026", "IBGE"],
  ["2026-12-15", "Juros Brasil", "Ata do Copom (reunião de dez), 8h", "Banco Central"],
  ["2026-12-18", "Trabalho", "13º salário: prazo da 2ª parcela (20/12 cai num domingo)", "Site Brasimundo"],
  ["2026-12-23", "Inflação", "IPCA-15 dezembro/2026", "IBGE"],
  ["2026-12-29", "Emprego", "PNAD Contínua mensal, nov/2026", "IBGE"],
].map(([date, theme, title, source]) => ({ date, theme, title, source }));
