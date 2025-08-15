'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/app/hooks/useAuth';

interface AuthContextType {
  showPasswordModal: () => void;
  hidePasswordModal: () => void;
  isPasswordModalOpen: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { isAuthenticated, authenticate, isLoading, logout: authLogout } = useAuth();

  const showPasswordModal = () => {
    if (!isAuthenticated) {
      setIsPasswordModalOpen(true);
    }
  };

  const hidePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleAuthSuccess = () => {
    authenticate();
    hidePasswordModal();
  };

  const handleLogout = () => {
    authLogout();
  };

  return (
    <AuthContext.Provider value={{
      showPasswordModal,
      hidePasswordModal,
      isPasswordModalOpen,
      isAuthenticated,
      isLoading,
      logout: handleLogout
    }}>
      {children}
      
      {/* Globální Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={hidePasswordModal}
          onSuccess={handleAuthSuccess}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Import PasswordModal na konci souboru
import PasswordModal from '@/app/components/PasswordModal';
