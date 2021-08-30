import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './App';
import client from './client';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: { main: '#4527a0' },
    secondary: { main: '#ff99bb' },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client as any}>
        <App />
      </ApolloProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
