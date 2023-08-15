import React, { useState } from "react";
import { Button, Input } from "@mui/material";

const ResumeFileInput = ({ onFileSelect, setErrorUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    console.log("fileSelect in");
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
    console.log("fileSelect out");
  };

  return (
    <div>
      <Input
        type="file"
        accept=".json" // Optional: Limit accepted file types to JSON
        onChange={handleFileSelect}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedFile}
        onClick={() => {
          setSelectedFile(null);
          setErrorUpload(0);
        }}
      >
        Clear File
      </Button>
    </div>
  );
};

export default ResumeFileInput;
