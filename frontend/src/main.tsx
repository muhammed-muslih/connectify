import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider} from '@mui/material/styles';
import { Provider } from 'react-redux'
import {store,persistor} from './redux/App/store.ts'
import {theme} from './theme.ts'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from "redux-persist/integration/react";


const root  =ReactDOM.createRoot(document.getElementById('root') as HTMLElement) 
console.log(import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App/>
    </PersistGate>
    </Provider>
    </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
