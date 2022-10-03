import { FC } from 'react';

interface LoadingProps {
    title?: string;
    loading?: boolean;
    height?: string;
    color?: string;
}

const ComponetLoading: FC<LoadingProps> = ({ title, loading, height, color, }) => {
    return (
        <div
            className="text-center container mb-3"
            style={{
                position: 'relative',
                minHeight: `${height}`,
                background: `${color}`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                {loading && (
                    <i
                        className="fa fa-circle-o-notch fa-spin"
                        style={{ fontSize: 14, marginLeft: 10, color: '#fff' }}
                    />
                )}
                <div className="text-white mt-2" style={{fontFamily: 'Montserrat-SemiBold', fontSize: '14px'}}>{title}</div>
            </div>
        </div>
    );
};

ComponetLoading.defaultProps = {
    title: 'Cargando...',
    loading: true,
    height: '300px',
    color: 'rgba(255, 255, 255, 0.6)'
};

export default ComponetLoading;
