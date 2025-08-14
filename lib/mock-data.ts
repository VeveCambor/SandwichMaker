import { Player } from './db';
import { getCurrentMonth } from './db';

// Mock data pro testování
export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Vratis',
    avatar_file: 'Vratis.png'
  },
  {
    id: '2', 
    name: 'BigC',
    avatar_file: 'BigC.png'
  },
  {
    id: '3',
    name: 'Marcus', 
    avatar_file: 'Marcus.png'
  },
  {
    id: '4',
    name: 'Wewe',
    avatar_file: 'Wewe.png'
  }
];

export const mockScores: { [key: string]: { [playerId: string]: number } } = {
  '2024-12': {
    '1': 2,
    '2': 3,
    '3': 1,
    '4': 0
  },
  '2024-11': {
    '1': 3,
    '2': 2,
    '3': 3,
    '4': 1
  }
};

export function getMockPlayersWithScores(month: string) {
  const monthScores = mockScores[month] || {};
  
  return mockPlayers.map(player => ({
    ...player,
    points: monthScores[player.id] || 0
  }));
}

export function getMockWinners(month: string): Player[] {
  const monthScores = mockScores[month] || {};
  return mockPlayers.filter(player => monthScores[player.id] === 3);
}

export function getMockYearlyStats(year: string) {
  const stats = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
    const winners = getMockWinners(monthStr);
    
    stats.push({
      month: monthStr,
      winners
    });
  }
  
  return stats;
}
