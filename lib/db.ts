import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

// Používáme Supabase na Vercel, SQLite lokálně
import * as supabaseDb from './supabase-db';
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

export interface YearlyData {
  month: string;
  players: (Player & { points: number })[];
}

export interface YearlyEvaluation {
  totalWins: number;
  winners: Player[];
  monthlyBreakdown: { month: string; winners: Player[] }[];
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
export async function addPlayer(name: string, avatarFile: string, month?: string): Promise<Player> {
  return isVercel ? supabaseDb.addPlayer(name, avatarFile, month) : sqliteDb.addPlayer(name, avatarFile, month);
}

export async function addPoint(playerId: string, month?: string): Promise<void> {
  return isVercel ? supabaseDb.addPoint(playerId, month) : sqliteDb.addPoint(playerId, month);
}

export async function removePoint(playerId: string, month?: string): Promise<void> {
  return isVercel ? supabaseDb.removePoint(playerId, month) : sqliteDb.removePoint(playerId, month);
}

export async function getPlayersWithScores(month: string): Promise<(Player & { points: number })[]> {
  return isVercel ? supabaseDb.getPlayersWithScores(month) : sqliteDb.getPlayersWithScores(month);
}

export async function evaluateMonth(month: string): Promise<Player[]> {
  return isVercel ? supabaseDb.evaluateMonth(month) : sqliteDb.evaluateMonth(month);
}

export async function getMonthlyMeta(month: string): Promise<MonthlyMeta | null> {
  return isVercel ? supabaseDb.getMonthlyMeta(month) : sqliteDb.getMonthlyMeta(month);
}

export async function getYearlyStats(year: string): Promise<{ month: string; winners: Player[] }[]> {
  return isVercel ? supabaseDb.getYearlyStats(year) : sqliteDb.getYearlyStats(year);
}

export async function getYearlyData(year: string): Promise<YearlyData[]> {
  return isVercel ? supabaseDb.getYearlyData(year) : sqliteDb.getYearlyData(year);
}

export async function evaluateYear(year: string): Promise<Player[]> {
  return isVercel ? supabaseDb.evaluateYear(year) : sqliteDb.evaluateYear(year);
}

export default isVercel ? supabaseDb : sqliteDb;
