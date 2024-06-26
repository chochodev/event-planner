import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import MyRoute from 'routes';
import useAuthCheck from 'hooks/withAuthCheck';


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      dark: '#323d76', 
      light: '#5d7dd4', 
    },
    secondary: {
      main: '#FF3131', 
      dark: '#7a0018', 
      light: '#ff647c', 
    },
  },
});

function App() {
  useAuthCheck()
  
  return (
    <ThemeProvider theme={customTheme}>
      <MyRoute />
    </ThemeProvider>
  );
}

export default App;
