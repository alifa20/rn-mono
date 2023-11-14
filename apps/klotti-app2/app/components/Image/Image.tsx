import { Image as ExpoImage, ImageProps } from 'expo-image';

export const Image = (props: ImageProps) => {
  return (
    <ExpoImage
      style={{
        width: '100%',
        height: '100%'
      }}
      {...props}
    />
  );
};
