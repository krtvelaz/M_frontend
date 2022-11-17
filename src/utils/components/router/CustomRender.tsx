import { FC } from 'react';
import { CanAccess, IRoute } from './custom_types';
import { compute_redirect, has_access, redirect_fn, withSuspense } from './utils';

interface RouteWithSubRoutesProps extends IRoute {
    template: any;
    defaultRedirect: string;
    privateRedirect: string;
    user: any;
    test: boolean;
}

const CustomRender: FC<RouteWithSubRoutesProps> = ({
    routes,
    redirect,
    is_private,
    can_access,
    component,
    defaultRedirect,
    privateRedirect,
    location,
    lazy,
    template,
    template_props,
    format,
    ..._props
}) => {
    if (redirect) return compute_redirect(redirect, location);

    const dr = compute_redirect(defaultRedirect, location);
    const ops = {
        ..._props,
        ...(routes ? { routes } : {}),
        ...(!is_private ? { redirect: redirect_fn } : {}),
    };
    const cp = withSuspense(ops, dr, lazy ? false : undefined)(component);
    if (format) {
        if (has_access(can_access as CanAccess, _props)) {
            const Template = template;
            const template_ops = {
                ...template_props,
                user: _props.user?.detail_user,
                // roles_user: _props.user?.roles,
            };
            return template ? <Template {...template_ops}>{cp}</Template> : cp;
        } else {
            if (_props?.user?.detail_user?.use_role?.id && _props?.user?.detail_user?.use_role?.id !== 4) {
                return compute_redirect(privateRedirect, location);
            } else {
                return compute_redirect(defaultRedirect, location);
            }
        }
    }
    return cp;
};

export default CustomRender;
