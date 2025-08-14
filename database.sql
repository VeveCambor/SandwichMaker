-- Vytvoření tabulek pro SandwichMaker aplikaci

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  avatar_file TEXT NOT NULL          -- např. 'anna.png' (uvnitř /public/avatars/)
);

CREATE TABLE monthly_scores (
  id BIGSERIAL PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  month CHAR(7) NOT NULL,            -- 'YYYY-MM'
  points INT NOT NULL DEFAULT 0,     -- 0..3
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (player_id, month)
);

CREATE TABLE monthly_meta (
  month CHAR(7) PRIMARY KEY,
  winner_shown_at TIMESTAMPTZ
);

-- Indexy pro lepší výkon
CREATE INDEX idx_monthly_scores_month ON monthly_scores(month);
CREATE INDEX idx_monthly_scores_player_month ON monthly_scores(player_id, month);
CREATE INDEX idx_monthly_scores_points ON monthly_scores(points);

-- Komentáře
COMMENT ON TABLE players IS 'Tabulka hráčů s jejich avatary';
COMMENT ON TABLE monthly_scores IS 'Měsíční skóre hráčů (max 3 body za měsíc)';
COMMENT ON TABLE monthly_meta IS 'Metadata o měsících (kdy byly zobrazeny výsledky)';
