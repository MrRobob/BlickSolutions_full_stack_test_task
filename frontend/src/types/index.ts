/**
 * Einkaufsartikel-Typ
 * 
 * Repräsentiert einen einzelnen Artikel in der Einkaufsliste.
 * Entspricht der MongoDB-Dokumentenstruktur.
 */
export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: string;
}

/**
 * Payload zum Erstellen eines neuen Einkaufsartikels
 * 
 * @property name - Produktname (erforderlich)
 */
export interface CreateItemPayload {
  name: string;
}

/**
 * Payload zum Aktualisieren eines Einkaufsartikels
 * 
 * @property bought - Kaufstatus (erforderlich)
 */
export interface UpdateItemPayload {
  bought: boolean;
}
