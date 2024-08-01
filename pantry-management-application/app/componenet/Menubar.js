"use client";
import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box, ListItemIcon, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function MenuListComposition({
  open,
  onClose,
  buttonRef,
  onMenuItemClick,
}) {
  const handleClickAway = (event) => {
    if (
      open &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      onClose(); // Only close if the menu is open and click is not on the button
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          // position: "fixed", // Keep the sidebar in a fixed position
          // top: 0,
          // left: 0,
          zIndex: 1200, // Ensure it is above other content
          height: "100vh", // Ensure it takes the full height of its parent
          display: "flex",
          flexDirection: "column", // Align items vertically

          width: "200px", // Adjust width as needed
          transform: open ? "translateX(0)" : "translateX(-300px)", // Adjust width here as well
          transition: "transform 0.3s ease-in-out", // Smooth slide-in effect
        }}
      >
        <Paper sx={{ width: "100%", height: "100%", bgcolor: "#1976d2" }}>
          <MenuItem onClick={() => onMenuItemClick("Pantry List")}>
            <ListItemIcon>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Pantry List</Typography>
          </MenuItem>
          <MenuItem onClick={() => onMenuItemClick("Add Category")}>
            <ListItemIcon>
              <AddCircleIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Add Category</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
          </MenuItem>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
}
