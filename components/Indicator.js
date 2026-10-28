import { STATUS_LABEL } from "@/lib/data";

export default function Indicator({ label, value, status, detail, source }) {
  const shown = status === "ok" || status === "stale";
  return (
    <div className="box">
      <small>{label}</small>
      <div className="num">{shown ? value : "—"}</div>
      <small>{detail}</small>
      <div className="meta">
        <span className={`tag tag-${status}`}>{STATUS_LABEL[status]}</span>
        {source && <span className="src">{source}</span>}
      </div>
    </div>
  );
}
