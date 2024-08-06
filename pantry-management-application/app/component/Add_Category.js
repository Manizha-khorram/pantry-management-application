"use client";

import React from "react";
import { TextField, Button, Stack } from "@mui/material";

const AddCategory = ({ newCategory, setNewCategory, addCategory }) => {
  return (
    <Stack spacing={2} direction="row" sx={{ py: 2 }}>
      <TextField
        label="Category"
        name="category"
        value={newCategory.category}
        onChange={(e) =>
          setNewCategory({ ...newCategory, category: e.target.value })
        }
      />
      <TextField
        label="Description"
        name="category"
        value={newCategory.description}
        onChange={(e) =>
          setNewCategory({ ...newCategory, description: e.target.value })
        }
      />
      <Button variant="contained" onClick={addCategory}>
        Add
      </Button>
    </Stack>
  );
};

export default AddCategory;
