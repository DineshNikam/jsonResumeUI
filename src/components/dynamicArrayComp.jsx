import { styled } from "@mui/material/styles";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Field, getIn, useFormikContext } from "formik";
import { FieldArray } from "formik";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});
const get = require("lodash/get");
const DynamicArrayComp = ({
  index,
  arrayName,
  initWith,
  addBtnName,
  labelText,
}) => {
  const { values, touched, errors } = useFormikContext();
  const array = get(values, arrayName, undefined);

  return (
    <FieldArray name={arrayName}>
      {({ push, remove }) => {
        return (
          <>
            {array &&
              array.map((highlight, ind) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  paddingX={2}
                  paddingY={2}
                  key={ind}
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <Field
                    as={CssTextField}
                    error={Boolean(
                      getIn(touched, `${arrayName}[${ind}]`) &&
                        getIn(errors, `${arrayName}[${ind}]`)
                    )}
                    fullWidth
                    helperText={
                      getIn(touched, `${arrayName}[${ind}]`) &&
                      getIn(errors, `${arrayName}[${ind}]`)
                    }
                    label={labelText + " " + (ind + 1)}
                    name={`${arrayName}[${ind}]`}
                    type="text"
                    id={`${arrayName}[${ind}]`}
                    variant="outlined"
                  />
                  <Button onClick={() => remove(ind)}>
                    <Typography variant="h1" color={"secondary"}>
                      -
                    </Typography>
                  </Button>
                </Grid>
              ))}
            <Grid item xs={12} sm={12} md={12} paddingX={2} paddingY={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => push(initWith)}
              >
                Add {addBtnName}
              </Button>
            </Grid>
          </>
        );
      }}
    </FieldArray>
  );
};

export default DynamicArrayComp;
