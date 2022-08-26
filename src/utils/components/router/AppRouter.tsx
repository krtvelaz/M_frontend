import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SubRoute from './SubRoute';
import { IAppRouter } from './custom_types';

const AppRouter: React.FC<IAppRouter> = ({
    test,
    routes,
    defaultRedirect,
    privateRedirect,
    lazy,
    template,
    user, //TODO: agregar cuando este login
    show,
}) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/*"
                        element={
                            <SubRoute
                                routes={routes}
                                defaultRedirect={defaultRedirect as string}
                                privateRedirect={privateRedirect as string}
                                lazy={lazy}
                                template={template}
                                user={user} //TODO: agregar cuando este login
                                test={test as boolean}
                                // {...route}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

AppRouter.defaultProps = {
    defaultRedirect: '/',
    privateRedirect: '/home',
    lazy: false,
    test: false,
    show: true,
};

export default AppRouter;
