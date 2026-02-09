import axios from 'axios';
import { ShoppingItem, CreateItemPayload, UpdateItemPayload } from '../types';

const API_BASE_URL = 'http://localhost:5000/items';

/**
 * API-Service - Axios-basierter HTTP-Client
 *
 * Bietet Methoden für alle CRUD-Operationen auf Einkaufsartikeln.
 * Alle Methoden sind Type-safe mit TypeScript Generics.
 */
export const api = {
  /**
   * Alle Einkaufsartikel vom Backend abrufen
   *
   * @returns {Promise<ShoppingItem[]>} Array von Einkaufsartikeln
   */
  getItems: async (): Promise<ShoppingItem[]> => {
    try {
      const response = await axios.get<ShoppingItem[]>(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen von Artikeln:', error);
      throw error;
    }
  },

  /**
   * Einen neuen Einkaufsartikel erstellen
   *
   * @param {CreateItemPayload} payload - Objekt mit Artikelname
   * @returns {Promise<ShoppingItem>} Der erstellte Artikel mit MongoDB-ID
   */
  createItem: async (payload: CreateItemPayload): Promise<ShoppingItem> => {
    try {
      const response = await axios.post<ShoppingItem>(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Erstellen eines Artikels:', error);
      throw error;
    }
  },

  /**
   * Einen Einkaufsartikel aktualisieren
   *
   * @param {string} id - MongoDB ObjectId des Artikels
   * @param {UpdateItemPayload} payload - Objekt mit Gekauft-Status
   * @returns {Promise<ShoppingItem>} Der aktualisierte Artikel
   */
  updateItem: async (id: string, payload: UpdateItemPayload): Promise<ShoppingItem> => {
    try {
      const response = await axios.put<ShoppingItem>(`${API_BASE_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Aktualisieren eines Artikels:', error);
      throw error;
    }
  },

  /**
   * Einen Einkaufsartikel löschen
   *
   * @param {string} id - MongoDB ObjectId des Artikels
   * @returns {Promise<void>}
   */
  deleteItem: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Fehler beim Löschen eines Artikels:', error);
      throw error;
    }
  },
};
