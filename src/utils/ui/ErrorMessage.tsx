import { FC } from 'react';
import { ErrorMessage as FormikErrorMessage, useField } from 'formik';

interface ErrorMessageProps {
    name?: string;
    withCount?: boolean;
    max?: number;
    className?: string;
    color?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ name, withCount, max, className, color, ...props }) => {
    let [field] = useField(name ? { name } : { name: '_' });
    let hasCount = false;
    const value = field.value;
    if (name && withCount) {
        hasCount = withCount && (typeof value === 'string' || typeof value === 'number');
    }


    
    return (
        <div className="row w-100 m-0">
            <div className="col">
                <span style={{color: `${color}`}} className="form-error">{name && <FormikErrorMessage className={className} name={name} />}</span>
            </div>
            {hasCount && (
                <div className="col-4">
                    <span className="text-end d-block w-100 mt-1" style={{ height: '22px', fontSize: '10px', color: '#F28C02' }}>
                        {`${`${value}`.length}${max ? `/${max}` : ''}`}
                    </span>
                </div>
            )}
        </div>
    );
};

ErrorMessage.defaultProps = {
    color: '#AD0808'
};

export default ErrorMessage;
