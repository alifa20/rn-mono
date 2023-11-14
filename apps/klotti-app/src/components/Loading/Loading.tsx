import { ActivityIndicator, View } from 'react-native';

type Props = {
  fullScreen?: boolean;
};

export const Loading = ({ fullScreen }: Props) => {
  return (
    <View
      pointerEvents='box-none'
      focusable={true}
      className={`${
        fullScreen
          ? 'pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-1 items-center justify-center '
          : ''
      }
      `}>
      <ActivityIndicator size='large' />
    </View>
  );
};
