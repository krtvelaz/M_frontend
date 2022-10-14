import { Radio } from "antd";
import { FC } from "react";

interface IRadioPros {
    className?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
    field: any;
    form: any;
    options: any[];
}
const RadioMedeinn: FC<IRadioPros> = ({
    field, form, className, extra_on_change, options, ...props
}) => {

    const on_change = (value: any) => {
        form.setFieldValue(field.name, value.target.value, false);
        extra_on_change && extra_on_change(value.target.value, field.value);
    }

    const render_options = (items: any) =>
        items?.map((item: any, i: any) => {

            return (
                <Radio key={`radio_${i}`} value={item?.value || ""}>
                    {item?.name || ""}
                </Radio>
            );
        });

    return (

        <Radio.Group {...props} onChange={on_change} value={field.value} >
            {render_options(options)}
        </Radio.Group>

    )
}

export default RadioMedeinn