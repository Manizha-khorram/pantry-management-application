"use client";

// components/AddItem.js
import React from "react";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddItem = ({ newItem, setNewItem, addItem, categories }) => {
  return (
    <Stack spacing={2} direction="row" sx={{ py: 2 }}>
      <TextField
        label="Food Item"
        name="item"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          label="Category"
          displayEmpty
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={addItem}>
        Add
      </Button>
    </Stack>
  );
};

export default AddItem;
