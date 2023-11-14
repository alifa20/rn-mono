import { bucket } from '../utils/database';

export type ExcludeFilter =
  | 'title'
  | 'category'
  | 'subCategory'
  | 'productType'
  | 'brand'
  | 'colour'
  | 'commonType'
  | 'discount'
  | 'tag'
  | 'size'
  | 'priceRange';

export const getProductImagesUrls = async (productId: string) => {
  const [files] = await bucket.getFiles({
    prefix: `${productId}/`
  });

  const imagesUrls = await Promise.all(
    files.map(async (file) => {
      if (!file.metadata.contentType.startsWith('image/')) return '';

      const signedUrl = await file.getSignedUrl({
        version: 'v4',
        expires: new Date().setSeconds(new Date().getSeconds() + 604700), // the link with the token will expire after 7 days
        action: 'read'
      });
      return signedUrl[0];
    })
  );

  return imagesUrls.filter((i) => i);
};
