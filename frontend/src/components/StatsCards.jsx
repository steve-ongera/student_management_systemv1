export default function StatsCards({ stats }) {
  if (!stats) return null;
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Total Students</div>
        <div className="stat-value">{stats.total ?? 0}</div>
      </div>
      <div className="stat-card green">
        <div className="stat-label">Active</div>
        <div className="stat-value">{stats.active ?? 0}</div>
      </div>
      <div className="stat-card orange">
        <div className="stat-label">Inactive</div>
        <div className="stat-value">{stats.inactive ?? 0}</div>
      </div>
      <div className="stat-card blue">
        <div className="stat-label">Avg GPA</div>
        <div className="stat-value">{stats.avg_gpa ?? '—'}</div>
      </div>
    </div>
  );
}