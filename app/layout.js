import Link from "next/link";
import Nav from "@/components/Nav";
import Pulse from "@/components/Pulse";
import "./globals.css";

export const metadata = {
  title: "Brasimundo",
  description: "Dados do Brasil com fonte, data e nível de verificação em cada número.",
};

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" focusable="false">
      <rect width="30" height="30" rx="9" fill="#0B1F3A" />
      <circle cx="11" cy="19" r="4.5" fill="#0F8A5F" />
      <path d="M16 6 H24 L16 15 Z" fill="#F5B700" />
      <path d="M24 6 V15 H16 Z" fill="#1F4FD8" />
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Unbounded:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="top">
          <Link href="/" className="logo notranslate" translate="no">
            <LogoMark />
            <span>Brasi<b>mundo</b></span>
          </Link>
          <Nav />
          <Pulse />
        </header>
        <main>{children}</main>
        <footer>
          <span className="notranslate" translate="no">Brasi<b>mundo</b></span> · Dados públicos com fonte e data. Não é recomendação de investimento.
        </footer>
      </body>
    </html>
  );
}
