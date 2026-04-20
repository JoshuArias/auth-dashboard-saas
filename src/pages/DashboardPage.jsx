import BrandMark from '../components/BrandMark.jsx'

const navigationItems = [
  { label: 'Dashboard', icon: 'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z' },
  { label: 'Members', icon: 'M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c.7-3.1 3.1-5 6-5s5.3 1.9 6 5H2Zm12.7 0c-.2-1.3-.7-2.4-1.5-3.4.8-.4 1.7-.6 2.8-.6 2.5 0 4.4 1.5 5 4h-6.3Z' },
  { label: 'Settings', icon: 'M11 2h2l.5 2.4c.6.2 1.2.4 1.7.7l2.1-1.3 1.4 1.4-1.3 2.1c.3.5.6 1.1.7 1.7l2.4.5v2l-2.4.5c-.2.6-.4 1.2-.7 1.7l1.3 2.1-1.4 1.4-2.1-1.3c-.5.3-1.1.6-1.7.7L13 20h-2l-.5-2.4c-.6-.2-1.2-.4-1.7-.7l-2.1 1.3-1.4-1.4 1.3-2.1c-.3-.5-.6-1.1-.7-1.7L3.5 12v-2l2.4-.5c.2-.6.4-1.2.7-1.7L5.3 5.7l1.4-1.4 2.1 1.3c.5-.3 1.1-.6 1.7-.7L11 2Zm1 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' },
]

const stats = [
  { label: 'Active sessions', value: '1', detail: 'Current device', accent: 'blue' },
  { label: 'Projects', value: '8', detail: 'Synced workspaces', accent: 'green' },
  { label: 'Storage usage', value: '25 GB', detail: 'of 100 GB', accent: 'amber' },
]

const activityItems = [
  'Profile verified',
  'Dashboard opened',
  'Security preferences synced',
  'Workspace created',
]

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function DashboardPage({ user, onLogout }) {
  const firstName = user.name.split(' ')[0]
  const memberSince = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(user.createdAt))

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <BrandMark />
        <nav className="side-nav" aria-label="Dashboard navigation">
          {navigationItems.map((item, index) => (
            <button className={index === 0 ? 'active' : ''} key={item.label} type="button">
              <Icon path={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Welcome, {firstName}</h1>
          </div>

          <div className="account-actions">
            <div className="user-chip">
              <span className="avatar" aria-hidden="true">
                {getInitials(user.name)}
              </span>
              <span>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </span>
            </div>
            <button className="logout-button" type="button" onClick={onLogout}>
              <svg viewBox="0 0 20 20" role="presentation" aria-hidden="true">
                <path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M13 7l3 3-3 3M16 10H8" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <section className="welcome-band">
          <div>
            <p className="eyebrow">Protected dashboard</p>
            <h2>Your workspace is ready.</h2>
            <p>
              Signed in as {user.email}. Member since {memberSince}.
            </p>
          </div>
          <div className="status-pill">
            <span aria-hidden="true"></span>
            Session active
          </div>
        </section>

        <section className="stats-grid" aria-label="Account statistics">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
              <span>{stat.detail}</span>
              <div className={`progress ${stat.accent}`} aria-hidden="true">
                <span></span>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="activity-card">
            <div className="section-title">
              <h2>Recent activity</h2>
              <span>Today</span>
            </div>
            <ul>
              {activityItems.map((item, index) => (
                <li key={item}>
                  <span className="activity-dot" aria-hidden="true"></span>
                  <span>{item}</span>
                  <time>{index + 1}h ago</time>
                </li>
              ))}
            </ul>
          </article>

          <article className="chart-card">
            <div className="section-title">
              <h2>Usage trend</h2>
              <span>8 months</span>
            </div>
            <svg className="trend-chart" viewBox="0 0 420 220" role="img" aria-label="Usage trend chart">
              <path className="chart-grid" d="M20 30H400M20 78H400M20 126H400M20 174H400" />
              <path className="chart-area" d="M20 170 75 146 130 92 185 128 240 96 295 104 350 68 400 44V190H20Z" />
              <path className="chart-line" d="M20 170 75 146 130 92 185 128 240 96 295 104 350 68 400 44" />
              <g className="chart-labels">
                <text x="20" y="210">Jan</text>
                <text x="130" y="210">Mar</text>
                <text x="240" y="210">May</text>
                <text x="350" y="210">Jul</text>
              </g>
            </svg>
          </article>
        </section>
      </section>
    </main>
  )
}

export default DashboardPage
