import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Player, MonthlyScore, MonthlyMeta } from './db';
import { getCurrentMonth } from './db';

let db: Database | null = null;

// Inicializace databáze
async function getDatabase(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: './sandwichmaker.db',
      driver: sqlite3.Database
    });
    
    // Vytvoření tabulek
    await db.exec(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        avatar_file TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS monthly_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id TEXT NOT NULL,
        month TEXT NOT NULL,
        points INTEGER NOT NULL DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(player_id, month),
        FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS monthly_meta (
        month TEXT PRIMARY KEY,
        winner_shown_at DATETIME
      );

      CREATE INDEX IF NOT EXISTS idx_monthly_scores_month ON monthly_scores(month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_player_month ON monthly_scores(player_id, month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_points ON monthly_scores(points);
    `);
    
    // Vložení výchozích hráčů, pokud neexistují (updated order based on user feedback)
    const players = await db.all('SELECT COUNT(*) as count FROM players');
    if (players[0].count === 0) {
      const currentMonth = getCurrentMonth();
      await db.exec(`
        INSERT INTO players (id, name, avatar_file) VALUES
        ('1', 'Petr', 'BigC.png'),
        ('2', 'Marcus', 'Marcus.png'),
        ('3', 'Vratis', 'Vratis.png'),
        ('4', 'Wewe', 'Wewe.png')
      `);
      // Adding initial test points
      await db.exec(`
        INSERT INTO monthly_scores (player_id, month, points) VALUES
        ('1', '${currentMonth}', 3),
        ('2', '${currentMonth}', 0),
        ('3', '${currentMonth}', 2),
        ('4', '${currentMonth}', 1)
      `);
    }
  }
  return db;
}

// Databázové operace
export async function addPlayer(name: string, avatarFile: string): Promise<Player> {
  const database = await getDatabase();
  const id = Math.random().toString(36).substr(2, 9);
  
  await database.run(
    'INSERT INTO players (id, name, avatar_file) VALUES (?, ?, ?)',
    [id, name, avatarFile]
  );
  
  const currentMonth = getCurrentMonth();
  await database.run(
    'INSERT OR IGNORE INTO monthly_scores (player_id, month, points) VALUES (?, ?, 0)',
    [id, currentMonth]
  );
  
  return { id, name, avatar_file: avatarFile };
}

export async function addPoint(playerId: string): Promise<void> {
  const database = await getDatabase();
  const currentMonth = getCurrentMonth();
  
  await database.run(`
    INSERT INTO monthly_scores (player_id, month, points) 
    VALUES (?, ?, 1) 
    ON CONFLICT(player_id, month) 
    DO UPDATE SET points = MIN(3, points + 1), updated_at = CURRENT_TIMESTAMP
  `, [playerId, currentMonth]);
}

export async function removePoint(playerId: string): Promise<void> {
  const database = await getDatabase();
  const currentMonth = getCurrentMonth();
  
  await database.run(`
    INSERT INTO monthly_scores (player_id, month, points) 
    VALUES (?, ?, 0) 
    ON CONFLICT(player_id, month) 
    DO UPDATE SET points = MAX(0, points - 1), updated_at = CURRENT_TIMESTAMP
  `, [playerId, currentMonth]);
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  const database = await getDatabase();
  
  const result = await database.all(`
    SELECT p.id, p.name, p.avatar_file, COALESCE(ms.points, 0) as points
    FROM players p
    LEFT JOIN monthly_scores ms ON p.id = ms.player_id AND ms.month = ?
    ORDER BY p.name
  `, [month]);
  
  return result;
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  const database = await getDatabase();
  
  // Najdi výherce (hráče s 3 body)
  const winners = await database.all(`
    SELECT p.id, p.name, p.avatar_file
    FROM players p
    JOIN monthly_scores ms ON p.id = ms.player_id
    WHERE ms.month = ? AND ms.points = 3
  `, [month]);
  
  // Zapiš winner_shown_at
  await database.run(`
    INSERT OR REPLACE INTO monthly_meta (month, winner_shown_at) 
    VALUES (?, CURRENT_TIMESTAMP)
  `, [month]);
  
  return winners;
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  const database = await getDatabase();
  
  const result = await database.get(
    'SELECT * FROM monthly_meta WHERE month = ?',
    [month]
  );
  
  return result || null;
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  const database = await getDatabase();
  
  const result = await database.all(`
    SELECT ms.month, p.id, p.name, p.avatar_file
    FROM monthly_scores ms
    JOIN players p ON ms.player_id = p.id
    WHERE ms.month LIKE ? AND ms.points = 3
    ORDER BY ms.month
  `, [`${year}-%`]);
  
  // Seskupit podle měsíců
  const monthlyWinners: { [key: string]: Player[] } = {};
  
  for (const row of result) {
    if (!monthlyWinners[row.month]) {
      monthlyWinners[row.month] = [];
    }
    monthlyWinners[row.month].push({
      id: row.id,
      name: row.name,
      avatar_file: row.avatar_file
    });
  }
  
  // Vytvořit pole pro všech 12 měsíců
  const stats = [];
  for (let month = 1; month <= 12; month++) {
    const monthStr = `${year}-${month.toString().padStart(2, 0)}`;
    stats.push({
      month: monthStr,
      winners: monthlyWinners[monthStr] || []
    });
  }
  
  return stats;
}

export default getDatabase;
