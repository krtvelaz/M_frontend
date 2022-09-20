import Card from 'antd/lib/card';
import { CSSProperties, FC } from 'react';

interface SabiCardProps {
    title?: any;
    extra?: any;
    actions?: any;
    className?: string;
    bodyStyle?: CSSProperties;
    style?: CSSProperties;
    loading?: boolean;
    children: any;
}
const ComponetCard: FC<SabiCardProps> = ({loading, title, extra, actions, children, className, bodyStyle, style }) => {
    const ops = {
        title,
        loading,
        bordered: false,
        className: [className, 'medeinn-content'].join(' '),
        bodyStyle,
        style: style || { marginBottom: '1.5rem', fontFamily: 'Work-Sans-Regular', fontSize: '12px' },
        ...(extra ? { extra } : {}),
        ...(actions ? { actions } : {}),
    };
    return <Card {...ops}>{children}</Card>;
};

ComponetCard.defaultProps = {
    loading: false,
};

export default ComponetCard;
