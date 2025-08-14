import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

// Používáme mock databázi na Vercel, SQLite lokálně
import * as mockDb from './mock-db';
import * as sqliteDb from './sqlite-db';

// Typy
export interface Player {
  id: string;
  name: string;
  avatar_file: string;
}

export interface MonthlyScore {
  id: number;
  player_id: string;
  month: string;
  points: number;
  updated_at: Date;
}

export interface MonthlyMeta {
  month: string;
  winner_shown_at: Date | null;
}

// Pomocné funkce pro práci s časovými zónami
export function getCurrentMonth(): string {
  const pragueTime = utcToZonedTime(new Date(), 'Europe/Prague');
  return format(pragueTime, 'yyyy-MM');
}

export function getMonthFromDate(date: Date): string {
  const pragueTime = utcToZonedTime(date, 'Europe/Prague');
  return format(pragueTime, 'yyyy-MM');
}

// Detekce prostředí
const isVercel = process.env.VERCEL === '1';

// Databázové operace
export async function addPlayer(name: string, avatarFile: string): Promise<Player> {
  return isVercel ? mockDb.addPlayer(name, avatarFile) : sqliteDb.addPlayer(name, avatarFile);
}

export async function addPoint(playerId: string): Promise<void> {
  return isVercel ? mockDb.addPoint(playerId) : sqliteDb.addPoint(playerId);
}

export async function removePoint(playerId: string): Promise<void> {
  return isVercel ? mockDb.removePoint(playerId) : sqliteDb.removePoint(playerId);
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  return isVercel ? mockDb.getPlayersWithScores(month) : sqliteDb.getPlayersWithScores(month);
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  return isVercel ? mockDb.evaluateMonth(month) : sqliteDb.evaluateMonth(month);
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  return isVercel ? mockDb.getMonthlyMeta(month) : sqliteDb.getMonthlyMeta(month);
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  return isVercel ? mockDb.getYearlyStats(year) : sqliteDb.getYearlyStats(year);
}

export default isVercel ? mockDb : sqliteDb;
