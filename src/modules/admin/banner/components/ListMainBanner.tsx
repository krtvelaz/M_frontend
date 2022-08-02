import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { trash, watch } from "../../../../utils/assets/img";
import { swal_error, Table } from "../../../../utils/ui";
import ModalDetailDocument from "../../../../utils/ui/ModalDetailDocument";
import { IMainBanner } from "../custom_types";
import { actions } from "../redux";
import ModalEditMainBanner from "./ModalEditMainBanner";
import { Buffer } from 'buffer/'

interface BannerFormPros {
  data: IMainBanner[];
  onSubmit: (values: IMainBanner, index: number) => any;
  onDelete: (id: number) => any;
}

const ListMainBanner: FC<BannerFormPros> = ({ data, onSubmit, onDelete }) => {
  const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const dispatch = useDispatch<any>();

  const table_columns: any = [
    {
      title: 'No.',
      dataIndex: 'id',
      align: 'center' as 'center',
      render: (data: IMainBanner, values: any, i: number) => {
        return i + 1;
      },
    },
    {
      title: 'Título',
      dataIndex: 'car_titulo',
      align: 'left' as 'left',
    },
    {
      title: 'Descripción',
      dataIndex: 'car_descripcion',
      align: 'left' as 'left',
    },
    {
      title: 'Imagen',
      dataIndex: 'car_nombre_imagen',
      responsive: ['md'],
      align: 'left' as 'left',
      render: (value: File) => {
        return value;
      },
    },
    {
      title: "Acciones",
      fixed: "right",
      children: [
        {
          title: <span style={{ fontSize: "9px" }}>Ver</span>,
          fixed: "right",
          dataIndex: "id",
          align: "center" as "center",
          render: (id: number) => {
            return (
              <>
                <img
                  src={watch}
                  className="img-fluid"
                  alt=""
                  style={{ cursor: "pointer", color: 'red' }}
                  onClick={async () => {
                    const res = await dispatch(actions.get_image_banner(id));
                    if (res) {
                      let _img = Buffer.from(res).toString("base64");

                      setUrl(_img);
                      set_is_visible_doc(true);
                    }
                  }}
                />
                <ModalDetailDocument
                  open={is_visibleDoc}
                  setOpen={set_is_visible_doc}
                  url={url}
                  fileType='img'
                />
              </>
            )
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Editar</span>,
          fixed: "right",
          align: "center" as "center",
          render: (values: IMainBanner, data: any, id: number) => {
            return <ModalEditMainBanner data_image={values} onSubmit={(value) => onSubmit(value, id)} />;
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
          dataIndex: "id",
          fixed: "right",
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
                    confirmButtonText: "Aceptar",
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
    <Table
      columns={table_columns}
      items={data}
      with_pagination={false}
    />
  );
};

export default ListMainBanner;
