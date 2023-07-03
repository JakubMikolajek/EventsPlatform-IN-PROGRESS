export const getItem = async (key: string) => {
  try {
    const stored_data = await localStorage.getItem(key);

    if (stored_data) {
      return stored_data;
    }

    return null;
  } catch (e) {
    console.log(e);
  }
};
