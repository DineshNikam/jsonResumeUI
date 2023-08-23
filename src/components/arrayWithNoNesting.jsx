import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./item";
import { createFeildsName } from "./createFeildsName";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const dataProps = (dataOf) => {
  switch (dataOf) {
    case "awards":
      return [
        { label: "Title", name: "title", required: false },
        { label: "Date", name: "date", required: false },
        { label: "Awarder", name: "awarder", required: false },
        { label: "Summary", name: "summary", required: false },
      ];
    case "certificates":
      return [
        { label: "Name", name: "name", required: false },
        { label: "Date", name: "date", required: false },
        { label: "Issuer", name: "issuer", required: false },
        { label: "Url", name: "url", required: false },
      ];
    case "publications":
      return [
        { label: "Name", name: "name", required: false },
        { label: "Publisher", name: "publisher", required: false },
        { label: "ReleaseDate", name: "releaseDate", required: false },
        { label: "Url", name: "url", required: false },
        { label: "Summary", name: "summary", required: false },
      ];

    case "languages":
      return [
        { label: "Language", name: "language", required: false },
        { label: "Fluency", name: "fluency", required: false },
      ];
    case "references":
      return [
        { label: "Name", name: "name", required: false },
        { label: "Reference", name: "reference", required: false },
      ];

    default:
      console.log("name did Not match");
  }
  return null;
};

// { label: "", name: "", required: false },
// { label: "", name: "", required: false },
// { label: "", name: "", required: false },
// { label: "" ,name: "", required: false },

const ArrayWithNoNesting = ({ index, onRemove, arrayName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { touched, errors } = useFormikContext();
  //   console.log("arrayName ", arrayName);
  const data = dataProps(arrayName);
  const info = data !== null ? createFeildsName(index, data, arrayName) : null;

  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      {info && <Items array={info} touched={touched} errors={errors} />}
      <Grid
        item
        sx={{ justifyContent: "flex-end", width: "100%", display: "flex" }}
      >
        <IconButton onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ArrayWithNoNesting;
