import { routes as landingRoutes } from '../modules/landing';
import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutesLanding = (props = null): IRoute[] => {
    return combineRoutes(props, [
        landingRoutes,
    ]);
};

export default useRoutesLanding;