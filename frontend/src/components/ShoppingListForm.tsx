import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * Props für ShoppingListForm-Komponente
 */
interface ShoppingListFormProps {
  onSubmit: (name: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * ShoppingListForm-Komponente
 * 
 * Verarbeitet Benutzereingabe zum Hinzufügen neuer Einkaufsartikel.
 * Beinhaltet Validierung und Fehlerbehandlung.
 */
export const ShoppingListForm: React.FC<ShoppingListFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState('');

  /**
   * Formular-Submit verarbeiten
   * Validiert Eingabe und ruft onSubmit-Callback auf
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName.trim()) {
      setError('Bitte geben Sie einen Produktnamen ein');
      return;
    }

    try {
      setError('');
      await onSubmit(itemName.trim());
      setItemName('');
    } catch (err) {
      setError('Fehler beim Hinzufügen. Bitte versuchen Sie es erneut.');
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        mb: 3,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <TextField
        fullWidth
        placeholder="Produktname eingeben (z.B. Butter)"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        disabled={isLoading}
        error={!!error}
        helperText={error}
        size="small"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#2678cb',
            '& fieldset': {
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              borderColor: '#2E5C8A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2E5C8A',
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        startIcon={isLoading ? <CircularProgress size={20} /> : <AddIcon />}
        disabled={isLoading}
        sx={{
          minWidth: 120,
        }}
      >
      </Button>
    </Box>
  );
};
