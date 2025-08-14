'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getMonthName } from '@/lib/constants';

interface MonthSelectorProps {
  currentMonth: string;
  selectedMonth: string;
}

export default function MonthSelector({ currentMonth, selectedMonth }: MonthSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleMonthChange = (month: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('month', month);
    router.push(`/?${params.toString()}`);
  };

  const generateMonthOptions = () => {
    const options = [];
    const [currentYear, currentMonthNum] = currentMonth.split('-').map(Number);
    
    // Generuj možnosti pro posledních 12 měsíců
    for (let i = 11; i >= 0; i--) {
      let year = currentYear;
      let month = currentMonthNum - i;
      
      if (month <= 0) {
        month += 12;
        year -= 1;
      }
      
      const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
      options.push(monthStr);
    }
    
    return options;
  };

  const monthOptions = generateMonthOptions();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ color: '#374151', fontWeight: '500' }}>Měsíc:</span>
      
      <select
        value={selectedMonth}
        onChange={(e) => handleMonthChange(e.target.value)}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          background: 'white',
          color: '#374151',
          fontWeight: '500'
        }}
      >
        {monthOptions.map((month) => (
          <option key={month} value={month}>
            {getMonthName(month)} {month.split('-')[0]}
            {month === currentMonth ? ' (aktuální)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
