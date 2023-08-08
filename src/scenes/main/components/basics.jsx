import React from "react";
import { Grid } from "@mui/material";
import Items from "../../../components/item";
import { useFormikContext } from "formik";

const basicInfo = [
  { name: "basics.name", label: "Name", span: 2, required: true },
  { name: "basics.email", label: "Email", span: 2, required: true },
  { name: "basics.label", label: "Label", span: 2, required: true },
  { name: "basics.image", label: "Image", span: 2, required: false },
  { name: "basics.url", label: "URL", span: 2, required: false },
  { name: "basics.summary", label: "Summary", span: 2, required: false },
  { name: "basics.phone", label: "Phone", span: 2, required: false },
];

const BasicInfoForm = () => {
  // console.log(values, errors, touched);
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const { errors, touched } = useFormikContext();
  return (
    <Grid container spacing={2} mt={3}>
      <Items array={basicInfo} touched={touched} errors={errors} />
    </Grid>
  );
};

export default BasicInfoForm;
