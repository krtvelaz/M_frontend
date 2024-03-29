import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import MedeinnApp from "./MedeinnApp";
import "./utils/assets/styles/index.scss";
import TemplateProvider from './utils/components/template/templateContext';
import { store } from "./config/store";
import _config from '@arcgis/core/config';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

if (import.meta.env.VITE_APP_ARGIS_KEY) {
  _config.apiKey = import.meta.env.VITE_APP_ARGIS_KEY;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ConfigProvider locale={es_ES}>
    <TemplateProvider>
      <MedeinnApp />
    </TemplateProvider>
    </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
