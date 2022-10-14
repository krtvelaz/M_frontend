import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CustomRender from './CustomRender';

interface RouteWithSubRoutesProps {
    routes: any;
    template: any;
    defaultRedirect: string;
    privateRedirect: string;
    user: any; //TODO: agregar cuando este login
    test: boolean;
    lazy?: boolean;
}

const SubRoute: FC<RouteWithSubRoutesProps> = ({
    routes,
    user,
    // redirect,
    // is_private,
    // can_access,
    // component,
    defaultRedirect,
    privateRedirect,
    // location,
    lazy,
    template,
    // template_props,
    test,
    // ..._props
}) => {
    return (
        <Routes>
            {routes.map((route: any, i: number) => {
                return (
                    <Route
                        key={`route_admin-${i}`}
                        path={route.path}
                        element={
                            <CustomRender
                                lazy={lazy}
                                defaultRedirect={defaultRedirect as string}
                                privateRedirect={privateRedirect as string}
                                template={template}
                                user={user} //TODO: agregar cuando este login
                                test={test as boolean}
                                {...route}
                            />
                        }
                    />
                );
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default SubRoute;
