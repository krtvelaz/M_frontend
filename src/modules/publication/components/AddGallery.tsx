import { FormikProps, FormikValues } from "formik";
import { FC, useRef } from "react";
import { Card } from "../../../utils/ui";
import { IPublicationInfo } from "../custom_types";
import FormPublication from "./FormPublication";
import ListPostulation from "./ListPostulation";

interface IGalleryProps {
  onSubmit: (values: any) => void;
  images: IPublicationInfo[];
}

const AddGallery: FC<IGalleryProps>= ({ onSubmit, images}) => {
  const form_ref = useRef<FormikProps<FormikValues>>();


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card title="Agregar elementos" actions={[
             <div className="d-flex justify-content-end pe-4 ps-4">
             <button
               type="button"
               className="btn btn-outline-primary"
               onClick={() => {
                 form_ref.current?.submitForm();
               }}
             >
               Agregar documento
             </button>
           </div>,
          ]}>
            <FormPublication
              type="gallery"
              innerRef={form_ref}
              onSubmit={onSubmit}
            />
          </Card>
          <Card>
            <h4>Elementos agregados</h4>
            <ListPostulation images={images} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
