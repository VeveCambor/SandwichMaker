# 🥪 SandwichMaker

Webová aplikace pro sledování, kdo tento měsíc chystá chlebíčky. Aplikace udělovat hráčům body (max 3 za měsíc) a vyhodnocovat měsíční vítěze.

## Funkce

- **Systém bodování** - max 3 body za měsíc na hráče
- **Měsíční vyhodnocení** - výherci jsou hráči s přesně 3 body
- **Roční statistika** - přehled výherců za celý rok
- **Automatický modal** - při prvním otevření v novém měsíci se zobrazí výsledky předchozího měsíce
- **Optimistic UI** - okamžité aktualizace s fallback při chybě

<img width="1436" height="812" alt="Snímka obrazovky 2025-08-19 o 10 01 34" src="https://github.com/user-attachments/assets/a3fd3eda-2265-4bf1-b37c-9da645ab5be8" />

<img width="737" height="696" alt="Snímka obrazovky 2025-08-19 o 10 01 55" src="https://github.com/user-attachments/assets/1d6041dd-975c-4180-b4c3-a8b6c259e306" />

<img width="1435" height="812" alt="Snímka obrazovky 2025-08-19 o 10 02 22" src="https://github.com/user-attachments/assets/86e3a4a5-e955-4211-85a3-9cfc9c1a28ca" />

<img width="784" height="682" alt="Snímka obrazovky 2025-08-19 o 10 02 34" src="https://github.com/user-attachments/assets/f90a9c26-7a0e-4b7f-9f4a-419624325016" />

<img width="1436" height="809" alt="Snímka obrazovky 2025-08-19 o 10 02 52" src="https://github.com/user-attachments/assets/4b7c3ee2-bb9e-452f-bee1-46e47f133fb2" />

<img width="1440" height="806" alt="Snímka obrazovky 2025-08-19 o 10 03 09" src="https://github.com/user-attachments/assets/26f929c7-880b-46ab-aac9-0d784b551f93" />

## Technologie

- **Next.js 14** s App Router
- **TypeScript**
- **PostgreSQL** databáze
- **Tailwind CSS** pro styling
- **Server Actions** pro databázové operace

## Spuštění

```bash
# Vývojový režim
npm run dev

# Produkční build
npm run build
npm start
```

Aplikace je dostupná na: https://sandwich-maker-iota.vercel.app/


## Pravidla hry

1. **1 bod = 1 chlebíček**
2. **Max 3 body za měsíc** na hráče
3. **Výherce měsíce** = každý hráč s přesně 3 body
4. **Časová zóna** = Europe/Prague
5. **Identifikátor měsíce** = YYYY-MM


<img width="450" height="450" alt="winner" src="https://github.com/user-attachments/assets/7c94ff17-95bc-4bfa-9807-50584755ebb7" />
