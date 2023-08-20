import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu({ action, setAction, setOpenGit }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e.target.value !== undefined) {
      setAction(e.target.value);
      setOpenGit(true);
    }
    console.log(e.target.value);

    setAnchorEl(null);
  };
  //   const handleChange = (e, value) => {
  //     setTimeout(() => {
  //     console.log("before : ", value);
  //       setAction(value);
  //       console.log("after : ", value);
  //     }, 1000);
  //   };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="info"
        variant="outlined"
      >
        Git
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onChange={handleChange}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem value="1" onClick={handleClose}>
          Get from Git
        </MenuItem>
        <MenuItem value="2" onClick={handleClose}>
          Update on Git
        </MenuItem>
        <MenuItem value="3" onClick={handleClose}>
          Api setting
        </MenuItem>
      </Menu>
    </>
  );
}
