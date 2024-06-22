import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const SignIn = lazy(() => import('pages/signin'));
const SignUp = lazy(() => import('pages/signup'));
const HomePage = lazy(() => import('pages/home'));


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
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Suspense fallback={
          <div className='fixed z-[100] inset-0 w-screen h-screen flex justify-center bg-secondary items-center'>
            <div id="spinner-loader">
                <div id="spinnerin-loader"></div>
            </div>
          </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path='/events/create' element={<>Create</>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
