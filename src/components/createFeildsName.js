export const createFeildsName = (index, dataProps, baseUrl) => {
  let i = 0;
  const names = [];
  for (i = 0; i < dataProps.length; i++) {
    const feildObj = {};
    feildObj["label"] = dataProps[i].label;
    feildObj["name"] = `${baseUrl}[${index}].${dataProps[i].name}`;
    feildObj["required"] = dataProps[i].required;
    names.push(feildObj);
  }
  return names;
};
