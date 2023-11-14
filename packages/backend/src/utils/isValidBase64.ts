import isBase64 from 'is-base64';

export const isValidBase64 = (image: string) => {
  const isImageWithMime = isBase64(image, {
    mimeRequired: true,
    allowEmpty: false
  });
  return isImageWithMime;
};
