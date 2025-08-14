'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { getMonthName } from '@/lib/constants';

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winners: Array<{
    id: string;
    name: string;
    avatar_file: string;
  }>;
  month: string;
}

export default function WinnerModal({ isOpen, onClose, winners, month }: WinnerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          ✕
        </button>
        
        <div className="modal-header">
          <Image
            src="/images/winner.png"
            alt="Vítěz"
            width={80}
            height={80}
            className="winner-icon"
          />
          <h2 className="modal-title">
            {winners.length === 1 
              ? 'Tenhle měsíc chlebíčky připravuje:'
              : 'Tenhle měsíc chlebíčky připravují:'
            }
          </h2>
        </div>
        
        {winners.length === 0 ? (
          <div className="no-winners">
            <p>Žádný hráč nemá přesně 3 chlebíčky</p>
            <p>Zkuste to příští měsíc! 🥪</p>
          </div>
        ) : (
          <div className={`winners-list ${winners.length > 2 ? 'multiple-winners' : ''}`}>
            {winners.map((winner, index) => (
              <div key={winner.id} className="winner-item" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="winner-avatar">
                  <Image
                    src={`/avatars/${winner.avatar_file}`}
                    alt={`Avatar ${winner.name}`}
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="winner-name">{winner.name}</h3>
                <div className="trophy">🏆</div>
              </div>
            ))}
          </div>
        )}
        
        <div className="modal-footer">
          <p className="month-info">
            {getMonthName(month)} {month.split('-')[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
