import Azulejo from "@/components/Azulejo";

// Navy page header with the tile band underneath. One ornament per page, as the guide asks.
export default function Hero({ eyebrow, title, lead, variant = 0 }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        {eyebrow && <span className="pill">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
      <Azulejo variant={variant} />
    </section>
  );
}
