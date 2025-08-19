'use client';

import { useState, useEffect } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || 'sandwich2025'; // Heslo pro přístup

export default function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulace krátkého zpoždění pro UX
    await new Promise(resolve => setTimeout(resolve, 300));

    if (password === CORRECT_PASSWORD) {
      onSuccess();
      onClose();
    } else {
      setError('Nesprávné heslo');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay password-modal-overlay" onClick={onClose}>
      <div className="modal-content password-modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Zavřít"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="password-content">
            <div className="password-icon">🔒</div>
            <h3>Přístup k úpravám</h3>
            <p>Pro přidání nebo odebrání bodů zadej heslo:</p>
            
            <form onSubmit={handleSubmit}>
              <div className="password-input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Zadej heslo..."
                  className="password-input-large"
                  autoFocus
                  disabled={isLoading}
                />
                
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="password-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Zrušit
                </button>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || !password.trim()}
                >
                  {isLoading ? 'Ověřuji...' : 'Ověřit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
