import { TimePicker, Form } from "antd";
import { FieldProps } from "formik";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { inputTime } from "../assets/img";


interface IProps extends FieldProps {
    hora?: string;
    minuto?: string;
    meridiano_am_pm?: string;
    extra_on_change?: (value: any, prev_value?: any) => void;
}
const TimeInput: FC<IProps> = ({ field, form, extra_on_change, hora, minuto, meridiano_am_pm }) => {
    const [openTimePicker, setOpenTimePicker] = useState(false);
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [meridian, setMeridian] = useState("");

    useEffect(() => {
        if (hora || hora === "") {
            setHour(hora);
        }
    }, [hora]);

    useEffect(() => {
        if (minuto || minuto === "") {
            setMinute(minuto);
        }
    }, [minuto]);

    useEffect(() => {
        if (meridiano_am_pm || meridiano_am_pm === "") {
            setMeridian(meridiano_am_pm);
        }
    }, [meridiano_am_pm]);

    const guardarFecha = (fecha: any) => {
        setOpenTimePicker(false);
        setHour(moment(fecha).format("hh"));
        setMinute(moment(fecha).format("mm"));
        setMeridian(moment(fecha).format("A"));
        form.setFieldValue(field.name, moment(fecha).format("hh-mm-A"), false);
        extra_on_change && extra_on_change(moment(fecha).format("hh-mm-A"), field.value);
    };
    return (
        <>
            <div className="row g-2">
                <div className="col-3 text-center">
                    <div
                        className="form-control"
                        style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
                    >
                        <span style={{ lineHeight: '25px' }}> {hour || "hh"}</span>
                    </div>
                </div>
                <div className="col-3 text-center">
                    <div
                        className="form-control"
                        style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
                    >

                        <span style={{ lineHeight: '25px' }}> {minute || "mm"}</span>
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
                    />
                </div>
            </div>
        </>
    )
}

export default TimeInput