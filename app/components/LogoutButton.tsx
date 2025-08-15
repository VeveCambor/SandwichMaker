'use client';

import { useAuthContext } from '@/app/contexts/AuthContext';

export default function LogoutButton() {
  const { isAuthenticated, logout } = useAuthContext();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={logout}
      className="logout-btn"
      title="Odhlásit se (30 minut)"
    >
      🔓 Odhlásit
    </button>
  );
}
