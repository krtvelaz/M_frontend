import { DatePicker, Form } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { inputCalendar } from "../assets/img";

interface IProps {
  save?: any;
  dia?: string;
  mes?: string;
  anio?: string;
}

const DateInput: FC<IProps> = ({ save, dia, mes, anio }) => {
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
    save(moment(fecha).format("YYYY-MM-DD"));
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
