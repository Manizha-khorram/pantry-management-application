"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = (deleteItem) => [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "Item", headerName: "Item", width: 130 },
  { field: "Category", headerName: "Category", width: 130 },
  {
    field: "Quantity",
    headerName: "Quantity",
    type: "number",
    width: 90,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 125,
    renderCell: (params) => (
      <IconButton
        aria-label="delete"
        size="small"
        background-color="red"
        onClick={() => deleteItem(params.row.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    ),
  },
];

export default function DataTable({ rows = [], deleteItem }) {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ py: 2 }}
          rows={rows || []}
          columns={columns(deleteItem)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}
