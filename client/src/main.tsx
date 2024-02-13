import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE;
const currentBaseUrl = window.location.origin;
const dynamicRedirectUri = `${currentBaseUrl}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      audience: audience,
      redirect_uri: dynamicRedirectUri,
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
