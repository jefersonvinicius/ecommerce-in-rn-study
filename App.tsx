import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import Routes from './src/routes';
import {SetupAPI} from './src/services/api';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SetupAPI />
        <Routes />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
