import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Item", headerName: "Item", width: 130 },
  { field: "Catagory", headerName: "Catagory", width: 130 },
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
        onClick={() => handleDelete(params.row.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    ),
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.Item || ""} ${row.Catagory || ""}`,
  // },
];

const rows = [
  { id: 1, Item: "Snow", Catagory: "Jon", Quantity: 35 },
  { id: 2, Item: "Lannister", Catagory: "Cersei", Quantity: 42 },
  { id: 3, Item: "Lannister", Catagory: "Jaime", Quantity: 45 },
  { id: 4, Item: "Stark", Catagory: "Arya", Quantity: 16 },
  { id: 5, Item: "Targaryen", Catagory: "Daenerys", Quantity: null },
  { id: 6, Item: "Melisandre", Catagory: null, Quantity: 150 },
  { id: 7, Item: "Clifford", Catagory: "Ferrara", Quantity: 44 },
  { id: 8, Item: "Frances", Catagory: "Rossini", Quantity: 36 },
  { id: 9, Item: "Roxie", Catagory: "Harvey", Quantity: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ py: 2 }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
