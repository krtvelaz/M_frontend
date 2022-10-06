import { useSelector } from 'react-redux';
import useRoutes from './config/routes';
import LandingPage from './utils/components/landing';
import AppRouter from './utils/components/router/AppRouter';
import Template from './utils/components/template';


const MedeinnApp = () => {
      const user = useSelector((store: any) => store?.auth?.user?.value);
      
      
    const allRoutes = useRoutes();
    return (
        <div>
            <AppRouter template={ user && user?.detail_user?.use_role?.id !== 4 ? Template   : LandingPage  } routes={allRoutes} user={user} />
        </div>
    );
};

export default MedeinnApp;
