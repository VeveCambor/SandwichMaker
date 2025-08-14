import Link from 'next/link';
import Image from 'next/image';
import { getYearlyStats } from '@/lib/db';
import { getMonthName } from '@/lib/constants';

interface StatsPageProps {
  params: {
    year: string;
  };
}

export default async function StatsPage({ params }: StatsPageProps) {
  const year = params.year;
  const stats = await getYearlyStats(year);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="title">
          Statistiky výherců {year}
        </h1>
        <p className="subtitle">
          Přehled měsíčních vítězů
        </p>
      </div>

      {/* Navigace zpět */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/" className="btn btn-primary">
          ← Zpět na dashboard
        </Link>
      </div>

      {/* Statistika */}
      {stats.length === 0 ? (
        <div className="loading">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
          <p>Zatím nejsou žádné statistiky pro rok {year}</p>
        </div>
      ) : (
        <div className="stats-grid">
          {stats.map((monthStat, index) => (
            <div 
              key={monthStat.month}
              className="stat-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInFromBottom 0.6s ease-out forwards',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <div className="stat-header">
                <h3 className="stat-month">
                  {getMonthName(monthStat.month)}
                </h3>
                <div className="stat-year">{monthStat.month.split('-')[0]}</div>
              </div>

              {monthStat.winners.length === 0 ? (
                <div className="no-winner">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😇</div>
                  <p>Žádný vítěz</p>
                </div>
              ) : (
                <div className="winners-grid">
                  {monthStat.winners.map((winner, winnerIndex) => (
                    <div key={winner.id} className="winner-card">
                      <div className="winner-avatar">
                        <Image
                          src={`/avatars/${winner.avatar_file}`}
                          alt={`Avatar ${winner.name}`}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="winner-name">{winner.name}</div>
                      <div className="winner-trophy">🏆</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
