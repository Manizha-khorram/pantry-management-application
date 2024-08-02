"use client";

// pages/index.js or pages/page.js
import { useEffect, useState, useRef } from "react";
import { firestore } from "../Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";

import PrimarySearchAppBar from "./componenet/Appbar";
import MenuListComposition from "./componenet/Menubar";
import DataTable from "./componenet/Pantry_list";
import AddItem from "./componenet/Add_Item";
import AddCategory from "./componenet/Add_Category";
import { Container, Box, Button, Dialog, DialogContent } from "@mui/material";
import CategoryDataTable from "./componenet/Category_list";
import CameraComponent from "./componenet/Camera_Component";

export default function Home() {
  // State for items
  const [items, setItems] = useState([]);
  // State for categories
  const [categories, setCategories] = useState([]);
  // State for new item
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
  });
  // State for new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [menuOpen, setMenuOpen] = useState(true);
  const [visibleSection, setVisibleSection] = useState("Pantry List");
  const [errorMessage, setErrorMessage] = useState("");
  const buttonRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  // Toggle menu open/close
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCapture = (photo) => {
    console.log("Captured photo:", photo);
    // You can process the photo or store it as needed
    // setShowCamera(false);
  };
  // Fetch all items
  const fetchItems = async () => {
    try {
      const itemsCollection = collection(firestore, "Pantry List");
      const querySnapshot = await getDocs(itemsCollection);
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Item: doc.id,
        Category: doc.data().category,
        Quantity: doc.data().quantity,
      }));
      console.log("fetchItem", itemsList);
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(firestore, "Category List");
      const queryCategSnapshot = await getDocs(categoriesCollection);
      const categoriesList = queryCategSnapshot.docs.map((doc) => ({
        id: doc.id,
        Category: doc.id,
        Description: doc.data().description,
      }));
      console.log("categoryList", categoriesList);
      setCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };
  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const deleteItem = async (id) => {
    try {
      const docRef = doc(firestore, "Pantry List", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.quantity > 1) {
          await setDoc(docRef, {
            ...data,
            quantity: data.quantity - 1,
          });
        } else {
          await deleteDoc(docRef);
        }
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const addItem = async () => {
    try {
      const docRef = doc(firestore, "Pantry List", newItem.name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        await setDoc(docRef, {
          ...data,
          quantity: (data.quantity || 0) + 1,
        });
      } else {
        await setDoc(docRef, {
          category: newItem.category,
          quantity: 1,
        });
      }
      fetchItems();
      setNewItem({ name: "", category: "" });
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const addCategory = async () => {
    try {
      console.log("added");
      // Normalize user input
      const normalizedNewCategory = newCategory.category.toLowerCase();
      console.log("added", normalizedNewCategory);
      // Fetch all existing categories
      const categoriesCollection = collection(firestore, "Category List");
      const querySnapshot = await getDocs(categoriesCollection);
      // Check if the normalized category already exists
      const categoryExists = querySnapshot.docs.some((doc) => {
        const existingCategoryName = doc.id.toLowerCase();
        return existingCategoryName === normalizedNewCategory;
      });

      if (categoryExists) {
        setErrorMessage("This category already exists");
      } else {
        // Add new category to the database
        await setDoc(doc(firestore, "Category List", newCategory.category), {
          description: newCategory.description,
        });
        setErrorMessage(""); // Clear error message on successful addition
        fetchCategories();
        setNewCategory({ category: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const docRef = doc(firestore, "Category List", id);
      await deleteDoc(docRef);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting  category: ", error);
    }
  };

  return (
    <Container>
      <PrimarySearchAppBar
        onDrawerOpen={handleMenuToggle}
        buttonRef={buttonRef}
      />
      <Box width="100%" sx={{ py: 4 }}></Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "80%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <MenuListComposition
            open={menuOpen}
            onClose={handleMenuClose}
            buttonRef={buttonRef}
            onMenuItemClick={(section) => setVisibleSection(section)}
          />
        </Box>
        <Box display="flex" sx={{ flexDirection: "column", width: "70%" }}>
          {visibleSection === "Pantry List" && (
            <>
              <Box display="flex" alignItems="center">
                <AddItem
                  newItem={newItem}
                  setNewItem={setNewItem}
                  addItem={addItem}
                  categories={categories}
                />
                <Button
                  onClick={() => setShowCamera(true)}
                  sx={{ ml: 2, py: 2, px: 1 }}
                  variant="contained"
                >
                  Open Camera
                </Button>
              </Box>
              <Dialog
                open={showCamera}
                onClose={() => setShowCamera(false)}
                fullWidth
                maxWidth="sm"
              >
                <DialogContent>
                  <CameraComponent
                    onCapture={handleCapture}
                    onClose={() => setShowCamera(false)}
                  />
                </DialogContent>
              </Dialog>
              <DataTable rows={items} deleteItem={deleteItem} />
            </>
          )}
          {visibleSection === "Add Category" && (
            <>
              <AddCategory
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                addCategory={addCategory}
              />
              <CategoryDataTable
                rows={categories}
                deleteCategory={deleteCategory}
              />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
