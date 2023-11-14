import React, { forwardRef, useCallback, useRef } from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetModal
} from '@gorhom/bottom-sheet';
import { Backdrop } from './Backdrop/Backdrop';
import { useTheme } from '../../theme';

type BottomSheetProps = {
  snapPoints?: string[];
  hideHandle?: boolean;
};

export const useBottomSheet = () => {
  const ref = useRef<BottomSheetModal>(null);
  const show = () => ref.current?.present();
  const hide = () => ref.current?.dismiss();

  return { ref, show, hide };
};

export const BottomSheet = forwardRef<
  BottomSheetModal,
  React.PropsWithChildren<BottomSheetProps>
>(({ snapPoints = ['40%'], children, hideHandle = false }, ref) => {
  const theme = useTheme();

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <Backdrop
        {...backdropProps}
        onPress={() => {
          // @ts-ignore
          ref?.current?.dismiss();
        }}
      />
    ),
    [ref]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: theme.colors.background
      }}
      backdropComponent={renderBackdrop}
      {...(hideHandle && {
        handleComponent: () => null
      })}>
      {children}
    </BottomSheetModal>
  );
});
