import { InputNumber } from 'antd'
import { FieldProps } from 'formik';
import React, { FC } from 'react'

interface InputProps extends FieldProps {
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
}

const Input: FC<InputProps> = ({ field, form, className, extra_on_change, ...props }) => {

    const on_change = (value: any) => {
        form.setFieldValue(field.name, value, false);
        extra_on_change && extra_on_change(value, field.value);
    };

    return (
        <InputNumber
            style={{
                margin: 0,
                borderRadius: '3.5px',
            }}
            defaultValue={0}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.(?=\d{0,2}$)/g, ",")}
            parser={value => Number.parseFloat(value!.replace(/\$\s?|(\.*)/g, "").replace(/(,{1})/g, ".")).toFixed(2)}
            onChange={on_change}
            className={[className, "w-100"].join(" ")}
            value={field.value}
            {...props}

        />
    )
}

export default Input
