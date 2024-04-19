export const getFromValues = (form) => {
  const formdata = new FormData(form);

  const values = [...formdata.values()];
  const isEmpty = values.includes("");

  const data = Object.fromEntries(formdata);
  return { data, isEmpty };
};
