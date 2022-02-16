export const serialize = (data: any[]) => {
  if (data.length) {
    const serialized = data.map((item) => ({
      ...item,
      _id: JSON.parse(JSON.stringify(item._id)),
    }));
    return serialized;
  }
  return [];
};
