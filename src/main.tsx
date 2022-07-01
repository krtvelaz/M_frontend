import React from "react";
import ReactDOM from "react-dom/client";
import MedeinnApp from "./MedeinnApp";
import "./utils/assets/styles/index.scss";
import TemplateProvider from './utils/components/template/templateContext';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TemplateProvider>
      <MedeinnApp />
    </TemplateProvider>
    
  </React.StrictMode>
);
