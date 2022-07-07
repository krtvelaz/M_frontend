import { Popover, Radio } from "antd";
import { Card, Link, Table } from "../../../utils/ui";

const ListChallenge = () => {
  const table_columns: any = [
    {
      title: "No.",
      fixed: "left",
      dataIndex: "id",
      align: "center" as "center",
    },
    {
      title: "Nombre del reto",
      dataIndex: "challenge_name",
      align: "left" as "left",
      render: (value: string) => {
        return (
          value &&
          (value.length > 65 ? (
            <Popover content={value}>
              <span
                style={{ cursor: "pointer" }}
                className="popover-span"
              >{`${value.substring(0, 64)}...`}</span>
            </Popover>
          ) : (
            value
          ))
        );
      },
    },
    {
      title: "Creado por",
      dataIndex: "audit_trail",
      align: "left" as "left",
    },
    {
      title: "Publicado",
      dataIndex: "is_published",
      align: "left" as "left",
      render: (value: string) => {
        const onChange = (e: any) => {
          console.log("radio checked", e.target.value);
        };
        return (
          <Radio.Group onChange={onChange} value={value}>
            <Radio value="Si">Si</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        );
      },
    },
    {
      title: "Fecha inicio",
      dataIndex: "start_date",
      align: "left" as "left",
    },
    {
      title: "Fecha cierre",
      dataIndex: "closing_date",
      align: "left" as "left",
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: <span style={{ fontSize: "9px" }}>Editar</span>,
          fixed: "right",
          align: "center" as "center",
        },
        {
          title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
          fixed: "right",
          align: "center" as "center",
        },
      ],
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="row">
            <div
              style={{
                fontSize: "14px",
                fontFamily: "Montserrat-SemiBold",
                margin: "0 0 5px 10px",
              }}
              className="col d-flex justify-content-start"
            >
              Gestionar Retos
            </div>
            <div
              style={{
                margin: "0 20px 10px 0",
              }}
              className="col d-flex justify-content-end"
            >
              <Link to="/challenge/create" name="Crear Reto" iconText="+" />
            </div>
          </div>

          <Card>
            <Table
              columns={table_columns}
              // title="Lista de retos"
              items={[
                {
                  id: 1,
                  challenge_name:
                    "¿Cómo mejorar la conectividad en los corregimientos de Medellín? WorkSans 12px _ Regular Título o contenido Título o contenido, xxxxxxxxx. Título o contenido Título o contenido, xxxxxxxxx. Título o texto 12 contenido Título o contenido, xx xxxx xx x. Título o contenido Título o ccc c contenido, xxxxxxxxx.",
                  audit_trail: "karen Nova",
                  is_published: "Si",
                  start_date: "07 / 07 / 2022",
                  closing_date: "08 / 07 / 2022",
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListChallenge;
