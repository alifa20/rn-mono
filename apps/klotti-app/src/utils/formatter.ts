import 'intl';
import 'intl/locale-data/jsonp/en';
import isBase64 from 'is-base64';

// Pretty formatting of currency.
// WARNING: This function rounds numbers if the input has more decimal places
// than the set length.
export const formatAsCurrency = (
  amount: number | string,
  options: {
    maximumDecimalPlaces?: number;
  } = {}
): string => {
  const number = typeof amount === 'number' ? amount : parseFloat(amount);

  if (Number.isNaN(number)) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-AU', {
    // style: "currency",
    // currency: "AUD",
    // currencyDisplay: "symbol",
    // Why not use these? Because doing so change the output of
    // the function when our pipelines run in US locale, which
    // causes tests to fail in Node 10.
    minimumFractionDigits: 2,
    maximumFractionDigits: options.maximumDecimalPlaces || 2,
    ...options
  });

  return `$${formatter.format(number)}`;
};

export const isImageValidBase64 = (image: string) => {
  const isImageWithMime = isBase64(image, {
    mimeRequired: true,
    allowEmpty: false
  });
  return isImageWithMime;
};
