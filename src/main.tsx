import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import esES from 'antd/lib/locale/es_ES';
import MedeinnApp from "./MedeinnApp";
import "./utils/assets/styles/index.scss";
import TemplateProvider from './utils/components/template/templateContext';
import { store } from "./config/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider locale={esES}>
    <TemplateProvider>
      <MedeinnApp />
    </TemplateProvider>
    </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
