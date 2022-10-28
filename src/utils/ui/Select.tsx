import AntdSelect from 'antd/lib/select';
import { FC, useState } from 'react';
import { FieldProps } from 'formik';
import ArrowDown from '../assets/img/ArrowDown';

interface SelectProps extends FieldProps {
    options?: any[];
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
    children?: any;
    type_select?: 'document' 
    color?: string;
}
const Select: FC<SelectProps> = ({ children, field, form, options, className, extra_on_change, type_select, color, ...props }) => {
    const { Option } = AntdSelect;
    const [ changeArrow, setChangeArrow ] = useState<boolean>(false);
    if (options && Array.isArray(options)) {
        options = [...options];
    } else {
        options = [];
    }
    const on_change = (value: any) => {
        form.setFieldValue(field.name, value, false);
        extra_on_change && extra_on_change(value, field.value);
    };
    const render_options = (items: any) =>
        items?.map((item: any, i: any) => {
            
            return (
                <Option key={`project_${i}`} value={item?.id || ""} label={type_select === 'document' ? item?.type : item?.name || ""}>
                    {item?.name || ""}
                </Option>
            );
        });
    return (
        <AntdSelect
            onDropdownVisibleChange={(e) => { setChangeArrow(e) }}
            suffixIcon={< ArrowDown type={changeArrow ? 'down' : 'up' } color={color} />    }
            value={field.value}
            onChange={on_change}
            optionLabelProp="label"
            className={['w-100', className].join(' ')}
            {...props}
        >
            {render_options(options)}
        </AntdSelect>
    );
};

Select.defaultProps = {
    options: [],
    color: '#1D98D1'
};

export default Select;
