import { Player, MonthlyScore, MonthlyMeta } from './db';
import { getCurrentMonth } from './db';

// Mock data pro Vercel deployment
const mockPlayers: Player[] = [
  { id: '1', name: 'Petr', avatar_file: 'BigC.png' },
  { id: '2', name: 'Marcus', avatar_file: 'Marcus.png' },
  { id: '3', name: 'Vratis', avatar_file: 'Vratis.png' },
  { id: '4', name: 'Verča', avatar_file: 'Verča.png' }
];

const mockScores: { [key: string]: { [playerId: string]: number } } = {
  '2024-12': {
    '1': 3,
    '2': 0,
    '3': 2,
    '4': 1
  }
};

const mockMeta: { [key: string]: MonthlyMeta } = {};

// Mock databázové operace
export async function addPlayer(name: string, avatarFile: string): Promise<Player> {
  const id = Math.random().toString(36).substr(2, 9);
  const player = { id, name, avatar_file: avatarFile };
  mockPlayers.push(player);
  return player;
}

export async function addPoint(playerId: string): Promise<void> {
  const currentMonth = getCurrentMonth();
  if (!mockScores[currentMonth]) {
    mockScores[currentMonth] = {};
  }
  const currentPoints = mockScores[currentMonth][playerId] || 0;
  mockScores[currentMonth][playerId] = Math.min(3, currentPoints + 1);
}

export async function removePoint(playerId: string): Promise<void> {
  const currentMonth = getCurrentMonth();
  if (!mockScores[currentMonth]) {
    mockScores[currentMonth] = {};
  }
  const currentPoints = mockScores[currentMonth][playerId] || 0;
  mockScores[currentMonth][playerId] = Math.max(0, currentPoints - 1);
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  const monthScores = mockScores[month] || {};
  return mockPlayers.map(player => ({
    ...player,
    points: monthScores[player.id] || 0
  }));
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  const monthScores = mockScores[month] || {};
  const winners = mockPlayers.filter(player => monthScores[player.id] === 3);
  
  // Zapiš winner_shown_at
  mockMeta[month] = {
    month,
    winner_shown_at: new Date()
  };
  
  return winners;
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  return mockMeta[month] || null;
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  const stats = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
    const monthScores = mockScores[monthStr] || {};
    const winners = mockPlayers.filter(player => monthScores[player.id] === 3);
    
    stats.push({
      month: monthStr,
      winners
    });
  }
  
  return stats;
}
