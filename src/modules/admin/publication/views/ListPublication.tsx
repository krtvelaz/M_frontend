import { Popover, Radio } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pencil, trash } from "../../../../utils/assets/img";
import { Card, Link, swal_error, Table } from "../../../../utils/ui";
import { IGeneralInfo } from "../custom_types";
import { actions } from "../redux";

const ListPublication = () => {
  const list_publication: IGeneralInfo[] = useSelector(
    (store: any) => store.event.list_publication.value
  );
  const [isChange, setIsChange] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const onDelete = async (id: number) => {
    await dispatch(actions.delete_publication(id));
    setIsChange(true);
  };
  const get_publications = async () => {
    await dispatch(actions.get_list_publications({}));
  };
  useEffect(() => {
    get_publications();
  }, []);

  useEffect(() => {
    if (isChange) {
      get_publications();
      setIsChange(false);
    }
  }, [isChange]);
  const table_columns: any = [
    {
      title: "No.",
      fixed: "left",
      align: "center" as "center",
      render: (data: IGeneralInfo, values: any, i: number) => {
        return i + 1;
      },
    },
    {
      title: "Nombre",
      dataIndex: "hec_titulo",
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
      dataIndex: "hec_id_tipo_publicacion",
      align: "left" as "left",
    },
    {
      title: "Publicada",
      // dataIndex: "hec_publicada",
      align: "left" as "left",
      render: (data: IGeneralInfo) => {
        const onChange = async (e: any) => {
           await dispatch(actions.edit_published_publication(data, e?.target?.value));
          // console.log(data, e?.target?.value)
          
          };
        return (
          <Radio.Group onChange={onChange} value={data.hec_publicada}>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
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
                to={`/publication/edit/${id}/`}
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
          dataIndex: "id",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <img
                src={trash}
                className="img-fluid"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  const result = await swal_error.fire({
                    title: "Eliminar elemento",
                    html:
                      '<div class="mysubtitle">Se eliminará el elemento seleccionado</div>' +
                      '<div class="mytext">¿Está seguro que desea eliminarlo?</div>',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: "Sí, eliminar",
                    denyButtonText: `Cancelar`,
                  });
                  if (result.isConfirmed) {
                    onDelete(id);
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
              Gestionar publicaciones
            </h5>
            <div
              style={{
                margin: "0 20px 10px 0",
              }}
              className="col d-flex justify-content-end"
            >
              <Link to="/publication/create" name="Crear Publicación" iconText="+" />
            </div>
          </div>

          <Card>
            <h4>Lista de publicaciones</h4>
            <Table
              columns={table_columns}
              items={list_publication}
            // title="Lista de retos"
            // items={[
            //   {
            //     id: 1,
            //     challenge_name:
            //       "¿Cómo mejorar la conectividad en los corregimientos de Medellín? WorkSans 12px _ Regular Título o contenido Título o contenido, xxxxxxxxx. Título o contenido Título o contenido, xxxxxxxxx. Título o texto 12 contenido Título o contenido, xx xxxx xx x. Título o contenido Título o ccc c contenido, xxxxxxxxx.",
            //     audit_trail: "karen Nova",
            //     is_published: "Si",
            //     start_date: "07 / 07 / 2022",
            //     closing_date: "08 / 07 / 2022",
            //   },
            // ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListPublication;
