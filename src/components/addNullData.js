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
