import Link from "next/link";
import Sparkline from "@/components/Sparkline";
import { STATUS_LABEL } from "@/lib/data";

export default function Indicator({ label, value, status, detail, source, href, spark }) {
  const shown = status === "ok" || status === "stale";
  const body = (
    <>
      <small>{label}</small>
      <div className="num">{shown ? value : "—"}</div>
      {spark && shown && <Sparkline values={spark} />}
      <small>{detail}</small>
      <div className="meta">
        <span className={`tag tag-${status}`}>{STATUS_LABEL[status]}</span>
        {source && <span className="src">{source}</span>}
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="box cardlink" aria-label={`${label}: ver origem e histórico`}>{body}</Link>
  ) : (
    <div className="box">{body}</div>
  );
}
