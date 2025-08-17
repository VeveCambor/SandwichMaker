'use client';

import { useState } from 'react';
import { evaluateYearAction } from '@/app/actions';
import WinnerModal from './WinnerModal';

interface YearlyEvaluateButtonProps {
  year: string;
}

export default function YearlyEvaluateButton({ year }: YearlyEvaluateButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winners, setWinners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEvaluate = async () => {
    setIsLoading(true);
    try {
      const result = await evaluateYearAction(year);
      if (result.success && result.winners) {
        setWinners(result.winners);
        setIsModalOpen(true);
      } else {
        console.error('Chyba při vyhodnocování roku:', result.error);
      }
    } catch (error) {
      console.error('Chyba při vyhodnocování roku:', error);
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
        style={{ marginTop: '1rem' }}
      >
        {isLoading ? 'Vyhodnocuji...' : '🏆 Vyhodnotit rok'}
      </button>

      <WinnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        winners={winners}
        month={`${year} (celý rok)`}
      />
    </>
  );
}
