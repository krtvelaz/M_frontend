import { routes as homeRoutes } from '../modules/home';
import { routes as challengeRoutes } from '../modules/challenge';
import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutes = (props = null): IRoute[] => {
    return combineRoutes(props, [
        homeRoutes,
        challengeRoutes,
    ]);
};

export default useRoutes;
