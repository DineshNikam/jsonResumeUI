import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./item";
import { createFeildsName } from "./createFeildsName";

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
  const { touched, errors } = useFormikContext();
  //   console.log("arrayName ", arrayName);
  const data = dataProps(arrayName);
  const info = data !== null ? createFeildsName(index, data, arrayName) : null;

  return (
    <Grid container spacing={2} mt={3}>
      {info && <Items array={info} touched={touched} errors={errors} />}
      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default ArrayWithNoNesting;
