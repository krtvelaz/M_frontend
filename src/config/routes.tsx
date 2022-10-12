import { routes as homeRoutes } from '../modules/home';
import { routes as challengeRoutes } from '../modules/challenge';
import { routes as bannerRoutes } from '../modules/banner';
import { routes as publicationRoutes } from '../modules/publication';
import { routes as eventRoutes } from '../modules/event';
import { routes as authRoutes } from '../modules/auth';
import { routes as userRoutes } from '../modules/user';
import { routes as postulationRoutes } from '../modules/postulation/';
import { routes as notificationRoutes } from '../modules/notificacion';

import { combineRoutes } from '../utils/components/router';
import { IRoute } from '../utils/components/router/custom_types';

const useRoutes = (props = null): IRoute[] => {
    return combineRoutes(props, [
        homeRoutes,
        challengeRoutes,
        bannerRoutes,
        publicationRoutes,
        authRoutes,
        userRoutes,
        postulationRoutes,
        eventRoutes,
        notificationRoutes,
    ]);
};

export default useRoutes;
