import { Radio } from "antd";
import { FC } from "react";

interface IRadioPros{
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
    field:any;
    form:any;
}
const RadioMedeinn: FC<IRadioPros> = ({
    field, form, className, extra_on_change, ...props
}) => {

    const on_change = (value: any) =>{
        form.setFieldValue(field.name, value.target.value, false);
        extra_on_change && extra_on_change(value.target.value, field.value);
    }
    return (

        <Radio.Group {...props} onChange={on_change} value={field.value} >
            <Radio value={"si"}>Si</Radio>
            <Radio value={"no"}>No</Radio>
        </Radio.Group>

    )
}

export default RadioMedeinn