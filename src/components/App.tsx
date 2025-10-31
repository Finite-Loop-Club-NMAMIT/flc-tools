import { BrowserRouter, useRoutes } from 'react-router-dom';
import routesConfig from '../config/routesConfig';
import Navbar from './Navbar';
import { Suspense } from 'react';
import Loading from './Loading';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomSnackBarProvider } from '../contexts/CustomSnackBarContext';
import { SnackbarProvider } from 'notistack';
import { tools } from '../tools';
import './index.css';
import { darkTheme } from '../config/muiConfig';
import ScrollToTopButton from './ScrollToTopButton';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { UserTypeFilterProvider } from 'providers/UserTypeFilterProvider';

export type Mode = 'dark' | 'light' | 'system';

const AppRoutes = () => {
  const updatedRoutesConfig = [...routesConfig];
  tools.forEach((tool) => {
    updatedRoutesConfig.push({ path: tool.path, element: tool.component() });
  });
  return useRoutes(updatedRoutesConfig);
};

function App() {
  const theme = darkTheme;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <CustomSnackBarProvider>
            <UserTypeFilterProvider>
              <BrowserRouter>
                <Navbar />
                <Suspense fallback={<Loading />}>
                  <AppRoutes />
                </Suspense>
              </BrowserRouter>
            </UserTypeFilterProvider>
          </CustomSnackBarProvider>
        </SnackbarProvider>
        <ScrollToTopButton />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
