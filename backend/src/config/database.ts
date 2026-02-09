import mongoose from 'mongoose';

/**
 * MongoDB-Verbindungsfunktion
 * 
 * Stellt eine Verbindung zu MongoDB her mit der Verbindungszeichenfolge
 * aus Umgebungsvariablen oder Standardverbindung lokal.
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-list';
    
    await mongoose.connect(mongodbUri, {
      retryWrites: true,
      writeConcern: { w: 'majority' },
    });

    console.log('MongoDB erfolgreich verbunden');
  } catch (error) {
    console.error('MongoDB-Verbindung fehlgeschlagen:', error);
    process.exit(1);
  }
};

/**
 * MongoDB-Trennungsfunktion
 * 
 * Trennt die MongoDB-Verbindung sauber.
 * Nützlich für die Bereinigung vor Prozessbeendigung.
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB getrennt');
  } catch (error) {
    console.error('MongoDB-Trennung fehlgeschlagen:', error);
  }
};
