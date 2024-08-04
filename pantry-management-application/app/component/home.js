"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../../Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";

import PrimarySearchAppBar from "./Appbar";
import MenuListComposition from "./Menubar";
import DataTable from "./Pantry_list";
import AddItem from "./Add_Item";
import AddCategory from "./Add_Category";
import { Container, Box, Button, Dialog, DialogContent } from "@mui/material";
import CategoryDataTable from "./Category_list";
import CameraComponent from "./Camera_Component";



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "" });
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [menuOpen, setMenuOpen] = useState(true);
  const [visibleSection, setVisibleSection] = useState("Pantry List");
  const [errorMessage, setErrorMessage] = useState("");
  const buttonRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  // const router = useRouter(); // For routing

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCapture = (photo) => {
    setCapturedPhoto(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

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
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(firestore, "Category List");
      const querySnapshot = await getDocs(categoriesCollection);
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Category: doc.id,
        Description: doc.data().description,
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error("Error fetching categories: ", error);
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
          await setDoc(docRef, { ...data, quantity: data.quantity - 1 });
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
        await setDoc(docRef, { ...data, quantity: (data.quantity || 0) + 1 });
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
      const normalizedNewCategory = newCategory.name.toLowerCase();
      const categoriesCollection = collection(firestore, "Category List");
      const querySnapshot = await getDocs(categoriesCollection);
      const categoryExists = querySnapshot.docs.some((doc) => {
        const existingCategoryName = doc.id.toLowerCase();
        return existingCategoryName === normalizedNewCategory;
      });

      if (categoryExists) {
        setErrorMessage("This category already exists");
      } else {
        await setDoc(doc(firestore, "Category List", newCategory.name), {
          description: newCategory.description,
        });
        setErrorMessage(""); // Clear error message on successful addition
        fetchCategories();
        setNewCategory({ name: "", description: "" });
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
      console.error("Error deleting category: ", error);
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
                    onClose={handleCloseCamera}
                  />
                </DialogContent>
              </Dialog>

              {/* {capturedPhoto && (
                  <ImageProcessor
                    photo={capturedPhoto}
                    onProcessingComplete={fetchItems}
                  />
                )} */}

              <DataTable rows={items} deleteItem={deleteItem} />
            </>
          )}
          {visibleSection === "Add Category" && (
            <>
              <AddCategory
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                addCategory={addCategory}
                errorMessage={errorMessage}
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
