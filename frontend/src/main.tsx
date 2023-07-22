import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from './redux/App/store.ts'
import { ThemeProvider} from '@mui/material/styles';
import {theme} from './theme.ts'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root  =ReactDOM.createRoot(document.getElementById('root') as HTMLElement) 
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <GoogleOAuthProvider clientId='587281660010-u1g8i24rlkhfs8urdsvqsss66nour76l.apps.googleusercontent.com'>
    <App/>
    </GoogleOAuthProvider>
    </Provider>
    </ThemeProvider>
   
  </React.StrictMode>
)
