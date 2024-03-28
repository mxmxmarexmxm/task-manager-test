export const generateUniqueID = () =>
  Date.now().toString() + Math.floor(Math.random() * 10000);
