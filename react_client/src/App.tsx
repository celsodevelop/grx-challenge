import React from 'react';
import 'bulma/css/bulma.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes';
import { NewSurveyFlagProvider } from './context/NewSurveyFlagContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NewSurveyFlagProvider>
      <AppRoutes />
    </NewSurveyFlagProvider>
  </QueryClientProvider>
);

export default App;
