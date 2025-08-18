'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { addPointAction, removePointAction } from '@/app/actions';
import { useAuthContext } from '@/app/contexts/AuthContext';

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    avatar_file: string;
    points: number;
  };
  selectedMonth: string;
}

export default function PlayerCard({ player, selectedMonth }: PlayerCardProps) {
  const [points, setPoints] = useState(player.points);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, showPasswordModal } = useAuthContext();

  // Synchronizace lokálního state s player.points
  useEffect(() => {
    setPoints(player.points);
  }, [player.points]);

  const handleAddPoint = async () => {
    if (points >= 3 || isLoading) return;
    
    if (!isAuthenticated) {
      showPasswordModal();
      return;
    }
    
    setIsLoading(true);
    // Optimistic update
    setPoints(prev => Math.min(3, prev + 1));
    
    try {
      const result = await addPointAction(player.id, selectedMonth);
      if (!result.success) {
        // Revert optimistic update on error
        setPoints(player.points);
      }
    } catch (error) {
      // Revert optimistic update on error
      setPoints(player.points);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePoint = async () => {
    if (points <= 0 || isLoading) return;
    
    if (!isAuthenticated) {
      showPasswordModal();
      return;
    }
    
    setIsLoading(true);
    // Optimistic update
    setPoints(prev => Math.max(0, prev - 1));
    
    try {
      const result = await removePointAction(player.id, selectedMonth);
      if (!result.success) {
        // Revert optimistic update on error
        setPoints(player.points);
      }
    } catch (error) {
      // Revert optimistic update on error
      setPoints(player.points);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="player-container">
      {/* Kruhová karta s avatarem a jménem */}
      <div className="player-card">
        {/* Avatar */}
        <div className="avatar">
          <Image
            src={`/avatars/${player.avatar_file}`}
            alt={`Avatar ${player.name}`}
            width={120}
            height={120}
          />
        </div>
        
        {/* Jméno hráče */}
        <h3 className="player-name">
          {player.name}
        </h3>
      </div>
      
      {/* Chlebíčky pod kartou */}
      {points > 0 && (
        <div className="sandwiches">
          {Array(points).fill(0).map((_, index) => (
            <Image
              key={index}
              src="/images/chleb.png"
              alt="chlebíček"
              width={28}
              height={28}
              className="sandwich-icon"
            />
          ))}
        </div>
      )}
      
      {/* Tlačítka pod chlebíčky */}
      <div className="buttons">
        <button
          onClick={handleRemovePoint}
          disabled={points <= 0 || isLoading}
          className={`btn-circle ${!isAuthenticated ? 'btn-locked' : ''}`}
          title={!isAuthenticated ? 'Klikni pro odemknutí' : 'Odebrat bod'}
        >
          {isLoading ? '...' : '−'}
        </button>
        
        <button
          onClick={handleAddPoint}
          disabled={points >= 3 || isLoading}
          className={`btn-circle ${!isAuthenticated ? 'btn-locked' : ''}`}
          title={!isAuthenticated ? 'Klikni pro odemknutí' : 'Přidat bod'}
        >
          {isLoading ? '...' : '+'}
        </button>
      </div>
    </div>
  );
}
