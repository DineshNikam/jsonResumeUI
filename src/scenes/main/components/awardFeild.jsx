import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   console.log(educationInfo);

  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items array={awardInfo} touched={touched} errors={errors} />
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

export default AwardFeild;
