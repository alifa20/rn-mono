import { useWindowDimensions } from 'react-native';
import RNCarousel, { TCarouselProps } from 'react-native-reanimated-carousel';
import { useState } from 'react';
import React from 'react';
import { Box, Image } from '../../atoms';

type ImageCarouselProps = Omit<
  TCarouselProps,
  'renderItem' | 'mode' | 'modeConfig'
>;

export const ImageCarousel = ({ data, ...props }: ImageCarouselProps) => {
  const { width, height } = useWindowDimensions();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <Box flex={1}>
      <RNCarousel
        width={width}
        scrollAnimationDuration={1000}
        snapEnabled
        pagingEnabled
        onSnapToItem={setCurrentImageIndex}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10]
        }}
        height={height / 1.75}
        {...props}
        data={data}
        renderItem={({ item }) => (
          <Image
            onLoadEnd={() => setLoading(false)}
            source={item}
            contentFit='fill'
          />
        )}
      />
      {data.length > 1 && !loading && (
        <Box
          position={'absolute'}
          bottom={8}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}>
          <ProgressBar indexes={data.length} currentIndex={currentImageIndex} />
        </Box>
      )}
    </Box>
  );
};

const ProgressBar = ({
  indexes,
  currentIndex
}: {
  indexes: number;
  currentIndex: number;
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      gap='4xs'>
      {Array.from({ length: indexes }, (_, i) => (
        <Box
          key={i}
          height={8}
          width={8}
          borderRadius={'s'}
          backgroundColor={i === currentIndex ? 'background' : 'gray'}
        />
      ))}
    </Box>
  );
};
