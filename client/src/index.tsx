import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import App from './App';
import './index.css'; // Ensure this line is present
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'; // Correct import for store and persistor
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'; // Correct import

const queryClient = new QueryClient(); // Create a QueryClient instance

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Use createRoot instead
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
