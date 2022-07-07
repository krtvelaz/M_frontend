import Avatar from 'antd/lib/avatar';
import { NavLink } from 'react-router-dom';
import { FC, MouseEventHandler } from 'react';

interface SabiLinkProps extends LinkButtonProps {
    to: any;
}
const componetLink: FC<SabiLinkProps> = ({ to, ...button_props }) => (
    <NavLink to={to} className="text-decoration-none" style={{ display: 'inline-block' }}>
        <LinkButton {...button_props} />
    </NavLink>
);

componetLink.defaultProps = {
    avatar: true,
};

export default componetLink;

interface LinkButtonProps {
    name: string;
    icon?: any;
    iconText?: string;
    avatar?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}
export const LinkButton: FC<LinkButtonProps> = ({ name, icon, iconText, avatar, onClick, className }) => {
    const has_icon = icon || iconText;
    const axu_class = ['d-flex justify-content-center align-items-center component-link', className].join(' ');
    return (
        <span className={axu_class} onClick={onClick}>
            <span style={{ cursor: 'pointer' }}>{name}</span>
            {has_icon && avatar && (
                <Avatar className="ms-2 text-white" size={28} icon={icon} style={{ backgroundColor: '#603CE6' }}>
                    {iconText}
                </Avatar>
            )}
            {has_icon && !avatar && (
                <span className="ms-2" style={{ fontSize: 16 }}>
                    {icon || iconText}
                </span>
            )}
        </span>
    );
};
