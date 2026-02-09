import { Request, Response } from 'express';
import { ShoppingItem, IShoppingItem } from '../models/ShoppingItem';

/**
 * GET /items
 * Alle Einkaufsartikel sortiert nach Erstellungsdatum abrufen (neueste zuerst)
 */
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Fehler beim Abrufen von Artikeln:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen von Artikeln' });
  }
};

/**
 * POST /items
 * Einen neuen Einkaufsartikel erstellen
 * 
 * Request Body:
 * {
 *   name: string (erforderlich)
 * }
 */
export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    // Input validation
    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'Name ist erforderlich und muss ein String sein' });
      return;
    }

    if (name.trim().length === 0) {
      res.status(400).json({ error: 'Produktname kann nicht leer sein' });
      return;
    }

    if (name.length > 100) {
      res.status(400).json({ error: 'Produktname darf 100 Zeichen nicht überschreiten' });
      return;
    }

    // Artikel erstellen und speichern
    const newItem = new ShoppingItem({
      name: name.trim(),
      bought: false,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Fehler beim Erstellen eines Artikels:', error);
    res.status(500).json({ error: 'Fehler beim Erstellen eines Artikels' });
  }
};

/**
 * PUT /items/:id
 * Einen Einkaufsartikel aktualisieren (Gekauft-Status umschalten)
 * 
 * Request Body:
 * {
 *   bought: boolean (erforderlich)
 * }
 */
export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    // Input validation
    if (typeof bought !== 'boolean') {
      res.status(400).json({ error: 'Gekauft muss ein Boolean sein' });
      return;
    }

    // Artikel suchen und aktualisieren
    const item = await ShoppingItem.findByIdAndUpdate(
      id,
      { bought },
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Fehler beim Aktualisieren eines Artikels:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren eines Artikels' });
  }
};

/**
 * DELETE /items/:id
 * Einen Einkaufsartikel nach ID löschen
 */
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Artikel suchen und löschen
    const item = await ShoppingItem.findByIdAndDelete(id);

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({ message: 'Artikel erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen eines Artikels:', error);
    res.status(500).json({ error: 'Fehler beim Löschen eines Artikels' });
  }
};
