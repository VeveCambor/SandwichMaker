import { Suspense } from 'react';
import Link from 'next/link';
import { getCurrentMonth, getPlayersWithScores } from '@/lib/db';
import { getMonthName } from '@/lib/constants';
import PlayerCard from '@/app/components/PlayerCard';
import WinnerModal from '@/app/components/WinnerModal';
import MonthSelector from '@/app/components/MonthSelector';
import EvaluateButton from '@/app/components/EvaluateButton';
import LogoutButton from '@/app/components/LogoutButton';
import { checkPreviousMonthAction, evaluateMonthAction } from '@/app/actions';

async function DashboardContent({ searchParams }: { searchParams: { month?: string } }) {
  const currentMonth = getCurrentMonth();
  const selectedMonth = searchParams.month || currentMonth;
  const players = await getPlayersWithScores(selectedMonth);

  return (
    <div className="container">
      {/* Horní panel s měsícem a odhlášením */}
      <div className="top-panel">
        <div className="month-selector">
          <MonthSelector currentMonth={currentMonth} selectedMonth={selectedMonth} />
        </div>
        <LogoutButton />
      </div>
      
      {/* Hlavní nadpis */}
      <div className="header">
        <h1 className="title">
          Kdo tenhle měsíc chystá chlebíčky?
        </h1>
        <p className="subtitle">
          {getMonthName(selectedMonth)} {selectedMonth.split('-')[0]}
        </p>
      </div>
      
      {/* Hráči v mřížce */}
      <div className="players-grid">
        {players.length === 0 ? (
          <div className="loading">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🥪</div>
            <p>Zatím nejsou žádní hráči</p>
          </div>
        ) : (
          players.map((player, index) => (
            <div 
              key={player.id}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-in-out forwards',
                opacity: 0
              }}
            >
              <PlayerCard player={player} />
            </div>
          ))
        )}
      </div>
      
      {/* Tlačítka akcí */}
      <div className="action-buttons">
        <Link 
          href={`/stats/${new Date().getFullYear()}`}
          className="btn btn-primary"
        >
          📊 Zobrazit statistiku
        </Link>
        
        <EvaluateButton selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: { month?: string } }) {
  const currentMonth = getCurrentMonth();
  const selectedMonth = searchParams.month || currentMonth;
  
  // Kontrola předchozího měsíce pro automatický modal (vypnuto v mock režimu)
  const previousMonthCheck = { shouldShowModal: false };
  
  return (
    <>
      {/* Hlavní obsah */}
      <Suspense fallback={
        <div className="loading">
          <div className="spinner"></div>
          <p>Načítám...</p>
        </div>
      }>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
      
      {/* Automatický modal pro předchozí měsíc */}
      {previousMonthCheck.shouldShowModal && (
        <WinnerModal
          isOpen={true}
          onClose={() => {}} // V reálné aplikaci bychom použili state management
          winners={[]}
          month={currentMonth}
        />
      )}
    </>
  );
}
