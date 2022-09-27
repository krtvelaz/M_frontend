import { FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../../utils/ui';
import { IGalleryInfo, IPublication } from '../custom_types';
import { actions } from '../redux';
import FormGallery from './FormGallery';
import ListGallery from './ListGallery';
interface IGalleryProps {
    images: IGalleryInfo[];
    setImages: any;
    publication: IPublication;
}

const AddGallery: FC<IGalleryProps> = ({ publication }) => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [isChange, setIsChange] = useState<boolean>(false);
    const loading = useSelector((store: any) => store.publication.gallery.loading);
    const dispatch = useDispatch<any>();

    const list_gallery: IGalleryInfo[] = useSelector((store: any) => store.publication.list_gallery.value);

    const get_list_gallery = async () => {
        await dispatch(actions.get_list_gallery({ publication_id: publication?.general_information?.id || -1}));
    };
    const editImage = async (values: IGalleryInfo) => {
        await dispatch(actions.edit_gallery(values));
        setIsChange(true);
    };

    const addImage = async (values: IGalleryInfo) => {
        const result = await dispatch(actions.create_gallery(publication?.general_information?.id || -1, values));
        setIsChange(true);
    };

    const deleteImage = async (id: number) => {
        await dispatch(actions.delete_gallery(id));
        setIsChange(true);
    };
    useEffect(() => {
        get_list_gallery();
    }, []);

    useEffect(() => {
        if (isChange) {
            get_list_gallery();
            setIsChange(false);
        }
    }, [isChange]);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <Card
                        title="Agregar elementos"
                        actions={[
                            <div className="d-flex justify-content-end" style={{ padding: '20px' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    disabled={loading}
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                >
                                    Agregar documento
                                    {loading && (
                                        <i
                                            className="fa fa-circle-o-notch fa-spin"
                                            style={{ fontSize: 12, marginLeft: 10, color: '#1D98D1' }}
                                        />
                                    )}
                                </button>
                            </div>,
                        ]}
                    >
                        <FormGallery innerRef={form_ref} onSubmit={addImage} />
                    </Card>
                    {list_gallery.length > 0 && (
                        <Card>
                            <h4>Elementos agregados</h4>
                            <ListGallery
                                images={list_gallery}
                                // addImage={addImage}
                                onEdit={editImage}
                                onDelete={deleteImage}
                                publication={publication}
                            />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddGallery;
