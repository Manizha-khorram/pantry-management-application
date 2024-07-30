"use client";

// pages.js
// import { useEffect, useState } from "react";
// import { db } from "../Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

import MenuAppBar from "./componenet/Appbar";
import MenuListComposition from "./componenet/Menubar";
import DataTable from "./componenet/Pantry_list";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
// import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  // const [items, setItems] = useState([]);
  // const [newItem, setNewItem] = useState({ name: "", quantity: "" });

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "pantry"), (snapshot) => {
  //     const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setItems(items);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const addItem = async () => {
    // if (newItem.name && newItem.quantity) {
    //   await addDoc(collection(db, "pantry"), newItem);
    //   setNewItem({ name: "", quantity: "" });
    // };
  };

  const deleteItem = async (id) => {
    // await deleteDoc(doc(db, "pantry", id));
  };

  return (
    <Container>
      <MenuAppBar />
      <Box width="100%" sx={{ py: 4 }}></Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{}}
        width="80%"
        height="100"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <box>
          <MenuListComposition />
        </box>
        <box display="flex" flex-direction="row">
          {" "}
          <Stack spacing={2} direction="row" sx={{ py: 2 }}>
            <TextField
              label="Food Item"
              value={""}
              // value={newItem.name}
              // onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <TextField
              label="Catagory"
              value={""}
              // value={newItem.quantity}
              // onChange={(e) =>
              //   setNewItem({ ...newItem, quantity: e.target.value })
              // }
            />
            {/* onClick={addItem} */}
            <Button variant="contained">Add Item</Button>
          </Stack>
          <DataTable />
        </box>
      </Box>
      <List>
        {/* {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))} */}
      </List>
    </Container>
  );
}
