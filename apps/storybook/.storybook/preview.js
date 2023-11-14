import { View } from 'react-native';
import { ThemeProvider } from '../../../packages/ui/src/theme/ThemeProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '../../../packages/ui/src/organism/Toast/context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  Story => (
    <GestureHandlerRootView
      style={{
        flex: 1
      }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <ToastProvider>
              <View
                style={{
                  flex: 1,
                  padding: 8,
                  backgroundColor: '#fff'
                }}>
                <Story />
              </View>
            </ToastProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
];
