import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import SWRConfig from "./utils/swr";
import {AuthProvider} from "./utils/auth";
import {GlobalStyle, ThemeProvider} from "./utils/theme";
import ErrorBoundary from "./components/ErrorBoundary";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <ErrorBoundary>
        <SWRConfig>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SWRConfig>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
