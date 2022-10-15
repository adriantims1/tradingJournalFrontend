import axios from 'axios';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
// redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
