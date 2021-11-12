import React, { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const SoundPage = React.lazy(() => import('./src/pages/SoundPage'));

import configureStore from './src/redux/configureStore';
import { PendingView, StyledSafeAreaView } from './src/components/common/SimpleComponents';

const { store, persistor } = configureStore()

const AppContent = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledSafeAreaView height='100%' width='100%' backgroundColor='#fff'>
        <Suspense fallback={<PendingView color='#00ff00' />}>
          <SoundPage />
        </Suspense>
      </StyledSafeAreaView>
    </PersistGate>
  </Provider>
);

export default AppContent;
