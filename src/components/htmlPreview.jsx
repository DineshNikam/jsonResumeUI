import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./select";
import { CssTextField } from "./CssTextField";

const HtmlPreview = ({
  gitUsername,
  setGitUsername,
  selectValue,
  setSelectValue,
}) => {
  const [count, setCount] = useState(0);
  const [inVal, setInVal] = useState("");
  const [openSetting, setOpenSetting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState("");
  const handleChange = (event) => {
    setInVal(event.target.value);
  };
  useEffect(() => {
    setInVal(gitUsername);
  }, [gitUsername]);

  const handleSubmit = () => {
    // console.log("clicked");

    if (inVal !== "") {
      setGitUsername(inVal);
      setOpenSetting(false);
    } else {
      setUsernameStatus("Username can't be empty");
    }
  };
  const handleClose = () => {
    setOpenSetting(false);
  };
  return (
    <Box display="block" padding="0.5em" height="90vh" width="100%">
      {openSetting || gitUsername === "" ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="auto"
          minHeight="200px"
        >
          <Box
            display="felx"
            flexDirection="column"
            height="80%"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              justifyContent="start"
              justifyItems="space-evenly"
            >
              <CssTextField
                label="Git Username"
                value={inVal}
                onChange={handleChange}
                sx={{ marginY: "10px" }}
              />
              {usernameStatus && (
                <Alert
                  severity={"error"}
                  sx={{ marginLeft: "5px", marginY: "auto" }}
                >
                  <Typography variant="subtitle1">{usernameStatus}</Typography>
                </Alert>
              )}
            </Box>

            <Select
              value={selectValue}
              setValue={setSelectValue}
              sx={{ marginY: "10px" }}
            />
          </Box>
          <Box height="20%">
            <Button varient="filled" color="warning" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              varient="filled"
              color="warning"
              onClick={handleClose}
              endIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Box>
        </Box>
      ) : (
        <Fragment>
          <Box
            position="relative"
            padding="0px"
            margin="0px"
            width="100%"
            height="100%"
          >
            <Box position="absolute" top="1px" left="1px">
              <IconButton
                aria-label="Refresh preview"
                onClick={() => {
                  setCount((count + 1) % 10);
                }}
                color="success"
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                aria-label="Setting"
                onClick={() => {
                  setOpenSetting(true);
                }}
                color="success"
              >
                <SettingsIcon />
              </IconButton>
            </Box>
            <iframe
              key={count}
              title="resumePreview"
              src={`https://registry.jsonresume.org/${gitUsername}/?theme=${
                !selectValue ? "elegant" : selectValue
              }`}
              height="100%"
              width="100%"
              loading="eager"
            ></iframe>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default HtmlPreview;
