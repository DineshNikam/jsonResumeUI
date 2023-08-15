// Function to filter out only valid properties recursively
const filterValidPropertiesRecursive = async (data, validationSchema) => {
  const validProperties = {};

  for (const key in validationSchema.fields) {
    try {
      if (data[key] !== undefined) {
        if (validationSchema.fields[key].type === "object") {
          const nestedValidProperties = await filterValidPropertiesRecursive(
            data[key],
            validationSchema.fields[key]
          );
          // if (Object.keys(nestedValidProperties).length > 0) {
          validProperties[key] = nestedValidProperties;
          // }
        } else if (validationSchema.fields[key].type === "array") {
          if (Array.isArray(data[key])) {
            const nestedValidArray = [];
            // console.log(
            //   "inner console :",
            //   validationSchema.fields[key].innerType.fields,
            //   "      ",
            //   data[key]
            // );
            for (const item of data[key]) {
              const nestedItem = await filterValidPropertiesRecursive(
                item,
                validationSchema.fields[key].innerType
              );
              if (Object.keys(nestedItem).length > 0) {
                nestedValidArray.push(nestedItem);
              }
            }
            // if (nestedValidArray.length > 0) {
            validProperties[key] = nestedValidArray;
            // }
          }
        } else {
          await validationSchema.validateAt(key, data);
          validProperties[key] = data[key];
        }
      } else {
        if (validationSchema.fields[key].type === "object") {
          validProperties[key] = {};
          // console.log("1");
        }
        if (validationSchema.fields[key].type === "array") {
          validProperties[key] = [];
          // console.log("2");
        }
        if (validationSchema.fields[key].type === "string") {
          validProperties[key] = "";
          // console.log("3");
        }
        // console.log(key);
      }
    } catch (error) {
      // Property is not valid according to the schema
    }
  }

  return validProperties;
};

// Export the filterValidProperties function
export async function filterValidProperties(data, schema) {
  try {
    // Filter and get only the valid properties recursively
    const validData = await filterValidPropertiesRecursive(data, schema);
    return validData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
