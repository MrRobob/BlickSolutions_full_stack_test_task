import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  CircularProgress,
  Alert,
  Paper,
  CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingListForm } from './components/ShoppingListForm';
import { ShoppingListItem } from './components/ShoppingListItem';
import { api } from './services/api';
import { ShoppingItem } from './types';

/**
 * Dunkles Theme-Konfiguration für Material-UI
 */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    success: {
      main: '#66bb6a',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

/**
 * Haupt-App-Komponente
 * 
 * Verwaltet den Zustand der Einkaufslisten-App einschließlich:
 * - Laden und Anzeigen von Artikeln
 * - Hinzufügen neuer Artikel
 * - Umschalten des Kaufstatus
 * - Löschen von Artikeln
 */
function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingItem, setAddingItem] = useState(false);

  /**
   * Artikel vom Backend beim ersten Laden abrufen
   */
  useEffect(() => {
    loadItems();
  }, []);

  /**
   * Alle Einkaufsartikel von der API abrufen
   */
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getItems();
      setItems(data);
    } catch (err) {
      setError('Fehler beim Laden der Einkaufsliste. Stelle sicher, dass der Backend-Server läuft.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Einen neuen Artikel zur Einkaufsliste hinzufügen
   */
  const handleAddItem = async (name: string) => {
    try {
      setAddingItem(true);
      const newItem = await api.createItem({ name });
      setItems([...items, newItem]);
    } catch (err) {
      setError('Fehler beim Hinzufügen des Artikels');
      console.error(err);
      throw err;
    } finally {
      setAddingItem(false);
    }
  };

  /**
   * Den Gekauft-Status eines Artikels umschalten
   */
  const handleToggleBought = async (id: string, bought: boolean) => {
    try {
      const updatedItem = await api.updateItem(id, { bought });
      setItems(
        items.map((item) =>
          item._id === id ? updatedItem : item
        )
      );
    } catch (err) {
      setError('Fehler beim Aktualisieren des Artikels');
      console.error(err);
    }
  };

  /**
   * Einen Artikel aus der Einkaufsliste löschen
   */
  const handleDeleteItem = async (id: string) => {
    try {
      await api.deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      setError('Fehler beim Löschen des Artikels');
      console.error(err);
    }
  };

  // Anzahl der gekauften Artikel berechnen
  const boughtCount = items.filter((item) => item.bought).length;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#121212',
          py: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="sm">
          {/* Kopfzeile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 4,
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 40,
                color: '#90caf9',
              }}
            />
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                Shopping List
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                  {boughtCount} von {items.length} Artikeln gekauft
              </Typography>
            </Box>
          </Box>

          {/* Artikel-Formular */}
          <ShoppingListForm onSubmit={handleAddItem} isLoading={addingItem} />

          {/* Fehler-Alert */}
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {/* Lade-Status */}
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 300,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: '#1e1e1e',
              }}
            >
              {items.length === 0 ? (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.5)',
                    py: 4,
                  }}
                >
                  Noch keine Artikel. Füge einen hinzu um zu beginnen!
                </Typography>
              ) : (
                <List sx={{ width: '100%' }}>
                  {items.map((item) => (
                    <ShoppingListItem
                      key={item._id}
                      item={item}
                      onToggleBought={handleToggleBought}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
