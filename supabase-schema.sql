-- Vytvoření tabulek pro SandwichMaker aplikaci

-- Tabulka hráčů
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  avatar_file TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabulka měsíčních skóre
CREATE TABLE IF NOT EXISTS monthly_scores (
  id BIGSERIAL PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  month CHAR(7) NOT NULL,
  points INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (player_id, month)
);

-- Tabulka měsíčních metadat
CREATE TABLE IF NOT EXISTS monthly_meta (
  month CHAR(7) PRIMARY KEY,
  winner_shown_at TIMESTAMPTZ
);

-- Vložení výchozích hráčů
INSERT INTO players (name, avatar_file) VALUES
  ('Petr', 'BigC.png'),
  ('Marcus', 'Marcus.png'),
  ('Vratis', 'Vratis.png'),
  ('Verča', 'Verča.png')
ON CONFLICT (name) DO NOTHING;

-- Vytvoření záznamů pro aktuální měsíc
INSERT INTO monthly_scores (player_id, month, points)
SELECT 
  p.id, 
  to_char(now(), 'YYYY-MM') as current_month,
  0 as points
FROM players p
ON CONFLICT (player_id, month) DO NOTHING;
