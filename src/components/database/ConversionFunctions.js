export const CalculateAverage = (min, max, Decimals) => {
  let avg = 0;

  let values = {
    min: isNaN(parseFloat(min)) ? 0 : parseFloat(min),
    max: isNaN(parseFloat(max)) ? 0 : parseFloat(max),
  };

  avg = (values.min + values.max) / 2;

  return isNaN(parseFloat(avg).toFixed(Decimals))
    ? ""
    : parseFloat(avg).toString().includes(".")
    ? parseFloat(avg).toFixed(Decimals)
    : parseFloat(avg);
};
