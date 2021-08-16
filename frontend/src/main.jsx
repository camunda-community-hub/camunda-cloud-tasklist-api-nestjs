import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { reactQueryClient } from "./reactQueryClient";
import { QueryClientProvider } from "react-query";
import "bulma/css/bulma.min.css";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
