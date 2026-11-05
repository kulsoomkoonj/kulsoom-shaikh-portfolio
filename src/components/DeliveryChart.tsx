type Bar = { label: string; count: number };
type Stat = { value: string; label: string; note: string };

export function DeliveryChart({
  title,
  caption,
  bars,
  stats,
}: {
  title: string;
  caption: string;
  bars: Bar[];
  stats: Stat[];
}) {
  const max = Math.max(...bars.map((bar) => bar.count), 1);

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <article className="stat-card p-4 p-lg-5 h-100">
          <h3 className="h4 h-display mb-2">{title}</h3>
          <p className="text-secondary mb-4">{caption}</p>
          <ul className="list-unstyled mb-0 chart-list">
            {bars.map((bar) => (
              <li key={bar.label}>
                <div className="d-flex justify-content-between gap-3 mb-1">
                  <span>{bar.label}</span>
                  <span className="text-secondary">{bar.count}</span>
                </div>
                <div className="chart-track" role="img" aria-label={`${bar.label}: ${bar.count}`}>
                  <div className="chart-fill" style={{ width: `${(bar.count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <div className="col-lg-5">
        <div className="row g-3 h-100">
          {stats.map((stat) => (
            <div className="col-6" key={stat.label}>
              <article className="stat-card p-3 p-lg-4 h-100">
                <p className="display-6 mb-1">{stat.value}</p>
                <p className="fw-semibold mb-1">{stat.label}</p>
                <p className="text-secondary small mb-0">{stat.note}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
