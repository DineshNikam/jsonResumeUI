// while imported data Add epty valy if some feilds don't have values

export const mergeObjectsRecursively = (source, target) => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeObjectsRecursively(source[key], target[key]);
    } else if (!target.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
};

// while exporting remove empty urls and dates feilds

function rec(data) {
  Object.keys(data).forEach((field) => {
    if (Array.isArray(data[field])) {
      if (data[field].length !== 0) {
        for (const element of data[field]) {
          if (typeof element === "object" && !Array.isArray(element)) {
            rec(element);
          }
        }
      }
    }

    // ------------------------------
    else if (typeof data[field] === "object") {
      if (Object.keys(data).length === 0) {
        delete data[field];
      } else {
        rec(data[field]);
      }
    }
    // ----------------------
    else if (typeof data[field] === "string" && data[field].trim() === "") {
      delete data[field];
    }
  });
}

export const cleanDataBeforeExport = (data) => {
  rec(data);
  return data;
};
