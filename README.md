# 🥪 SandwichMaker

Webová aplikace pro sledování, kdo tento měsíc chystá chlebíčky. Aplikace umožňuje přidávat hráče, udělovat body (max 3 za měsíc) a vyhodnocovat měsíční vítěze.

## Funkce

- **Přidávání hráčů** s avatary z lokálních PNG souborů
- **Systém bodování** - max 3 body za měsíc na hráče
- **Měsíční vyhodnocení** - výherci jsou hráči s přesně 3 body
- **Roční statistika** - přehled výherců za celý rok
- **Automatický modal** - při prvním otevření v novém měsíci se zobrazí výsledky předchozího měsíce
- **Optimistic UI** - okamžité aktualizace s fallback při chybě

## Technologie

- **Next.js 14** s App Router
- **TypeScript**
- **PostgreSQL** databáze
- **Tailwind CSS** pro styling
- **Server Actions** pro databázové operace

## Instalace

1. **Nainstalujte závislosti:**
   ```bash
   npm install
   ```

2. **Nastavte databázi:**
   - Vytvořte PostgreSQL databázi
   - Spusťte SQL skript `database.sql` pro vytvoření tabulek

3. **Nastavte proměnné prostředí:**
   Vytvořte soubor `.env.local`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/sandwichmaker
   ```

4. **Přidejte obrázky:**
   - Umístěte avatary do `/public/avatars/` (anna.png, petr.png, ondrej.png, marie.png)
   - Přidejte `/public/sandwich.png` (velký obrázek pro modal)
   - Přidejte `/public/sandwich-small.png` (malá ikona pro karty)

## Spuštění

```bash
# Vývojový režim
npm run dev

# Produkční build
npm run build
npm start
```

Aplikace bude dostupná na `http://localhost:3000`

## Struktura aplikace

### Databáze
- `players` - hráči s avatary
- `monthly_scores` - měsíční skóre (max 3 body)
- `monthly_meta` - metadata o zobrazených výsledcích

### Komponenty
- `PlayerCard` - karta hráče s avatarem a tlačítkem +1
- `AddPlayerForm` - formulář pro přidání nového hráče
- `WinnerModal` - modal s výsledky měsíce
- `MonthSelector` - výběr měsíce

### Stránky
- `/` - hlavní dashboard
- `/stats/[year]` - roční statistika

## Pravidla hry

1. **1 bod = 1 chlebíček**
2. **Max 3 body za měsíc** na hráče
3. **Výherce měsíce** = každý hráč s přesně 3 body
4. **Časová zóna** = Europe/Prague
5. **Identifikátor měsíce** = YYYY-MM

## UX funkce

- **Optimistic UI** pro +1 s debounce
- **Automatické zobrazení** výsledků předchozího měsíce
- **Responsive design** pro mobilní zařízení
- **Accessibility** - focus trap, Esc pro zavření modalu
- **Loading states** a error handling