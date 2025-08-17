const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cesta k SQLite databázi
const dbPath = path.join(__dirname, 'sandwichmaker.db');

// Vytvoření připojení k databázi
const db = new sqlite3.Database(dbPath);

console.log('🔍 Kontroluji data v SQLite databázi...');

// Kontrola všech hráčů
db.all("SELECT id, name, avatar_file FROM players ORDER BY id", (err, rows) => {
  if (err) {
    console.error('❌ Chyba při čtení dat:', err.message);
  } else {
    console.log('📋 Všichni hráči v databázi:');
    rows.forEach(row => {
      console.log(`  ID: ${row.id}, Jméno: ${row.name}, Avatar: ${row.avatar_file}`);
    });
  }
  
  // Zavření databáze
  db.close((err) => {
    if (err) {
      console.error('❌ Chyba při zavírání databáze:', err.message);
    } else {
      console.log('🔒 Databáze uzavřena');
    }
  });
});
