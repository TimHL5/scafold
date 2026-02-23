CREATE TABLE IF NOT EXISTS post_state (
  post_id    INTEGER PRIMARY KEY,
  status     TEXT NOT NULL DEFAULT 'not_started'
             CHECK (status IN ('not_started', 'scheduled', 'posted')),
  posted_at  TEXT,
  notes      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
