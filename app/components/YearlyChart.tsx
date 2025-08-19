'use client';

import { YearlyData } from '@/lib/db';
import { getMonthName } from '@/lib/constants';

interface YearlyChartProps {
  data: YearlyData[];
}

export default function YearlyChart({ data }: YearlyChartProps) {
  const players = data[0]?.players || [];
  const months = data.map(d => getMonthName(d.month).substring(0, 3));
  
  const colors = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // yellow
  ];

  const maxPoints = 3;

  return (
    <div className="yearly-chart">
      <h3 className="chart-title">Vývoj bodů v roce</h3>
      
      <div className="chart-container">
        {/* Y-axis labels */}
        <div className="y-axis">
          {[3, 2, 1, 0].map(points => (
            <div key={points} className="y-label">
              {points}
            </div>
          ))}
        </div>
        
        {/* Chart area */}
        <div className="chart-area">
          {/* Grid lines */}
          <div className="grid-lines">
            {[3, 2, 1, 0].map(points => (
              <div 
                key={points} 
                className="grid-line"
                style={{ 
                  bottom: `${(points / maxPoints) * 100}%` 
                }}
              />
            ))}
          </div>
          
          {/* Player lines */}
          {players.map((player, playerIndex) => {
            const playerData = data.map(month => 
              month.players.find(p => p.id === player.id)?.points || 0
            );
            
            return (
              <div key={player.id} className="player-line">
                <div 
                  className="line-path"
                >
                  {playerData.map((points, monthIndex) => (
                    <div
                      key={monthIndex}
                      className="data-point"
                      style={{
                        left: `${(monthIndex / (months.length - 1)) * 100}%`,
                        bottom: `${(points / maxPoints) * 100}%`,
                        backgroundColor: colors[playerIndex % colors.length],
                      }}
                      data-tooltip={`${player.name}: ${points} bodů v ${months[monthIndex]}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* X-axis labels */}
          <div className="x-axis">
            {months.map((month, index) => (
              <div 
                key={index} 
                className="x-label"
                style={{ left: `${(index / (months.length - 1)) * 100}%` }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="chart-legend">
        {players.map((player, index) => (
          <div key={player.id} className="legend-item">
            <div 
              className="legend-color"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="legend-name">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
