# Shopping List - Full Stack Anwendung

Eine vollständige Full-Stack-Shopping-List-Anwendung, gebaut mit React + TypeScript (Frontend) und Express + TypeScript (Backend) mit MongoDB für persistente Speicherung.

## Features

- Produkte zur Einkaufsliste hinzufügen
- Produkte als gekauft markieren (mit Durchstreicheffekt)
- Produkte löschen
- Echtzeit-Synchronisation zwischen Frontend und Backend
- Type-safe mit TypeScript über den gesamten Stack
- RESTful API mit korrekter Fehlerbehandlung und Validierung
- MongoDB/Mongoose für permanente Datenspeicherung

## Tech Stack

### Frontend

- React 18 - UI-Bibliothek
- TypeScript - Typensicherheit
- Material-UI (MUI) - Komponenten-Bibliothek
- Axios - HTTP-Client
- Vite - Build-Tool

### Backend

- Express.js - Web-Framework
- TypeScript - Typensicherheit
- MongoDB - NoSQL-Datenbank
- Mongoose - ODM für MongoDB
- CORS - Cross-Origin-Ressourcenfreigabe
- dotenv - Umgebungskonfiguration

## Quick Start

### Voraussetzungen

- Node.js 16+
- npm oder yarn
- MongoDB 4.4+ (lokal oder Atlas)

### Installation & Setup

#### 1. Abhängigkeiten installieren

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd backend
npm install
```

#### 2. Backend konfigurieren

Erstelle eine `.env` Datei im Backend-Verzeichnis:

```bash
cd backend
cp .env.example .env
```

Bearbeite `.env` mit deiner MongoDB-Verbindungszeichenfolge:

```env
MONGODB_URI=mongodb://localhost:27017/shopping-list
PORT=5000
NODE_ENV=development
```

**Für MongoDB Atlas (Cloud):**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shopping-list?retryWrites=true&w=majority
```

#### 3. MongoDB starten

**Lokale MongoDB:**

```bash
mongod
```

Oder nutze **MongoDB Atlas** (Cloud):

- Account erstellen unter <https://www.mongodb.com/cloud/atlas>
- Cluster erstellen
- Verbindungszeichenfolge abrufen
- IP-Adresse zur Whitelist hinzufügen

#### 4. Backend-Server starten

```bash
cd backend
npm run dev
```

Server läuft unter `http://localhost:5000`

#### 5. Frontend-Entwicklungsserver starten

```bash
cd frontend
npm run dev
```

Frontend läuft unter `http://localhost:5173`

#### 6. Im Browser öffnen

Navigiere zu `http://localhost:5173` um die Anwendung zu nutzen!

## Projektstruktur

```text
.
├── frontend/                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/      # React-Komponenten
│   │   │   ├── ShoppingListForm.tsx
│   │   │   └── ShoppingListItem.tsx
│   │   ├── services/        # API-Client
│   │   │   └── api.ts
│   │   ├── types/           # TypeScript-Interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx          # Haupt-App-Komponente
│   │   ├── main.tsx         # Einstiegspunkt
│   │   └── index.css        # Styling
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── backend/                  # Express + TypeScript Backend
│   ├── src/
│   │   ├── config/          # Konfiguration
│   │   │   └── database.ts
│   │   ├── controllers/     # Request-Handler
│   │   │   └── itemController.ts
│   │   ├── models/          # Mongoose-Schemas
│   │   │   └── ShoppingItem.ts
│   │   ├── routes/          # API-Routes
│   │   │   └── items.ts
│   │   └── server.ts        # Express-App
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── LICENSE
└── README.md
```

## API-Endpunkte

GET `/items` - Gibt alle Einkaufsartikel zurück

POST `/items` - Erstellt einen neuen Einkaufsartikel

- Body: `{ "name": string }`

PUT `/items/:id` - Aktualisiert den Gekauft-Status

- Body: `{ "bought": boolean }`

DELETE `/items/:id` - Löscht einen Artikel

## Datenbankschema

```typescript
interface ShoppingItem {
  _id: ObjectId;
  name: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```
