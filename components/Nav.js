"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/", "Terminal"],
  ["/calendario", "Calendário"],
  ["/estados", "Estados"],
  ["/calculadoras", "Calculadoras"],
  ["/status", "Status dos dados"],
  ["/metodologia", "Metodologia"],
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="main" aria-label="Principal">
      {LINKS.map(([href, label]) => (
        <Link key={href} href={href} className={path === href ? "on" : ""} aria-current={path === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
