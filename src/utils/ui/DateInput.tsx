import { DatePicker } from "antd";
import { FieldProps } from "formik";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { inputCalendar } from "../assets/img";

interface IProps extends FieldProps {
  extra_on_change?: (value: any, prev_value?: any) => void;
  className?: string;
}

const DateInput: FC<IProps> = ({  field, form, extra_on_change,  className, ...props }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");  


  useEffect(() => {
    if (field.value) {
      setDay(moment(field.value).format("DD"));
      setMonth(moment(field.value).format("MM"));
      setYear(moment(field.value).format("YYYY"));
    }
  }, [field.value]);




  const guardarFecha = (fecha: any) => {
    setOpenDatePicker(false);
    setDay(moment(fecha).format("DD"));
    setMonth(moment(fecha).format("MM"));
    setYear(moment(fecha).format("YYYY"));
    form.setFieldValue(field.name, moment(fecha).format("YYYY-MM-DD"), false);
    extra_on_change && extra_on_change(moment(fecha).format("YYYY-MM-DD"), field.value);
  };
  return (
    <>
      <div className="row g-2">
        <div className="col-3 text-center">
          <div
            className={['form-control', className].join(' ')}
            style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
          >
            <span style={{lineHeight: '25px'}}> {day || "DD"}</span>
          </div>
        </div>
        <div className="col-3 text-center">
          <div
            className={['form-control', className].join(' ')}
            style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
          >
           
            <span style={{lineHeight: '25px'}}> {month || "MM"}</span>
          </div>
        </div>
        <div className="col-4 text-center">
          <div
            className={['form-control', className].join(' ')}
            style={{ borderRadius: "6px", height: '38px', color: "#ABAFB3" }}
          >
            <span  style={{lineHeight: '25px'}}>{year || "AAAA"}</span>
          </div>
        </div>
        <div className="col-1">
          <DatePicker
            style={{
              paddingLeft: 0,
              cursor: "pointer",
              lineHeight: '25px'
            }}
            className="font-size-20px font-color-1FAEEF datepicker-hidden"
            suffixIcon={
              <img style={{ cursor: "pointer" }} src={inputCalendar} />
            }
            clearIcon={false}
            onClick={() => setOpenDatePicker(true)}
            onBlur={() => setOpenDatePicker(false)}
            bordered={false}
            open={openDatePicker}
            onChange={guardarFecha}
            {...props}
          />
        </div>
      </div>
    </>
  );
};

export default DateInput;
