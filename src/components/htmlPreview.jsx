import { Box, IconButton } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";

const HtmlPreview = () => {
  const [count, setCount] = useState(0);

  return (
    <Box display="block" padding="0.5em" height="80vh" width="100%">
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
        </Box>
        <iframe
          key={count}
          title="resumePreview"
          src="https://registry.jsonresume.org/dineshnikam"
          height="100%"
          width="100%"
          loading="eager"
        ></iframe>
      </Box>
    </Box>
  );
};

export default HtmlPreview;
