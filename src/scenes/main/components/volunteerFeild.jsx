import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./../../../components/item";
import { createFeildsName } from "./../../../components/createFeildsName";
import DynamicArrayComp from "./../../../components/dynamicArrayComp";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

const dataProps = [
  { label: "name", name: "name", required: false },
  { label: "level", name: "level", required: false },
  { label: "keywords", name: "keywords", required: false },
];

const SkillsFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const skillsInfo = createFeildsName(index, dataProps, "skills");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const arrayName = `skills[${index}].keywords`;
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items
        array={skillsInfo.slice(0, -1)}
        touched={touched}
        errors={errors}
      />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Keyword"}
        labelText={"Keywords"}
      />{" "}
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

export default SkillsFeild;
