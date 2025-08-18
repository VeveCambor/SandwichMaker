import { createClient } from '@supabase/supabase-js';
import { Player, MonthlyScore, MonthlyMeta, YearlyData, YearlyEvaluation } from './db';
import { getCurrentMonth } from './db';

// Supabase klient
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function addPlayer(name: string, avatarFile: string, month?: string): Promise<Player> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: player, error } = await supabase
    .from('players')
    .insert({ name, avatar_file: avatarFile })
    .select()
    .single();

  if (error) throw error;

  // Vytvoření záznamu pro vybraný měsíc nebo aktuální měsíc
  const targetMonth = month || getCurrentMonth();
  await supabase
    .from('monthly_scores')
    .insert({ 
      player_id: player.id, 
      month: targetMonth, 
      points: 0 
    })
    .select();

  return player;
}

export async function addPoint(playerId: string, month?: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const targetMonth = month || getCurrentMonth();
  
  // Získání aktuálních bodů
  const { data: currentScore } = await supabase
    .from('monthly_scores')
    .select('points')
    .eq('player_id', playerId)
    .eq('month', targetMonth)
    .single();

  const currentPoints = currentScore?.points || 0;
  const newPoints = Math.min(3, currentPoints + 1);

  // Upsert bodů s ON CONFLICT
  const { error } = await supabase
    .from('monthly_scores')
    .upsert({
      player_id: playerId,
      month: targetMonth,
      points: newPoints,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'player_id,month'
    });

  if (error) throw error;
}

export async function removePoint(playerId: string, month?: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const targetMonth = month || getCurrentMonth();
  
  // Získání aktuálních bodů
  const { data: currentScore } = await supabase
    .from('monthly_scores')
    .select('points')
    .eq('player_id', playerId)
    .eq('month', targetMonth)
    .single();

  const currentPoints = currentScore?.points || 0;
  const newPoints = Math.max(0, currentPoints - 1);

  // Upsert bodů s ON CONFLICT
  const { error } = await supabase
    .from('monthly_scores')
    .upsert({
      player_id: playerId,
      month: targetMonth,
      points: newPoints,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'player_id,month'
    });

  if (error) throw error;
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('players')
    .select(`
      id,
      name,
      avatar_file,
      monthly_scores(points)
    `)
    .eq('monthly_scores.month', month);

  if (error) throw error;

  return data.map(player => ({
    id: player.id,
    name: player.name,
    avatar_file: player.avatar_file,
    points: player.monthly_scores?.[0]?.points || 0
  }));
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  if (!supabase) throw new Error('Supabase not configured');
  
  console.log('Vyhodnocuji měsíc:', month);
  
  // Získání vítězů (hráči s 3 body) - jednoduchý přístup
  const { data: scores, error } = await supabase
    .from('monthly_scores')
    .select('player_id')
    .eq('month', month)
    .eq('points', 3);

  console.log('Výsledek dotazu:', { scores, error });

  if (error) throw error;

  if (!scores || scores.length === 0) {
    console.log('Žádní vítězové');
    return [];
  }

  // Získání detailů hráčů
  const playerIds = scores.map(s => s.player_id);
  const { data: players, error: playersError } = await supabase
    .from('players')
    .select('id, name, avatar_file')
    .in('id', playerIds);

  console.log('Hráči:', { players, playersError });

  if (playersError) throw playersError;

  // Zapiš winner_shown_at
  await supabase
    .from('monthly_meta')
    .upsert({
      month,
      winner_shown_at: new Date().toISOString()
    });

  const result = players || [];
  console.log('Vrácené vítěze:', result);
  
  return result;
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('monthly_meta')
    .select('month, winner_shown_at')
    .eq('month', month)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const stats = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
    
    const { data: winners } = await supabase
      .from('players')
      .select('id, name, avatar_file')
      .eq('monthly_scores.month', monthStr)
      .eq('monthly_scores.points', 3);

    stats.push({
      month: monthStr,
      winners: winners || []
    });
  }
  
  return stats;
}

export async function getYearlyData(year: string): Promise<YearlyData[]> {
  if (!supabase) throw new Error('Supabase not configured');
  
  // Získat všechny hráče
  const { data: players, error: playersError } = await supabase
    .from('players')
    .select('id, name, avatar_file')
    .order('name');
  
  if (playersError) throw playersError;
  
  // Získat skóre pro daný rok
  const { data: scores, error: scoresError } = await supabase
    .from('monthly_scores')
    .select('month, player_id, points')
    .like('month', `${year}-%`)
    .order('month');
  
  if (scoresError) throw scoresError;
  
  // Vytvořit pole pro všech 12 měsíců
  const yearlyData = [];
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
    const monthScores = scores?.filter(s => s.month === monthStr) || [];
    
    const monthPlayers = players?.map(player => {
      const score = monthScores.find(s => s.player_id === player.id);
      return {
        ...player,
        points: score ? score.points : 0
      };
    }) || [];
    
    yearlyData.push({
      month: monthStr,
      players: monthPlayers
    });
  }
  
  return yearlyData;
}

export async function evaluateYear(year: string): Promise<Player[]> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const monthlyBreakdown = await getYearlyStats(year);
  const winCounts = new Map<string, number>();
  
  // Počítání výher pro každého hráče
  monthlyBreakdown.forEach(month => {
    month.winners.forEach(winner => {
      winCounts.set(winner.id, (winCounts.get(winner.id) || 0) + 1);
    });
  });
  
  // Najít hráče s nejvíce výhrami
  const maxWins = Math.max(...Array.from(winCounts.values()), 0);
  
  // Získat všechny hráče
  const { data: allPlayers, error } = await supabase
    .from('players')
    .select('id, name, avatar_file')
    .order('name');
  
  if (error) throw error;
  
  const winners = allPlayers?.filter(player => winCounts.get(player.id) === maxWins) || [];
  
  return winners;
}
