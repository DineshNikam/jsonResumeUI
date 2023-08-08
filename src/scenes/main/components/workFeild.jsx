import React from "react";
import { useFormikContext } from "formik";
import { IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "./../../../components/item";
import { createFeildsName } from "./../../../components/createFeildsName";
import DynamicArrayComp from "./../../../components/dynamicArrayComp";

const dataProps = [
  { label: "Name", name: "name", required: false },
  { label: "Position", name: "position", required: false },
  { label: "Url", name: "url", required: false },
  { label: "Start Date", name: "startDate", required: false },
  { label: "End Date", name: "endDate", required: false },
  { label: "Summary", name: "summary", required: false },
  { label: "Highlights", name: "highlights", required: false },
];

const WorkFeild = ({ index, onRemove }) => {
  const { touched, errors } = useFormikContext();
  const workInfo = createFeildsName(index, dataProps.slice(0, -1), "work");
  //   console.log(`work[${index}].highlights`);
  const arrayName = `work[${index}].highlights`;

  //   console.log("highlights:  ", values.work[index].highlights);

  return (
    <Grid container spacing={2} mt={3}>
      <Items array={workInfo} touched={touched} errors={errors} />
      <DynamicArrayComp
        index={index}
        arrayName={arrayName}
        initWith={""}
        addBtnName={"Highlights"}
        labelText={"Highlight"}
      />

      {/* <FieldArray name={`work[${index}].highlights`}>
        {(arrayHelpers) => (
          <div style={{}}>
            {values.work[index]?.highlights.map((highlight, idx) => (
              <HighLights
                key={idx}
                index={idx}
                onRemove={() => arrayHelpers.remove(idx)}
                arrayName={`work[${index}].highlights`}
              />
            ))}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => arrayHelpers.push("")}
            >
              Add Highlight
            </Button>
          </div>
        )}
      </FieldArray> */}
      {/* <Grid item xs={12} sm={6} md={6} paddingX={2} paddingY={2}>
        <FieldArray name={arrayName}>
          {({ push, remove }) => (
            <div style={{}}>
              {array &&
                array.map((profile, index) => (
                  <HighLights
                    key={index}
                    index={index}
                    onRemove={() => remove(index)}
                    arrayName={arrayName}
                  />
                ))}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => push("")}
              >
                Add HighLight
              </Button>
            </div>
          )}
        </FieldArray>
      </Grid> */}

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        paddingX={2}
        paddingY={2}
        justifySelf={"end"}
      >
        <IconButton onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default WorkFeild;

// <FieldArray name={arrayName}>
//         {({ push, insert, remove }) => {
//           return (
//             <>
//               {values.work[index].highlights &&
//                 values.work[index].highlights.map((highlight, ind) => (
//                   <Grid
//                     item
//                     xs={12}
//                     sm={12}
//                     md={12}
//                     paddingX={2}
//                     paddingY={2}
//                     key={ind}
//                     display={"flex"}
//                     justifyContent={"space-around"}
//                     alignItems={"center"}
//                   >
//                     <Field
//                       as={CssTextField}
//                       error={Boolean(
//                         getIn(touched, `${arrayName}[${ind}]`) &&
//                           getIn(errors, `${arrayName}[${ind}]`)
//                       )}
//                       fullWidth
//                       helperText={
//                         getIn(touched, `${arrayName}[${ind}]`) &&
//                         getIn(errors, `${arrayName}[${ind}]`)
//                       }
//                       label={"Highlight " + (ind + 1)}
//                       name={`${arrayName}[${ind}]`}
//                       type="text"
//                       id={`${arrayName}[${ind}]`}
//                       variant="outlined"
//                     />
//                     <Button onClick={() => remove(ind)}>
//                       <Typography variant="h1" color={"secondary"}>
//                         -
//                       </Typography>
//                     </Button>
//                   </Grid>
//                 ))}
//               <Grid item xs={12} sm={12} md={12} paddingX={2} paddingY={2}>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => push("")}
//                 >
//                   Add Highligh
//                 </Button>
//               </Grid>
//             </>
//           );
//         }}
//       </FieldArray>
