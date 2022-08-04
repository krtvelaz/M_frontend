import { TimePicker, Form } from "antd";
import { FieldProps } from "formik";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { inputTime } from "../assets/img";


interface IProps extends FieldProps {
    
    extra_on_change?: (value: any, prev_value?: any) => void;
}
const TimeInput: FC<IProps> = ({ field, form, extra_on_change }) => {
    const [openTimePicker, setOpenTimePicker] = useState(false);
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [meridian, setMeridian] = useState("");

    useEffect(() => {
        if (field.value) {
            setHour(moment(field.value, "hh:mm A").format("hh"));
            setMinute(moment(field.value, "hh:mm A").format("mm"));
            setMeridian(moment(field.value, "hh:mm A").format("A"));
        }
      }, [field.value]);
    const guardarFecha = (hora: any) => {
        setOpenTimePicker(false);
        setHour(moment(hora).format("hh"));
        setMinute(moment(hora).format("mm"));
        setMeridian(moment(hora).format("A"));
        form.setFieldValue(field.name, moment(hora, "hh:mm A").format("hh:mm A"), false);
        extra_on_change && extra_on_change(moment(hora, "hh:mm A").format("hh:mm A"), field.value);
    };
    return (
        <>
            <div className="row g-2">
                <div className="col-3 text-center">
                    <div
                        className="form-control"
                        style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
                    >
                        <span style={{ lineHeight: '25px' }}> {hour || "HH"}</span>
                    </div>
                </div>
                <div className="col-3 text-center">
                    <div
                        className="form-control"
                        style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
                    >

                        <span style={{ lineHeight: '25px' }}> {minute || "MM"}</span>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div
                        className="form-control"
                        style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
                    >
                        <span style={{ lineHeight: '25px' }}>{meridian || "AM"}</span>
                    </div>
                </div>
                <div className="col-1">
                    <TimePicker
                        style={{
                            paddingLeft: 0,
                            cursor: "pointer",
                            lineHeight: '25px'
                        }}
                        className="font-size-20px font-color-1FAEEF datepicker-hidden"
                        suffixIcon={
                            <img style={{ cursor: "pointer" }} src={inputTime} />
                        }
                        clearIcon={false}
                        onClick={() => setOpenTimePicker(true)}
                        onBlur={() => setOpenTimePicker(false)}
                        bordered={false}
                        open={openTimePicker}
                        onChange={guardarFecha}
                        format="hh:mm A"
                    />
                </div>
            </div>
        </>
    )
}

export default TimeInput