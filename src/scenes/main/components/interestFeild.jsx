import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../../components/item";
import { createFeildsName } from "../../../components/createFeildsName";
import DynamicArrayComp from "../../../components/dynamicArrayComp";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
const dataProps = [
  { label: "Interest", name: "name", required: false },
  { label: "Keywords", name: "keywords", required: false },
];

const InterestsFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const Info = createFeildsName(index, dataProps, "interests");
  //   console.log(educationInfo);
  const arrayName = `interests[${index}].keywords`;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items array={Info.slice(0, -1)} touched={touched} errors={errors} />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Keyword"}
        labelText={"Keyword"}
      />
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

export default InterestsFeild;
