export const formatAsCurrency = ({
  value,
  digits = 2
}: {
  value: number;
  digits?: number;
}) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits
  }).format(value);
};
