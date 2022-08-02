import { routes as homeRoutes } from '../modules/admin/home';
import { routes as challengeRoutes } from '../modules/admin/challenge';
import { routes as bannerRoutes } from '../modules/admin/banner';
import { routes as publicationRoutes } from '../modules/admin/publication';
import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutes = (props = null): IRoute[] => {
    return combineRoutes(props, [
        homeRoutes,
        challengeRoutes,
        bannerRoutes,
        publicationRoutes
    ]);
};

export default useRoutes;
