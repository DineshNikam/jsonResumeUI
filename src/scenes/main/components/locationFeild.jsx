// LocationField.js
import React from "react";

import { Grid } from "@mui/material";
import Items from "./../../../components/item";
import { useFormikContext } from "formik";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

const locationInfo = [
  {
    name: "basics.location.address",
    label: "address",
    span: 2,
    required: false,
  },
  {
    name: "basics.location.postalCode",
    label: "postalCode",
    span: 2,
    required: false,
  },
  { name: "basics.location.city", label: "city", span: 2, required: false },
  {
    name: "basics.location.countryCode",
    label: "countryCode",
    span: 2,
    required: false,
  },
  { name: "basics.location.region", label: "region", span: 2, required: false },
];

const LocationField = () => {
  const { errors, touched } = useFormikContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid
      container
      spacing={0.5}
      mt={3}
      sx={{ backgroundColor: colors.primary[700], borderRadius: "20px" }}
    >
      <Items array={locationInfo} touched={touched} errors={errors} />
    </Grid>
  );
};

export default LocationField;
