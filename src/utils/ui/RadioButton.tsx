import { FC } from 'react';
import { FieldProps } from 'formik';
import { getStatusClassNames } from 'antd/lib/_util/statusUtils';

interface RadioButtonProps {
    name?: string;
    value?: string;
    onChange?: (value: any, prev_value?: any) => void;
    onBlur?: any;
    field?: any;
    id?: string;
    label?: string;
    className?: any;
}
const RadioButton: FC<RadioButtonProps> = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div style={{ display: 'flex' }}>
            <input
                name={name}
                id={id}
                type="radio"
                value={id}
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={getStatusClassNames('radio-button')}
                {...props}
            />
            <label style={{ paddingLeft: '10%' }} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
export default RadioButton;
