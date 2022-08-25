import { useSelector } from 'react-redux';
import useRoutes from './config/routes';
import useRoutesLanding from './config/routesLanding';
import LandingPage from './utils/components/landing';
import AppRouter from './utils/components/router/AppRouter';
import Template from './utils/components/template';

const MedeinnApp = () => {
    // TODO: montrar cuando tenga inicio de sesion
    const user = useSelector((store: any) => store?.auth?.user.value);
    console.log(user);

    const allRoutes = useRoutes();
    const allRoutesLandig = useRoutesLanding();

    return (
        <div>
            <AppRouter template={!user ? LandingPage : Template} routes={allRoutes} user={user} />
        </div>
    );
};

export default MedeinnApp;
