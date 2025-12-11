# 📚 Sefaria Widget

Un'applicazione web moderna per esplorare il calendario ebraico e leggere testi della tradizione ebraica, powered by Sefaria.org API.

## ✨ Funzionalità

- **📅 Calendario Ebraico**: Visualizza la data ebraica corrente, parasha della settimana, haftarah, daf yomi e altri studi giornalieri
- **📖 Lettore di Testi**: Cerca e leggi qualsiasi testo dalla libreria Sefaria (Torah, Talmud, Mishnah, commentari)
- **🎨 Design Accogliente**: Interfaccia sobria e piacevole con tipografia ottimizzata
- **📱 Responsive**: Funziona perfettamente su desktop, tablet e mobile

## 🚀 Setup Locale

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione

1. **Clona il repository** (o scarica i file se già ce li hai)
   ```bash
   git clone https://github.com/TUO-USERNAME/widget.git
   cd widget
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

4. **Apri il browser** su `http://localhost:5173`

## 📦 Build per Produzione

Per creare la versione ottimizzata per il deploy:

```bash
npm run build
```

Questo crea la cartella `dist/` con tutti i file pronti per il deploy.

## 🌐 Deploy su GitHub Pages

### Metodo 1: Push Manuale (con GitHub Desktop)

1. **Build del progetto**
   ```bash
   npm run build
   ```

2. **Configura GitHub Pages**
   - Vai su GitHub.com → Il tuo repository `widget`
   - Settings → Pages
   - Source: seleziona `main` branch
   - Folder: seleziona `/ (root)` oppure `/docs` (se rinomini la cartella dist in docs)

3. **Commit e Push con GitHub Desktop**
   - Includi tutti i file (anche la cartella `dist/`)
   - Fai commit con un messaggio tipo "Deploy iniziale"
   - Push su GitHub
   
4. **Verifica il sito**
   - Il sito sarà disponibile su: `https://TUO-USERNAME.github.io/widget/`
   - Può richiedere 1-2 minuti per la prima pubblicazione

### Metodo 2: Deploy Automatico (opzionale)

Se preferisci automatizzare il deploy:

1. **Installa gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Aggiungi script in package.json**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy con un comando**
   ```bash
   npm run deploy
   ```

## 📝 Struttura del Progetto

```
widget/
├── src/
│   ├── components/
│   │   ├── Calendar.jsx      # Componente calendario ebraico
│   │   └── TextReader.jsx    # Componente lettore testi
│   ├── App.jsx               # Componente principale
│   ├── main.jsx              # Entry point React
│   └── index.css             # Stili globali
├── index.html                # HTML template
├── vite.config.js            # Configurazione Vite
├── package.json              # Dipendenze e scripts
└── README.md                 # Questo file
```

## 🔧 Personalizzazione

### Cambiare i colori
Modifica le variabili CSS in `src/index.css`:
```css
:root {
  --accent: #8b7355;        /* Colore principale */
  --accent-light: #b89976;  /* Colore chiaro */
  --bg-card: #ffffff;       /* Sfondo cards */
}
```

### Aggiungere nuove funzionalità
1. Crea un nuovo componente in `src/components/`
2. Importalo in `App.jsx`
3. Aggiungi un nuovo tab nella navigazione

## 🔮 Prossimi Passi (Bot AI)

Per aggiungere il bot AI in futuro:

1. Crea `src/components/ChatBot.jsx`
2. Integra le API di Anthropic/OpenAI
3. Aggiungi il componente alla navigazione
4. Le API keys vanno gestite tramite variabili d'ambiente (non includere nel codice!)

## 🛠️ Tecnologie Utilizzate

- **React 18** - Framework UI
- **Vite** - Build tool velocissimo
- **Sefaria API** - Database testi ebraici
- **Vanilla CSS** - Stili custom senza framework

## 📚 API Sefaria

Questa app usa le API pubbliche di Sefaria:
- Calendar API: `https://www.sefaria.org/api/calendars`
- Texts API: `https://www.sefaria.org/api/texts/{reference}`

Documentazione completa: [Sefaria API Docs](https://github.com/Sefaria/Sefaria-Project/wiki/API-Documentation)

## 🤝 Contribuire

Sentiti libero di fare fork, modificare e migliorare questo progetto!

## 📄 Licenza

Progetto personale - usa come preferisci!

---

Made with ❤️ using Sefaria.org
