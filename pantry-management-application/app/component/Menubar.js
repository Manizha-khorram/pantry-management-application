"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { Box, ListItemIcon, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

export default function MenuListComposition({
  open,
  onClose,
  buttonRef,
  onMenuItemClick,
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/logout");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <Box
      sx={{
        zIndex: 1200,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "200px",
        transform: open ? "translateX(0)" : "translateX(-300px)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Paper sx={{ width: "100%", height: "100%", bgcolor: "#1976d2" }}>
        <MenuItem onClick={() => onMenuItemClick("Pantry List")}>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" color="white">
            Pantry List
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => onMenuItemClick("Add Category")}>
          <ListItemIcon>
            <AddCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" color="white">
            Add Category
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" color="white">
            Logout
          </Typography>
        </MenuItem>
      </Paper>
    </Box>
  );
}
