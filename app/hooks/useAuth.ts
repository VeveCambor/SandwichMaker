'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kontrola localStorage při načtení
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('sandwich-auth');
        if (authData) {
          const { timestamp } = JSON.parse(authData);
          const now = Date.now();
          const thirtyMinutes = 30 * 60 * 1000; // 30 minut v ms
          
          if (now - timestamp < thirtyMinutes) {
            setIsAuthenticated(true);
          } else {
            // Vypršela platnost - smaž data
            localStorage.removeItem('sandwich-auth');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Chyba při kontrole ověření:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const authenticate = () => {
    try {
      const authData = {
        timestamp: Date.now()
      };
      localStorage.setItem('sandwich-auth', JSON.stringify(authData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Chyba při ukládání ověření:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('sandwich-auth');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Chyba při odhlášení:', error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout
  };
}
