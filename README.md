# 🥪 SandwichMaker

Webová aplikace pro sledování, kdo tento měsíc chystá chlebíčky. Aplikace udělovat hráčům body (max 3 za měsíc) a vyhodnocovat měsíční vítěze.

## Funkce

- **Systém bodování** - max 3 body za měsíc na hráče
- **Měsíční vyhodnocení** - výherci jsou hráči s přesně 3 body
- **Roční statistika** - přehled výherců za celý rok
- **Automatický modal** - při prvním otevření v novém měsíci se zobrazí výsledky předchozího měsíce
- **Optimistic UI** - okamžité aktualizace s fallback při chybě

<img width="1395" height="780" alt="Snímka obrazovky 2025-08-15 o 0 17 51" src="https://github.com/user-attachments/assets/689b55b2-a3d4-466f-9d1e-c8562ad853b7" />


<img width="869" height="654" alt="Snímka obrazovky 2025-08-15 o 0 18 06" src="https://github.com/user-attachments/assets/49c7bbd2-2e3c-4cac-b86a-3d1d7654768e" />


<img width="1357" height="776" alt="Snímka obrazovky 2025-08-15 o 0 18 24" src="https://github.com/user-attachments/assets/7a1f899d-3bb1-4ec5-be27-7c14aa9f6378" />



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

Aplikace bude dostupná na https://sandwich-maker-iota.vercel.app/


## Pravidla hry

1. **1 bod = 1 chlebíček**
2. **Max 3 body za měsíc** na hráče
3. **Výherce měsíce** = každý hráč s přesně 3 body
4. **Časová zóna** = Europe/Prague
5. **Identifikátor měsíce** = YYYY-MM


<img width="450" height="450" alt="winner" src="https://github.com/user-attachments/assets/7c94ff17-95bc-4bfa-9807-50584755ebb7" />
