"use client";

// components/AddItem.js
import React from "react";
import { TextField, Button, Stack } from "@mui/material";

const AddItem = ({ newItem, setNewItem, addItem }) => {
  return (
    <Stack spacing={2} direction="row" sx={{ py: 2 }}>
      <TextField
        label="Food Item"
        name="item"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <TextField
        label="Category"
        name="category"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      />
      <Button variant="contained" onClick={addItem}>
        Add Item
      </Button>
    </Stack>
  );
};

export default AddItem;
