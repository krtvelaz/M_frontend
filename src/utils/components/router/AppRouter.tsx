import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubRoute from "./SubRoute";
import { IAppRouter, IRoute } from "./custom_types";
import Template from "../template";
import LandingPage from "../landing";

const AppRouter: React.FC<IAppRouter> = ({
  test,
  routes,
  defaultRedirect,
  privateRedirect,
  lazy,
  template,
  // user, //TODO: agregar cuando este login
  show,
}) => {
  
  console.log(routes);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => {
          if (route.routes) route.exact = false;           
          const CompoentChildren: React.ComponentType<any> | undefined = route.component;             
          return (
            <Route key={`route_global_${i}`} path={route.path} element={<LandingPage {...route.template_props} >{ CompoentChildren && <CompoentChildren {...route} />}</LandingPage>} />
            //  <Route key={`route_global_${i}`} path={route.path} element={<Template {...route.template_props}>{ CompoentChildren && <CompoentChildren {...route} />}</Template>} />
            // <Route
            //   key={`route_global_${i}`}
            //   path='/*'
            //   element={
            //     <SubRoute
            //       defaultRedirect={defaultRedirect as string}
            //       privateRedirect={privateRedirect as string}
            //       lazy={lazy}
            //       template={template}
            //       // user={user} //TODO: agregar cuando este login
            //       test={test as boolean}
            //       {...route}
            //     />
            //   }
            // />
          );
        })}
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
