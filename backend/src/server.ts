import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import itemRoutes from './routes/items';

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Express Middleware-Konfiguration
 */

// JSON-Request-Bodies analysieren
app.use(express.json());

// CORS für Frontend-Anwendungen aktivieren
// Anfragen von Vite (5173), Create React App (3000) und localhost zulassen
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

/**
 * API Routes
 */

// Einkaufsartikel CRUD-Endpunkte
app.use('/items', itemRoutes);

/**
 * Gesundheitsprüfungs-Endpunkt
 * Wird verwendet, um zu überprüfen, ob der Server ausgeführt wird
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server läuft' });
});

/**
 * 404-Handler
 * Verarbeitet Anfragen an nicht definierten Routen
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route nicht gefunden' });
});

/**
 * Globaler Fehler-Handler
 * Fängt und protokolliert unerwartete Fehler
 */
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Server-Fehler:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
);

/**
 * Server-Start
 * 
 * 1. Mit MongoDB verbinden
 * 2. Express-Server auf konfiguriertem Port starten
 */
const startServer = async () => {
  try {
    // Mit MongoDB verbinden
    await connectDB();

    // Express-Server starten
    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
      console.log(`Shopping List API bereit`);
    });
  } catch (error) {
    console.error('Fehler beim Starten des Servers:', error);
    process.exit(1);
  }
};

startServer();
