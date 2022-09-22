import { FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../utils/ui";
import FormMainBanner from "../components/banner/FormMainBanner";
import ListMainBanner from "../components/banner/ListMainBanner";
import { IMainBanner } from "../custom_types";
import { actions } from "../redux";


const CreateMainBanner = () => {
  const list_banners: IMainBanner[] = useSelector((store: any) => store.banner.list_banners.value);
  const loading_banners: boolean = useSelector((store: any) => store.banner.list_banners.loading);
  const loading: boolean = useSelector((store: any) => store.banner.banner.loading);

  const form_ref = useRef<FormikProps<FormikValues>>();
  const dispatch = useDispatch<any>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const addImage = async (value: IMainBanner) => {
    await dispatch(actions.create_main_banner({...value, ban_order: list_banners.length+1}));
    setIsSuccess(true);
  };

  const editBanner = async(values: IMainBanner) => {
    await dispatch(actions.edit_banner(values ));
    setIsSuccess(true);
  };

  const deleteImage = async (id: number) => {
    await dispatch(actions.delete_banner(id));
    setIsSuccess(true);
  
  };

  const get_banners = async () => {
    await dispatch(actions.get_list_banners({page: 1, page_size: 4, order_by_key: 'ban_order', order_by_value: 'asc'}));
  };

  useEffect(() => {
    get_banners();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      get_banners();
      setIsSuccess(false);
    }
  }, [isSuccess]);
  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-fill overflow-auto">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="d-flex flex-row mb-3">
              <h5>Carrusel principal</h5>
            </div>
            <div className="col-md-12">
              <Card
                title="Agregar elemento"
                actions={[
                  <div
                    className="d-flex justify-content-end"
                    style={{ padding: "20px" }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        form_ref.current?.submitForm()
                      }}
                      disabled={loading}
                    >
                      Agregar
                      {loading && (
                        <i
                        className="fa fa-circle-o-notch fa-spin"
                        style={{fontSize: 12, marginLeft: 10, color: "#1D98D1"}}
                        />
                      )}
                    </button>
                  </div>,
                ]}
              >
                <FormMainBanner innerRef={form_ref} onSubmit={addImage} type='create' />
              </Card>
              {list_banners?.length > 0 && (
                <Card>
                  <h4>Elementos agregados</h4>
                  <ListMainBanner
                  loading={loading_banners}
                    banners={list_banners}
                    onEdit={editBanner}
                    onDelete={deleteImage}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMainBanner;
