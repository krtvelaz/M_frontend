import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { trash } from '../../../../utils/assets/img';
import { ModalDetailDocument, swal_error, Table } from '../../../../utils/ui';
import { IGalleryInfo, IGeneralInfo, IPublicationInfo } from "../custom_types";
import ModalEditGallery from "./ModalEditGallery";


interface IGalleryProps {
  images: IGalleryInfo[];
  onEdit: (values: IGalleryInfo, index: number) => any;
  onDelete: (index: number) => any;
}

const ListGallery: FC<IGalleryProps> = ({ images, onEdit, onDelete }) => {
  
    
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
          dataIndex: "image",
          align: "center" as "center",
          render: (value: File) => {
            // return <ModalDetailDocument document={value}/>;
          },
        },
        {
          title: <span style={{ fontSize: "9px" }}>Editar</span>,
          fixed: "right",
          align: "center" as "center",
          render: (values:  IGalleryInfo, data: any, index: number) => {
            return  <ModalEditGallery onSubmit={(publication) => onEdit(publication, index)}  gallery={values} />;
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
                    confirmButtonText: "Sí, eliminar",
                    denyButtonText: `Cancelar`,
                  });
                  if(result.isConfirmed){                          
                    onDelete(index)
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
