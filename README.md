# 🥪 SandwichMaker

Webová aplikace pro sledování, kdo tento měsíc chystá chlebíčky. Aplikace udělovat hráčům body (max 3 za měsíc) a vyhodnocovat měsíční vítěze.

## Funkce

- **Systém bodování** - max 3 body za měsíc na hráče
- **Měsíční vyhodnocení** - výherci jsou hráči s přesně 3 body
- **Roční statistika** - přehled výherců za celý rok
- **Automatický modal** - při prvním otevření v novém měsíci se zobrazí výsledky předchozího měsíce
- **Optimistic UI** - okamžité aktualizace s fallback při chybě

<img width="1431" height="785" alt="Snímka obrazovky 2025-08-14 o 23 45 50" src="https://github.com/user-attachments/assets/daf9e01d-d682-478e-94a2-a2015d3fc908" />

<img width="1303" height="572" alt="Snímka obrazovky 2025-08-14 o 23 39 25" src="https://github.com/user-attachments/assets/f620b9ce-663b-4f7e-85da-847aa98f8b5e" />

<img width="1297" height="502" alt="Snímka obrazovky 2025-08-14 o 23 39 12" src="https://github.com/user-attachments/assets/2e9ab0fd-7d24-4a30-91a6-ea6f30fab465" />


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

Aplikace bude dostupná na `(https://sandwich-maker-iota.vercel.app/)`


## Pravidla hry

1. **1 bod = 1 chlebíček**
2. **Max 3 body za měsíc** na hráče
3. **Výherce měsíce** = každý hráč s přesně 3 body
4. **Časová zóna** = Europe/Prague
5. **Identifikátor měsíce** = YYYY-MM


<img width="450" height="450" alt="winner" src="https://github.com/user-attachments/assets/7c94ff17-95bc-4bfa-9807-50584755ebb7" />
