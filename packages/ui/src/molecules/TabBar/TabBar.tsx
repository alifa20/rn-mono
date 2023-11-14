import React, { useCallback, useEffect, useRef } from 'react';
import { Box, BoxProps, Pressable, Text, TextProps } from '../../atoms';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

type TabBarProps = {
  tabs: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  tranformXValue?: number;
  textProps?: TextProps;
} & BoxProps;

export const TabBar = ({
  tabs,
  activeIndex,
  setActiveIndex,
  tranformXValue,
  textProps,
  ...props
}: TabBarProps) => {
  const tabRefs = useRef<Array<any>>([]);
  const sharedActiveTabPosition = useSharedValue(0);
  const sharedUnderlineWidth = useSharedValue(0);
  const sharedTabHalfWidth = useSharedValue(0);
  const { spacing } = useTheme();

  const handleTabAnimation = useCallback(
    (index: number) => {
      tabRefs.current[index].measure(
        (fx: number, fy: number, width: number, _: any, px: number) => {
          sharedUnderlineWidth.value = withSpring(width, {});
          sharedActiveTabPosition.value = withSpring(px, {
            damping: 15,
            stiffness: 200
          });

          sharedTabHalfWidth.value = width / 2;
        }
      );
    },
    [sharedActiveTabPosition, sharedTabHalfWidth, sharedUnderlineWidth]
  );

  const handleTabPress = (index: number) => {
    handleTabAnimation(index);
    setActiveIndex(index);
  };

  useEffect(() => {
    // Use a slight delay to ensure elements have rendered properly
    const timeout = setTimeout(() => {
      handleTabAnimation(activeIndex);
    }, 50); // Delay of 50ms
    return () => clearTimeout(timeout);
  }, [
    activeIndex,
    handleTabAnimation,
    sharedActiveTabPosition,
    sharedUnderlineWidth
  ]);

  const underlineStyle = useAnimatedStyle(() => {
    const centerX =
      sharedActiveTabPosition.value +
      sharedTabHalfWidth.value -
      sharedUnderlineWidth.value / 2;

    return {
      transform: [
        { translateX: centerX - ((tranformXValue || 0) + spacing.s) }
      ],
      width: sharedUnderlineWidth.value,
      height: 5,
      borderRadius: 10,
      backgroundColor: 'black',
      position: 'absolute',
      top: 26,
      bottom: 0
    };
  });

  return (
    <Box flexDirection={'row'}>
      <Box gap={'s'} flexDirection={'row'}>
        {tabs.map((tab, index) => (
          <Pressable
            onPress={() => handleTabPress(index)}
            key={index}
            ref={ref => (tabRefs.current[index] = ref)}
            {...props}>
            <Text
              textAlign={'center'}
              style={index === activeIndex ? { fontWeight: 'bold' } : {}}
              variant={'paragraph1'}
              {...textProps}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </Box>
      <Animated.View style={underlineStyle} />
    </Box>
  );
};
