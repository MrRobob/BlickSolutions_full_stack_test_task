# Shopping List - Frontend

React + TypeScript Frontend für die Einkaufslisten-Anwendung, mit Material-UI für Styling.

## Features

- Artikel zur Einkaufsliste hinzufügen
- Artikel als gekauft markieren/abhaken (mit Durchstreicheffekt)
- Artikel löschen
- Echtzeit-Synchronisation mit dem Backend
- Dunkles Theme mit Material-UI
- Responsive Design
- Type-safe mit TypeScript

## Setup

### Voraussetzungen

- Node.js 16+
- npm oder yarn

### Installation

```bash
cd frontend
npm install
```

### Entwicklungsserver starten

```bash
npm run dev
```

Die App wird unter `http://localhost:5173` gestartet und leitet API-Aufrufe automatisch an das Backend unter `http://localhost:5000` weiter.

### Für Produktion bauen

```bash
npm run build
npm run preview
```

## Projektstruktur

```text
src/
├── components/          # React-Komponenten
│   ├── ShoppingListForm.tsx    # Formular zum Hinzufügen von Artikeln
│   └── ShoppingListItem.tsx    # Einzelne Artikel-Komponente
├── services/            # API-Service
│   └── api.ts          # Axios API-Client
├── types/              # TypeScript-Interfaces
│   └── index.ts        # ShoppingItem Type-Definitionen
├── App.tsx             # Haupt-App-Komponente
├── main.tsx            # Einstiegspunkt
└── index.css           # Globale Styles
```

## Abhängigkeiten

- **React 18**: UI-Bibliothek
- **React DOM 18**: React DOM-Rendering
- **TypeScript**: Typensicherheit
- **Vite**: Build-Tool und Entwicklungsserver
- **Material-UI (MUI)**: Komponenten-Bibliothek und Theming
- **Axios**: HTTP-Client für API-Aufrufe
- **Emotion**: CSS-in-JS Styling (erforderlich von MUI)

## API-Integration

Das Frontend kommuniziert mit dem Backend über folgende Endpunkte:

- `GET /items` - Alle Artikel abrufen
- `POST /items` - Neuen Artikel erstellen
- `PUT /items/:id` - Artikel aktualisieren (Status)
- `DELETE /items/:id` - Artikel löschen

Die API-Basis-URL ist in `src/services/api.ts` konfiguriert (Standard: `http://localhost:5000/items`)

## Hinweise

- Stelle sicher, dass der Backend-Server unter `http://localhost:5000` läuft, bevor du das Frontend startest
- Der Entwicklungsserver beinhaltet eine Proxy-Konfiguration, um `/api`-Anfragen an das Backend weiterzuleiten
