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
import { UserContextProvider } from "./contexts/UserContext";
import EmployeePageContextProvider from "./contexts/EmployeePageContext";
import { ReportsProvider } from "./contexts/ReportsContext";
import { CommonContextProvider } from "./contexts/CommonContext";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <LoginProvider>
      {/* <div className="cursor__dot">
        <AnimatedCursor
          innerSize={8}
          outerSize={24}
          color="0, 171, 85"
          outerAlpha={0.2}
          innerScale={0.8}
          outerScale={1.6}
        />
      </div> */}
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <EmployeeProvider>
          <CommonContextProvider>
            <UserContextProvider>
              <CurrentUserContextProvider>
                <ClientsContextProvider>
                  <ReportsProvider>
                    <ProjectsContextProvider>
                      <EmployeePageContextProvider>
                        <TeamsProvider>
                          <Router />
                        </TeamsProvider>
                      </EmployeePageContextProvider>
                    </ProjectsContextProvider>
                  </ReportsProvider>
                </ClientsContextProvider>
              </CurrentUserContextProvider>
            </UserContextProvider>
          </CommonContextProvider>
        </EmployeeProvider>
      </ThemeConfig>
    </LoginProvider>
  );
}
