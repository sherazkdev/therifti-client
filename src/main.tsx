import React from "react";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { AuthProvider } from "./contexts/auth/auth.provider";

import SocketProvider from "./contexts/sockets/socket.provider";
import { UIProvider } from "./contexts/ui/ui.provider";

/** Note: Created Client. */
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
