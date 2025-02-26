import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { onSigninCallback, queryClient, userManager } from "./config.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </AuthProvider>
);
