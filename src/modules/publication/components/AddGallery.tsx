import { FormikProps, FormikValues } from "formik";
import { FC, useRef } from "react";
import { Card } from "../../../utils/ui";
import { IPublication, IPublicationInfo } from "../custom_types";
import FormPublication from "./FormPublication";
import ListGallery from "./ListGallery";

interface IGalleryProps {
  innerRef: any;
  onSubmit: (values: any) => void;
  images: IPublicationInfo[];
  setImages: any;
}

const AddGallery: FC<IGalleryProps> = ({
  onSubmit,
  innerRef,
  images,
  setImages,
}) => {
  const editImage = (values: IPublicationInfo, index: number) => {
    setImages((data: IPublication) => {
      data.gallery[index] = values;
      return {
        ...data,
      };
    });
  };
  const deleteImage = (index: number) => {
    const newImages = images.filter((img, i) => i !== index);
    setImages((data: IPublication) => {
      return {
        ...data,
        gallery: newImages,
      };
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card
            title="Agregar elementos"
            actions={[
              <div className="d-flex justify-content-end pe-4 ps-4">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    innerRef.current?.submitForm();
                  }}
                >
                  Agregar documento
                </button>
              </div>,
            ]}
          >
            <FormPublication
              type="gallery"
              innerRef={innerRef}
              onSubmit={onSubmit}
            />
          </Card>
          <Card>
            <h4>Elementos agregados</h4>
            <ListGallery
              images={images}
              onEdit={editImage}
              onDelete={deleteImage}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
