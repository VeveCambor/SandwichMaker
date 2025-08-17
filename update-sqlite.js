const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cesta k SQLite databázi
const dbPath = path.join(__dirname, 'sandwichmaker.db');

// Vytvoření připojení k databázi
const db = new sqlite3.Database(dbPath);

console.log('🔄 Aktualizuji jméno z Wewe na Verča v SQLite databázi...');

// SQL pro aktualizaci
const updateQuery = `
  UPDATE players 
  SET name = 'Verča', avatar_file = 'Verča.png' 
  WHERE name = 'Wewe'
`;

db.run(updateQuery, function(err) {
  if (err) {
    console.error('❌ Chyba při aktualizaci:', err.message);
  } else {
    console.log(`✅ Aktualizováno ${this.changes} záznamů`);
    
    // Ověření změny
    db.get("SELECT name, avatar_file FROM players WHERE name = 'Verča'", (err, row) => {
      if (err) {
        console.error('❌ Chyba při ověření:', err.message);
      } else if (row) {
        console.log('✅ Ověření úspěšné:', row);
      } else {
        console.log('⚠️  Záznam s jménem Verča nebyl nalezen');
      }
      
      // Zavření databáze
      db.close((err) => {
        if (err) {
          console.error('❌ Chyba při zavírání databáze:', err.message);
        } else {
          console.log('🔒 Databáze uzavřena');
          console.log('🔄 Restartuj aplikaci pro zobrazení změn');
        }
      });
    });
  }
});
