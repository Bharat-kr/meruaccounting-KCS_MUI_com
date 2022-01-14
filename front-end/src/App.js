// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { LoginProvider } from "./contexts/LoginContext";
import { TeamsProvider } from "./contexts/TeamsContext";
import { ClientsContextProvider } from "./contexts/ClientsContext";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { ProjectsContextProvider } from "./contexts/ProjectsContext";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <LoginProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <CurrentUserContextProvider>
          <ClientsContextProvider>
            <ProjectsContextProvider>
              <EmployeeProvider>
                <TeamsProvider>
                  <Router />
                </TeamsProvider>
              </EmployeeProvider>
            </ProjectsContextProvider>
          </ClientsContextProvider>
        </CurrentUserContextProvider>
      </ThemeConfig>
    </LoginProvider>
  );
}
