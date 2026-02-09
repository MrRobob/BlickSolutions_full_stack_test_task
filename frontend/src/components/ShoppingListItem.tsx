import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShoppingItem } from '../types';

/**
 * Props für ShoppingListItem-Komponente
 */
interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleBought: (id: string, bought: boolean) => void;
  onDelete: (id: string) => void;
}

/**
 * ShoppingListItem-Komponente
 * 
 * Zeigt einen einzelnen Einkaufsartikel mit einem Kontrollkästchen zum Markieren als Gekauft
 * und einem Löschen-Button zum Entfernen des Artikels an.
 * Durchstreicheffekt wird angewendet, wenn Artikel als gekauft markiert ist.
 */
export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggleBought,
  onDelete,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(item._id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      sx={{
        mb: 1,
        backgroundColor: item.bought ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        borderRadius: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: item.bought ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <ListItemButton
        role={undefined}
        onClick={() => onToggleBought(item._id, !item.bought)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.bought}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          sx={{
            textDecoration: item.bought ? 'line-through' : 'none',
            opacity: item.bought ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
