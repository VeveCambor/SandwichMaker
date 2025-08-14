// Seznam dostupných avatar souborů
export const AVATAR_FILES = [
  'Vratis.png',
  'BigC.png', 
  'Marcus.png',
  'Wewe.png'
];

// Názvy měsíců v češtině - vylepšené verze
export const MONTH_NAMES = [
  '❄️ Leden', '🌨️ Únor', '🌸 Březen', '🌷 Duben', '🌺 Květen', '🌻 Červen',
  '☀️ Červenec', '🌞 Srpen', '🍂 Září', '🍁 Říjen', '🍃 Listopad', '❄️ Prosinec'
];

// Pomocná funkce pro získání názvu měsíce
export function getMonthName(monthStr: string): string {
  const month = parseInt(monthStr.split('-')[1]) - 1;
  return MONTH_NAMES[month];
}
