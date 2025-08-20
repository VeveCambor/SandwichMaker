'use server';

import { revalidatePath } from 'next/cache';
import { addPoint, removePoint, evaluateMonth, evaluateYear } from '@/lib/db';

export async function addPointAction(playerId: string, month?: string) {
  try {
    await addPoint(playerId, month);
    revalidatePath('/');
    revalidatePath(`/?month=${month}`);
    return { success: true };
  } catch (error) {
    console.error('Chyba při přidávání bodu:', error);
    return { success: false, error: 'Nepodařilo se přidat bod' };
  }
}

export async function removePointAction(playerId: string, month?: string) {
  try {
    await removePoint(playerId, month);
    revalidatePath('/');
    revalidatePath(`/?month=${month}`);
    return { success: true };
  } catch (error) {
    console.error('Chyba při odebírání bodu:', error);
    return { success: false, error: 'Nepodařilo se odebrat bod' };
  }
}

export async function verifyPasswordAction(password: string) {
  const correctPassword = process.env.APP_PASSWORD || 'sandwich2025';
  return { success: password === correctPassword };
}

export async function evaluateMonthAction(month: string) {
  try {
    const winners = await evaluateMonth(month);
    return { success: true, winners };
  } catch (error) {
    console.error('Chyba při vyhodnocování měsíce:', error);
    return { success: false, error: 'Nepodařilo se vyhodnotit měsíc' };
  }
}

export async function evaluateYearAction(year: string) {
  try {
    const winners = await evaluateYear(year);
    return { success: true, winners };
  } catch (error) {
    console.error('Chyba při vyhodnocování roku:', error);
    return { success: false, error: 'Nepodařilo se vyhodnotit rok' };
  }
}

export async function checkPreviousMonthAction() {
  // Tato funkce může být implementována pro kontrolu předchozího měsíce
  return { shouldShowModal: false };
}
