import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButton = ({
  copied,
  jsonData,
  setCopied,
  handleClick,
  open,
  handleClose,
}) => {
  return (
    <Box m={"10px 0"}>
      <CopyToClipboard text={jsonData} onCopy={() => setCopied(true)}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ContentCopyOutlinedIcon />}
          onClick={handleClick}
        >
          Copy
        </Button>
      </CopyToClipboard>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {copied ? "Copied.." : null}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export { CopyButton };
