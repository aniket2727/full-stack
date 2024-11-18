import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import App from './App';
import './index.css'; // Ensure this line is present
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'; // Correct import for store and persistor
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient(); // Create a QueryClient instance

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Use createRoot instead
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}> {/* Wrap your app with QueryClientProvider */}
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
