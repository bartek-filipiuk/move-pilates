// Uruchamiane w CMD kontenera PRZED `payload migrate`.
// Payload dopisuje do payload_migrations wiersz "dev" (batch = -1) gdy schemat
// był kiedyś pchnięty trybem dev. `payload migrate` widząc ten wiersz odpala
// interaktywny prompt ("data loss will occur... y/N") i w kontenerze bez TTY
// wisi albo robi process.exit(0) - dokładnie to wieszało deploye od marca.
// Nasze migracje są nieniszczące (baseline guard + ADD COLUMN IF NOT EXISTS),
// więc wiersz można bezpiecznie usunąć; brak tabeli/wiersza to nie błąd.
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI })
try {
  const res = await pool.query('DELETE FROM payload_migrations WHERE batch = -1')
  console.log(`[clear-dev-migrations] removed ${res.rowCount} dev row(s)`)
} catch (err) {
  console.log(`[clear-dev-migrations] skipped: ${err.message}`)
} finally {
  await pool.end()
}
