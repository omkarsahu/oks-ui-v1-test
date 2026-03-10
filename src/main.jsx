import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "oks-ui/styles";
import "./index.css";
import "./oks-ui-theme.css";
import App from "./App.jsx";
import { ToastProvider } from "oks-ui";

createRoot(document.getElementById("root")).render(
  <ToastProvider placement="bottom-right" maxVisibleToasts={3}>
    <StrictMode>
      <App />
    </StrictMode>
  </ToastProvider>,
);
