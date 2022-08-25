import { useSelector } from 'react-redux';
import useRoutes from './config/routes';
import useRoutesLanding from './config/routesLanding';
import AppRouter from './utils/components/router/AppRouter';
import Template from './utils/components/template';

const MedeinnApp = () => {
    // TODO: montrar cuando tenga inicio de sesion
    //   const user = useSelector((store: any) => store?.auth?.user);
    const user = true;
    const allRoutes = useRoutes();
    const allRoutesLandig = useRoutesLanding();

    return (
        <div>
            <AppRouter template={Template} routes={user ? allRoutes : allRoutesLandig} />
        </div>
    );
};

export default MedeinnApp;
