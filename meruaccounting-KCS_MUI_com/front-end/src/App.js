// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { LoginProvider } from './contexts/LoginContext';
import { TeamsProvider } from './contexts/TeamsContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <LoginProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <TeamsProvider>
          <Router />
        </TeamsProvider>
      </ThemeConfig>
    </LoginProvider>
  );
}
