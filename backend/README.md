# Shopping List - Backend

Express + TypeScript Backend für die Einkaufslisten-Anwendung mit MongoDB/Mongoose.

## Features

- RESTful API für Einkaufslisten-Management
- MongoDB mit Mongoose für Datenpersistenz
- Vollständige TypeScript-Unterstützung mit strenger Typprüfung
- CORS aktiviert für Frontend-Kommunikation
- Eingabevalidierung auf allen Endpunkten
- Fehlerbehandlung und Logging
- Umgebungskonfiguration mit dotenv

## Voraussetzungen

- Node.js 16+
- npm oder yarn
- MongoDB 4.4+ (lokale Installation oder MongoDB Atlas)

## Setup

### Installation

```bash
cd backend
npm install
```

### Umgebungskonfiguration

Erstelle eine `.env` Datei im Backend-Verzeichnis:

```bash
cp .env.example .env
```

Bearbeite `.env` mit deiner MongoDB-Verbindungszeichenfolge:

```env
MONGODB_URI=mongodb://localhost:27017/shopping-list
PORT=5000
NODE_ENV=development
```

**Hinweis:** Für MongoDB Atlas (Cloud), verwende:

```text
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shopping-list?retryWrites=true&w=majority
```

### Entwicklungsserver starten

```bash
npm run dev
```

Der Server läuft unter `http://localhost:5000`

### Für Produktion bauen

```bash
npm run build
npm start
```

## Projektstruktur

```text
src/
├── config/
│   └── database.ts          # MongoDB-Verbindungssetup
├── controllers/
│   └── itemController.ts    # API-Endpunkt-Handler
├── models/
│   └── ShoppingItem.ts      # Mongoose-Schema und Model
├── routes/
│   └── items.ts             # API-Route-Definitionen
└── server.ts                # Express-App-Setup und Start
```

## API-Endpunkte

### GET /items

Gibt alle Einkaufsartikel zurück

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Butter",
    "bought": false,
    "createdAt": "2024-02-09T10:00:00Z",
    "updatedAt": "2024-02-09T10:00:00Z"
  }
]
```

### POST /items

Erstellt einen neuen Einkaufsartikel

**Request Body:**

```json
{
  "name": "Milch"
}
```

**Response:** (201 Created)

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Milch",
  "bought": false,
  "createdAt": "2024-02-09T10:05:00Z",
  "updatedAt": "2024-02-09T10:05:00Z"
}
```

### PUT /items/:id

Aktualisiert einen Einkaufsartikel (Gekauft-Status)

**Request Body:**

```json
{
  "bought": true
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Butter",
  "bought": true,
  "createdAt": "2024-02-09T10:00:00Z",
  "updatedAt": "2024-02-09T10:05:00Z"
}
```

### DELETE /items/:id

Löscht einen Einkaufsartikel

**Response:** (200 OK)

```json
{
  "message": "Artikel erfolgreich gelöscht"
}
```

## Fehlerbehandlung

Alle Endpunkte geben angemessene HTTP-Statuscodes und Fehlermeldungen zurück:

- **400 Bad Request** - Ungültige Eingabe oder fehlende erforderliche Felder
- **404 Not Found** - Artikel existiert nicht
- **500 Internal Server Error** - Serverfehler

Beispiel-Fehler-Response:

```json
{
  "error": "Produktname kann nicht leer sein"
}
```

## Datenbankschema

```typescript
interface ShoppingItem {
  _id: ObjectId;
  name: string;           // Produktname (1-100 Zeichen, erforderlich)
  bought: boolean;        // Einkaufs-Status (Standard: false)
  createdAt: Date;        // Auto-erstellter Zeitstempel
  updatedAt: Date;        // Auto-aktualisierter Zeitstempel
}
```

## Abhängigkeiten

- **Express** - Web-Framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin-Ressourcenfreigabe
- **dotenv** - Umgebungsvariablen
- **TypeScript** - Typensicherheit
- **ts-node** - TypeScript-Ausführung für Entwicklung

## Hinweise

- Stelle sicher, dass MongoDB läuft, bevor du den Server startest
- Der Server erstellt automatisch die Datenbank und Sammlungen, wenn sie nicht existieren
- Alle Zeitstempel sind im ISO 8601-Format (UTC)
- CORS ist konfiguriert, um Anfragen von Frontend auf Port 5173 (Vite) und 3000 (create-react-app) zu akzeptieren
