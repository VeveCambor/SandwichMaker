'use client';

import { useState } from 'react';
import { evaluateMonthAction } from '@/app/actions';
import WinnerModal from './WinnerModal';

interface EvaluateButtonProps {
  selectedMonth: string;
}

export default function EvaluateButton({ selectedMonth }: EvaluateButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winners, setWinners] = useState<Array<{id: string; name: string; avatar_file: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEvaluate = async () => {
    setIsLoading(true);
    try {
      console.log('Vyhodnocuji měsíc:', selectedMonth);
      const result = await evaluateMonthAction(selectedMonth);
      console.log('Výsledek vyhodnocení:', result);
      if (result.success && result.winners) {
        setWinners(result.winners);
        setIsModalOpen(true);
        console.log('Modal se otevírá s vítězi:', result.winners);
      } else {
        console.log('Žádní vítězové nebo chyba:', result);
        // I když nejsou vítězové, zobrazíme modal s prázdným seznamem
        setWinners([]);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Chyba při vyhodnocování:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleEvaluate}
        disabled={isLoading}
        className="btn btn-secondary"
      >
        {isLoading ? '⏳ Vyhodnocuji...' : '🏆 Vyhodnotit měsíc'}
      </button>

      <WinnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        winners={winners}
        month={selectedMonth}
      />
    </>
  );
}
