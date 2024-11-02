export const toFloat = (num: number) => {
  return num % 1 !== 0 ? Number(num.toFixed(2)) : num;
};