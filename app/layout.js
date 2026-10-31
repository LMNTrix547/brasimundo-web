import Link from "next/link";
import Nav from "@/components/Nav";
import Pulse from "@/components/Pulse";
import "./globals.css";

export const metadata = {
  title: "Brasimundo",
  description: "Dados do Brasil com fonte, data e nível de verificação em cada número.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="top">
          <Link href="/" className="logo">Brasi<b>mundo</b></Link>
          <Nav />
          <Pulse />
        </header>
        <main>{children}</main>
        <footer>
          Brasimundo · Dados públicos com fonte e data. Não é recomendação de investimento.
        </footer>
      </body>
    </html>
  );
}
