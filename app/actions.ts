'use server';

import { addPlayer, addPoint, removePoint, evaluateMonth, getMonthlyMeta, getCurrentMonth } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addPlayerAction(name: string, avatarFile: string) {
  try {
    await addPlayer(name, avatarFile);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Chyba při přidávání hráče:', error);
    return { success: false, error: 'Nepodařilo se přidat hráče' };
  }
}

export async function addPointAction(playerId: string) {
  try {
    await addPoint(playerId);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Chyba při přidávání bodu:', error);
    return { success: false, error: 'Nepodařilo se přidat bod' };
  }
}

export async function removePointAction(playerId: string) {
  try {
    await removePoint(playerId);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Chyba při odebírání bodu:', error);
    return { success: false, error: 'Nepodařilo se odebrat bod' };
  }
}

export async function evaluateMonthAction(month?: string) {
  try {
    const targetMonth = month || getCurrentMonth();
    const winners = await evaluateMonth(targetMonth);
    revalidatePath('/');
    return { success: true, winners };
  } catch (error) {
    console.error('Chyba při vyhodnocování měsíce:', error);
    return { success: false, error: 'Nepodařilo se vyhodnotit měsíc' };
  }
}

export async function checkPreviousMonthAction() {
  try {
    const currentMonth = getCurrentMonth();
    const [year, month] = currentMonth.split('-');
    
    // Spočítej předchozí měsíc
    let prevMonth: string;
    if (month === '01') {
      prevMonth = `${parseInt(year) - 1}-12`;
    } else {
      prevMonth = `${year}-${(parseInt(month) - 1).toString().padStart(2, '0')}`;
    }
    
    const meta = await getMonthlyMeta(prevMonth);
    
    // Pokud předchozí měsíc nemá winner_shown_at, vyhodnoť ho
    if (!meta?.winner_shown_at) {
      const winners = await evaluateMonth(prevMonth);
      return { shouldShowModal: true, winners, month: prevMonth };
    }
    
    return { shouldShowModal: false };
  } catch (error) {
    console.error('Chyba při kontrole předchozího měsíce:', error);
    return { shouldShowModal: false };
  }
}
