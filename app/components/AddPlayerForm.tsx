'use client';

import { useState } from 'react';
import { addPlayerAction } from '@/app/actions';
import { AVATAR_FILES } from '@/lib/constants';

export default function AddPlayerForm() {
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState(AVATAR_FILES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Jméno je povinné');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await addPlayerAction(name.trim(), avatarFile);
      
      if (result.success) {
        setName('');
        setAvatarFile(AVATAR_FILES[0]);
      } else {
        setError(result.error || 'Nepodařilo se přidat hráče');
      }
    } catch (error) {
      setError('Nepodařilo se přidat hráče');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Přidat hráče</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Jméno */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Jméno *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Zadejte jméno hráče"
            required
          />
        </div>

        {/* Avatar */}
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
            Avatar
          </label>
          <select
            id="avatar"
            value={avatarFile}
            onChange={(e) => setAvatarFile(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {AVATAR_FILES.map((file) => (
              <option key={file} value={file}>
                {file.replace('.png', '')}
              </option>
            ))}
          </select>
        </div>

        {/* Chybová zpráva */}
        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Tlačítko */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
          }`}
        >
          {isLoading ? 'Přidávám...' : 'Přidat hráče'}
        </button>
      </form>
    </div>
  );
}
