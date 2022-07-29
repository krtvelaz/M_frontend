import { Popover, Radio } from 'antd';
import { pencil, trash } from '../../../../utils/assets/img';
import { Card, Link, swal_error, Table } from "../../../../utils/ui";


const ListEvent = () => {
    const table_columns: any = [
        {
          title: "No.",
          fixed: "left",
          dataIndex: "id",
          align: "center" as "center",
        },
        {
          title: "Nombre",
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
          title: "Tipo",
          dataIndex: "audit_trail",
          align: "left" as "left",
        },
        {
          title: "Publicada",
          dataIndex: "is_published",
          align: "left" as "left",
          render: (value: string) => {
            const onChange = (e: any) => {
              // llamar editar publicacion
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
          title: "Creado por",
          dataIndex: "start_date",
          align: "left" as "left",
        },
        {
          title: "Acciones",
          fixed: "right",
          children: [
            {
              title: <span style={{ fontSize: "9px" }}>Editar</span>,
              dataIndex: "id",
              fixed: "right",
              align: "center" as "center",
              render: (id: string) => {
                return (
                  <Link
                    to={`/event/create/${id}/`}
                    name=""
                    avatar={false}
                    icon={
                      <img
                        src={pencil}
                        style={{ cursor: "pointer" }}
                        className="img-pencil"
                        alt=""
                      />
                    }
                  />
                );
              },
            },
            {
              title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
              fixed: "right",
              align: "center" as "center",
              render: (data: any, values: any, index: number) => {
                return (
                  <img
                    src={trash}
                    className="img-fluid"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                    const result =  await swal_error.fire({
                        title: "Eliminar elemento",
                        html:
                          '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                          '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                        showCancelButton: false,
                        showDenyButton: true,
                        confirmButtonText: "Aceptar",
                        denyButtonText: `Cancelar`,
                      });
                      if(result.isConfirmed){
                      }
                    }}
                  />
                );
              },
            },
          ],
        },
      ];
  return (
    <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="row">
          <h5 className="col d-flex justify-content-start">
            Gestionar eventos
          </h5>
          {/* <div
            style={{
              margin: "0 20px 10px 0",
            }}
            className="col d-flex justify-content-end"
          >
            <Link to="/publication/create" name="Crear Publicación" iconText="+" />
          </div> */}
        </div>

        <Card>
          <h4>Lista de eventos</h4>
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
  )
}

export default ListEvent