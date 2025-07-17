export const euros = (value: string | number): string => {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(Number(value));
};
