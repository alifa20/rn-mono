import React from 'react';
import AppContainer from './app/AppContainer';

import { maybeCompleteAuthSession } from 'expo-web-browser';

maybeCompleteAuthSession();

export default function App() {
  return <AppContainer />;
}
