export const uniqueFinder = async (value, model) => {
  const ifUnique = await model.findOne({ name: value });
  if (!ifUnique) {
    return true;
  }
  return false;
};
