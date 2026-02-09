import { Router } from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController';

const router = Router();

/**
 * Einkaufsartikel-Routen
 *
 * Definiert alle Endpunkte für CRUD-Operationen auf Einkaufsartikeln
 */

/**
 * GET /
 * Alle Einkaufsartikel abrufen
 */
router.get('/', getItems);

/**
 * POST /
 * Einen neuen Einkaufsartikel erstellen
 */
router.post('/', createItem);

/**
 * PUT /:id
 * Einen existierenden Einkaufsartikel aktualisieren
 */
router.put('/:id', updateItem);

/**
 * DELETE /:id
 * Einen Einkaufsartikel löschen
 */
router.delete('/:id', deleteItem);

export default router;
