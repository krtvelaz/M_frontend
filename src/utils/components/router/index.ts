import AppRouter from './AppRouter';
import { IRoute } from './custom_types';

const basic_routes: any = [{ path: '**', redirect: '/auth/login/' }];

export const combineRoutes = (props: any, fn_list: Function[]): IRoute[] => {   
    const routes_list = fn_list.map((fn) => fn(props));
    return [].concat(...routes_list, basic_routes);
};

export default AppRouter;
