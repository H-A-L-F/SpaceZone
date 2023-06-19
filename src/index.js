import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider,
  ColorModeScript,
} from '@chakra-ui/react';
import theme from './Theme';
import { UserAuthContextProvider } from './lib/AuthContext';
import { LoadingContextProvider } from './lib/LoadingContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <LoadingContextProvider>
        <BrowserRouter>
          <UserAuthContextProvider>
            <App />
          </UserAuthContextProvider>
        </BrowserRouter>
      </LoadingContextProvider>
    </ChakraProvider>
  </StrictMode>
);