import { routes as homeRoutes } from '../modules/admin/home';
import { routes as challengeRoutes } from '../modules/admin/challenge';
import { routes as bannerRoutes } from '../modules/admin/banner';
import { routes as publicationRoutes } from '../modules/admin/publication';
import { routes as authRoutes } from '../modules/admin/auth';
import { routes as landingRoutes } from '../modules/landing/homepage';
import { routes as postulationRoutesL } from '../modules/landing/postulation';
import { routes as challengeRoutesL } from '../modules/landing/challenge';
import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutes = (props = null): IRoute[] => {
    return combineRoutes(props, [
        homeRoutes,
        challengeRoutes,
        bannerRoutes,
        publicationRoutes,
        authRoutes,
        landingRoutes,
        postulationRoutesL,
        challengeRoutesL
    ]);
};

export default useRoutes;
