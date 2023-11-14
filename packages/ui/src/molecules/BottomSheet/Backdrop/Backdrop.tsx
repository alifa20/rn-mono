import React, { useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle
} from 'react-native-reanimated';
import {
  TapGestureHandlerGestureEvent,
  TapGestureHandler
} from 'react-native-gesture-handler';
import { useTheme } from '../../../theme';

export type BackdropProps = BottomSheetBackdropProps & {
  onPress: () => void;
};

export const Backdrop = ({
  animatedIndex,
  style,
  onPress,
  ...props
}: BackdropProps) => {
  const theme = useTheme();
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.8],
      Extrapolate.CLAMP
    )
  }));

  const gestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onFinish: () => {
          runOnJS(onPress)();
        }
      },
      [onPress]
    );

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: theme.colors.gray
      },
      containerAnimatedStyle
    ],
    [style, theme.colors.gray, containerAnimatedStyle]
  );

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={containerStyle} {...props} />
    </TapGestureHandler>
  );
};
