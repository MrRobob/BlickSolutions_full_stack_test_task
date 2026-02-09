import { Schema, model, Document } from 'mongoose';

/**
 * Einkaufsartikel-Dokument-Schnittstelle
 *
 * Erweitert Mongoose Document und definiert das TypeScript Interface
 * für Einkaufsartikel in der Datenbank.
 */
export interface IShoppingItem extends Document {
  name: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Einkaufsartikel-Schema
 *
 * Definiert die Struktur und Validierungsregeln für Einkaufsartikel
 */
const ShoppingItemSchema = new Schema<IShoppingItem>(
  {
    name: {
      type: String,
      required: [true, 'Bitte geben Sie einen Produktnamen an'],
      trim: true,
      minlength: [1, 'Produktname kann nicht leer sein'],
      maxlength: [100, 'Produktname darf 100 Zeichen nicht überschreiten'],
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatisch createdAt und updatedAt hinzufügen
  }
);

/**
 * Einkaufsartikel-Modell
 *
 * MongoDB-Modell zur Verwaltung der Einkaufsartikel-Sammlung
 */
export const ShoppingItem = model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);
