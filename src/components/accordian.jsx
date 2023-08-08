import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordianCustom = ({
  summary,
  color,

  Comp,
  propses,
}) => {
  //   console.log(color);
  return (
    <Accordion
      sx={{
        "& .css-1tmu6hb-MuiButtonBase-root-MuiAccordionSummary-root": {
          background: `${color.primary[400]} !important`,
        },
        "&  .css-15v22id-MuiAccordionDetails-root": {
          backgroundColor: `${color.primary[600]} !important`,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{}}>
        {propses === undefined ? <Comp /> : <Comp {...propses} />}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordianCustom;
