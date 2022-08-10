import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { trash, watch } from '../../../../utils/assets/img';
import { ModalDetailDocument, swal_error, Table } from '../../../../utils/ui';
import { IGalleryInfo, IGeneralInfo, IPublication, IPublicationInfo } from "../custom_types";
import { actions } from '../redux';
import ModalEditGallery from "./ModalEditGallery";


interface IGalleryProps {
  images: IGalleryInfo[];
  onEdit: (values: IGalleryInfo) => any;
  onDelete: (id: number) => any;
  publication: IPublication;

}

const ListGallery: FC<IGalleryProps> = ({ images, onEdit, onDelete,publication }) => {
  const [is_visibleDoc, set_is_visible_doc] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const dispatch = useDispatch<any>();
    
  const table_columns = [
    {
      title: 'No.',
      align: 'center' as 'center',
      render: (data: any, values: any, i: number) => {
        return i + 1;
      },
  },
  {
      title: 'Título',
      dataIndex: 'gal_titulo',
      align: 'left' as 'left',
  },
  {
      title: 'Descripción',
      dataIndex: 'gal_descripcion',
      align: 'left' as 'left',
  },
  {
      title: 'Imagen',
      dataIndex: 'gal_nombre_imagen',
      responsive: ['md'],
      align: 'left' as 'left',
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
            // return <ModalDetailDocument document={value}/>;
            return (
              <>
                <img
                  src={watch}
                  id='watch-image'
                  className="img-fluid"
                  onMouseOver={(e)=>{
                    let element = document.getElementById('Trazado_23');
                    // e.currentTarget = 'red'
                    
                    if(element !== null) {
                      // element.style.color = 'red !important';
                    }
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    const res = await dispatch(actions.get_gallery_by_id(id || -1));
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
          render: (values:  IGalleryInfo, data: any, index: number) => {
            return  <ModalEditGallery onSubmit={(publication) => onEdit(publication)}  gallery={values} />;
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Eliminar</span>,
          dataIndex: "id",
          fixed: "right",
          align: "center" as "center",
          render: ( id: number) => {
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
                    confirmButtonText: "Sí, eliminar",
                    denyButtonText: `Cancelar`,
                  });
                  if(result.isConfirmed){                          
                    onDelete(id)
                  }
                }}
              />
            );
          },
        },
      ],
    },
  ]
  return (
   <Table columns={table_columns} items={images} with_pagination={false}/>
  )
}

export default ListGallery
