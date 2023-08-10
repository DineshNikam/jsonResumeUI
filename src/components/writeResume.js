import FileSaver from "file-saver";

export const SaveFile = (values) => {
  var blob = new Blob([JSON.stringify(values, null, 2)], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, "resume.json");
};
