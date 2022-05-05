import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>
);

export default App;
