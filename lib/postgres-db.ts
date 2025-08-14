import { sql } from '@vercel/postgres';
import { Player, MonthlyScore, MonthlyMeta } from './db';
import { getCurrentMonth } from './db';

// Inicializace databáze
async function initializeDatabase() {
  try {
    // Vytvoření tabulek
    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        avatar_file TEXT NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS monthly_scores (
        id BIGSERIAL PRIMARY KEY,
        player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
        month CHAR(7) NOT NULL,
        points INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (player_id, month)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS monthly_meta (
        month CHAR(7) PRIMARY KEY,
        winner_shown_at TIMESTAMPTZ
      )
    `;

    // Kontrola, zda už existují hráči
    const players = await sql`SELECT COUNT(*) as count FROM players`;
    if (players.rows[0].count === '0') {
      // Vložení výchozích hráčů
      await sql`
        INSERT INTO players (name, avatar_file) VALUES
        ('Petr', 'BigC.png'),
        ('Marcus', 'Marcus.png'),
        ('Vratis', 'Vratis.png'),
        ('Wewe', 'Wewe.png')
      `;

      // Získání ID hráčů pro vytvoření výchozích skóre
      const playerRows = await sql`SELECT id FROM players`;
      const currentMonth = getCurrentMonth();
      
      for (const player of playerRows.rows) {
        await sql`
          INSERT INTO monthly_scores (player_id, month, points)
          VALUES (${player.id}, ${currentMonth}, 0)
          ON CONFLICT (player_id, month) DO NOTHING
        `;
      }
    }
  } catch (error) {
    console.error('Chyba při inicializaci databáze:', error);
  }
}

// Inicializace při importu
initializeDatabase();

export async function addPlayer(name: string, avatarFile: string): Promise<Player> {
  const result = await sql`
    INSERT INTO players (name, avatar_file)
    VALUES (${name}, ${avatarFile})
    RETURNING id, name, avatar_file
  `;
  
  const player = result.rows[0] as Player;
  
  // Vytvoření záznamu pro aktuální měsíc
  const currentMonth = getCurrentMonth();
  await sql`
    INSERT INTO monthly_scores (player_id, month, points)
    VALUES (${player.id}, ${currentMonth}, 0)
    ON CONFLICT (player_id, month) DO NOTHING
  `;
  
  return player;
}

export async function addPoint(playerId: string): Promise<void> {
  const currentMonth = getCurrentMonth();
  await sql`
    INSERT INTO monthly_scores (player_id, month, points)
    VALUES (${playerId}, ${currentMonth}, 1)
    ON CONFLICT (player_id, month)
    DO UPDATE SET 
      points = LEAST(3, monthly_scores.points + 1),
      updated_at = now()
  `;
}

export async function removePoint(playerId: string): Promise<void> {
  const currentMonth = getCurrentMonth();
  await sql`
    INSERT INTO monthly_scores (player_id, month, points)
    VALUES (${playerId}, ${currentMonth}, 0)
    ON CONFLICT (player_id, month)
    DO UPDATE SET 
      points = GREATEST(0, monthly_scores.points - 1),
      updated_at = now()
  `;
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  const result = await sql`
    SELECT p.id, p.name, p.avatar_file, COALESCE(ms.points, 0) as points
    FROM players p
    LEFT JOIN monthly_scores ms ON p.id = ms.player_id AND ms.month = ${month}
    ORDER BY p.name
  `;
  
  return result.rows as (Player & { points: number })[];
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  const result = await sql`
    SELECT p.id, p.name, p.avatar_file
    FROM players p
    JOIN monthly_scores ms ON p.id = ms.player_id
    WHERE ms.month = ${month} AND ms.points = 3
  `;
  
  // Zapiš winner_shown_at
  await sql`
    INSERT INTO monthly_meta (month, winner_shown_at)
    VALUES (${month}, now())
    ON CONFLICT (month)
    DO UPDATE SET winner_shown_at = now()
  `;
  
  return result.rows as Player[];
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  const result = await sql`
    SELECT month, winner_shown_at
    FROM monthly_meta
    WHERE month = ${month}
  `;
  
  return result.rows[0] as MonthlyMeta || null;
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  const stats = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
    
    const result = await sql`
      SELECT p.id, p.name, p.avatar_file
      FROM players p
      JOIN monthly_scores ms ON p.id = ms.player_id
      WHERE ms.month = ${monthStr} AND ms.points = 3
    `;
    
    stats.push({
      month: monthStr,
      winners: result.rows as Player[]
    });
  }
  
  return stats;
}
