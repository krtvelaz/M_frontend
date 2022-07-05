import { DatePicker, Form } from "antd";
import { FieldProps } from "formik";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { inputCalendar } from "../assets/img";

interface IProps extends FieldProps {
  dia?: string;
  mes?: string;
  anio?: string;
  extra_on_change?: (value: any, prev_value?: any) => void;
}

const DateInput: FC<IProps> = ({  field, form, extra_on_change, dia, mes, anio }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");


  useEffect(() => {
    if (dia || dia === "") {
      setDay(dia);
    }
  }, [dia]);

  useEffect(() => {
    if (mes || mes === "") {
      setMonth(mes);
    }
  }, [mes]);

  useEffect(() => {
    if (anio || anio === "") {
      setYear(anio);
    }
  }, [anio]);

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
        <div className="col-3">
          <div
            className="form-control"
            style={{ borderRadius: "4px", color: "#ABAFB3" }}
          >
            <span style={{fontSize: '14px'}}> {day || "DD"}</span>
          </div>
        </div>
        <div className="col-3">
          <div
            className="form-control"
            style={{ borderRadius: "4px", color: "#ABAFB3" }}
          >
           
            <span style={{fontSize: '14px'}}> {month || "MM"}</span>
          </div>
        </div>
        <div className="col-4">
          <div
            className="form-control"
            style={{ borderRadius: "4px", color: "#ABAFB3" }}
          >
            <span style={{fontSize: '14px'}}>{year || "AAAA"}</span>
          </div>
        </div>
        <div className="col-1">
          <DatePicker
            style={{
              paddingLeft: 0,
              cursor: "pointer",
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
          />
        </div>
      </div>
    </>
  );
};

export default DateInput;
