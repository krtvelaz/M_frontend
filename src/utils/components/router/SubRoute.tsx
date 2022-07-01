import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import {
  compute_redirect,
  get_can_access,
  withSuspense,
  redirect_fn,
} from "./utils";
import { CanAccess, IRoute } from "./custom_types";
import Template from "../template";

interface RouteWithSubRoutesProps extends IRoute {
  template: any;
  defaultRedirect: string;
  privateRedirect: string;
  // user: any; //TODO: agregar cuando este login
  test: boolean;
}

const SubRoute: FC<RouteWithSubRoutesProps> = ({
  routes,
  redirect,
  is_private,
  can_access,
  component,
  defaultRedirect,
  privateRedirect,
  location,
  lazy,
  template,
  template_props,
  test,
  ..._props
}) => {

  
  const CompoentChildren: React.ComponentType<any> | undefined = component;
  
  return (
    <Routes>
      <Route {..._props} element={<Template {...template_props}>{ CompoentChildren && <CompoentChildren {..._props} />}</Template>} />
    </Routes>
  );
};

export default SubRoute;
