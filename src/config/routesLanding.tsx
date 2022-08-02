import { routes as landingRoutes } from '../modules/landing/homepage';
import { routes as postulationRoutes } from '../modules/landing/postulation';
import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutesLanding = (props = null): IRoute[] => {
    return combineRoutes(props, [
        landingRoutes,
        postulationRoutes,

    ]);
};

export default useRoutesLanding;