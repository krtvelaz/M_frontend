import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../../utils/ui";
import { IGalleryInfo, IGeneralInfo, IPublication, IPublicationInfo } from "../custom_types";
import { actions } from "../redux";
import FormGallery from "./FormGallery";
import FormPublication from "./FormPublication";
import ListGallery from "./ListGallery";
interface IGalleryProps {
  innerRef: any;
  onSubmit: (values: any) => void;
  images: IGalleryInfo[];
  setImages: any;
  publication: IPublication;
}

const AddGallery: FC<IGalleryProps> = ({
  onSubmit,
  innerRef,
  images,
  setImages,
  publication,
}) => {
  

  const dispatch = useDispatch<any>();

  useEffect(() => {
    get_list_gallery();
  }, []);

  const list_gallery: IGalleryInfo[] = useSelector(
    (store: any) => store.event.list_gallery.value
  );
  

  const get_list_gallery = async () => {
    await dispatch(actions.get_list_gallery(publication?.general_information?.id || -1));
  };
  
  const editImage = (values: IGalleryInfo, index: number) => {
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
              <div
                className="d-flex justify-content-end"
                style={{ padding: "20px" }}
              >
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
             <FormGallery
            innerRef={innerRef}
            onSubmit={onSubmit}
            />
           
          </Card>
          {list_gallery.length > 0 && (
            <Card>
              <h4>Elementos agregados</h4>
              <ListGallery
                images={list_gallery}
                onEdit={editImage}
                onDelete={deleteImage}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
