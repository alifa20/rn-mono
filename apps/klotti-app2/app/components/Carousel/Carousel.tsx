import { View, useWindowDimensions } from 'react-native';
import RNCarousel from 'react-native-reanimated-carousel';
import { Image } from '../Image';
import { useState } from 'react';

type CarouselProps = {
  imageUrls: string[];
};

export const Carousel = ({ imageUrls }: CarouselProps) => {
  const { width } = useWindowDimensions();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <View className={'flex-1'}>
      <RNCarousel
        width={width}
        height={500}
        data={imageUrls}
        scrollAnimationDuration={1000}
        snapEnabled
        pagingEnabled
        onSnapToItem={setCurrentImageIndex}
        renderItem={({ item }) => (
          <Image
            onLoadEnd={() => setLoading(false)}
            source={item}
            contentFit="fill"
          />
        )}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10]
        }}
      />
      {imageUrls.length > 1 && !loading && (
        <View className="absolute bottom-2 w-full items-center justify-center">
          <ProgressBar
            indexes={imageUrls.length}
            currentIndex={currentImageIndex}
          />
        </View>
      )}
    </View>
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
    <View className="flex-row items-center justify-center space-x-1">
      {Array.from({ length: indexes }, (_, i) => (
        <View
          key={i}
          className={`h-2 w-2 rounded-full ${
            i === currentIndex ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </View>
  );
};
