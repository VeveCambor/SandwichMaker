import { createClient } from '@supabase/supabase-js';
import { Player, MonthlyScore, MonthlyMeta } from './db';
import { getCurrentMonth } from './db';

// Supabase klient
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function addPlayer(name: string, avatarFile: string): Promise<Player> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: player, error } = await supabase
    .from('players')
    .insert({ name, avatar_file: avatarFile })
    .select()
    .single();

  if (error) throw error;

  // Vytvoření záznamu pro aktuální měsíc
  const currentMonth = getCurrentMonth();
  await supabase
    .from('monthly_scores')
    .insert({ 
      player_id: player.id, 
      month: currentMonth, 
      points: 0 
    })
    .select();

  return player;
}

export async function addPoint(playerId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const currentMonth = getCurrentMonth();
  
  // Získání aktuálních bodů
  const { data: currentScore } = await supabase
    .from('monthly_scores')
    .select('points')
    .eq('player_id', playerId)
    .eq('month', currentMonth)
    .single();

  const currentPoints = currentScore?.points || 0;
  const newPoints = Math.min(3, currentPoints + 1);

  // Upsert bodů s ON CONFLICT
  const { error } = await supabase
    .from('monthly_scores')
    .upsert({
      player_id: playerId,
      month: currentMonth,
      points: newPoints,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'player_id,month'
    });

  if (error) throw error;
}

export async function removePoint(playerId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  
  const currentMonth = getCurrentMonth();
  
  // Získání aktuálních bodů
  const { data: currentScore } = await supabase
    .from('monthly_scores')
    .select('points')
    .eq('player_id', playerId)
    .eq('month', currentMonth)
    .single();

  const currentPoints = currentScore?.points || 0;
  const newPoints = Math.max(0, currentPoints - 1);

  // Upsert bodů s ON CONFLICT
  const { error } = await supabase
    .from('monthly_scores')
    .upsert({
      player_id: playerId,
      month: currentMonth,
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
  
  // Získání vítězů (hráči s 3 body)
  const { data: winners, error } = await supabase
    .from('players')
    .select('id, name, avatar_file')
    .eq('monthly_scores.month', month)
    .eq('monthly_scores.points', 3)
    .select(`
      id,
      name,
      avatar_file
    `);

  if (error) throw error;

  // Zapiš winner_shown_at
  await supabase
    .from('monthly_meta')
    .upsert({
      month,
      winner_shown_at: new Date().toISOString()
    });

  return winners || [];
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
