import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";

const dataProps = [
  { label: "Title", name: "title", required: false },
  { label: "Date", name: "date", required: false },
  { label: "Awarder", name: "awarder", required: false },
  { label: "Summary", name: "summary", required: false },
];
// { label: "", name: "", required: false },
// { label: "", name: "", required: false },
// { label: "", name: "", required: false },
// { label: "" ,name: "", required: false },

const AwardFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const awardInfo = createFeildsName(index, dataProps, "awards");
  //   console.log(educationInfo);

  return (
    <Grid container spacing={2} mt={3}>
      <Items array={awardInfo} touched={touched} errors={errors} />

      <IconButton onClick={() => onRemove(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default AwardFeild;
