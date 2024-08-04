import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = (deleteCategory) => [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "Category", headerName: "Category", width: 130 },
  { field: "Description", headerName: "Description", width: 130 },

  {
    field: "actions",
    headerName: "Actions",
    width: 125,
    renderCell: (params) => (
      <IconButton
        aria-label="delete"
        size="small"
        background-color="red"
        onClick={() => deleteCategory(params.row.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    ),
  },
];

export default function CategoryDataTable({ rows = [], deleteCategory }) {
  //rows = [], deleteItem
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ py: 2 }}
          rows={rows || []}
          columns={columns(deleteCategory)}
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
