import { Tabs } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal_error } from '../../../utils/ui';
import { swal_success } from '../../../utils/ui/swalAlert';
import { IGalleryInfo, IGeneralInfo, IPublication, IPublicationInfo } from '../custom_types';
import { actions } from '../redux';
import AddGallery from './AddGallery';
import GeneralInformation from './GeneralInformation';

interface ITagsPublication {
    type: 'create' | 'edit';
    publication_data?: IPublication;
}

const PublicationFormTags: FC<ITagsPublication> = ({ type, publication_data }) => {
    const { TabPane } = Tabs;
    let [
        active_key,
        publication,
        steps,
        max,
        show_next,
        next_tab,
        goBack,
        execute_save,
        callback,
        setPublication,
    ] = useInit(type, publication_data, ); // agregar o no  el publication_data y type

    const loading = useSelector((store: any) => store.publication.publication.loading);


    return (
        <>
            <div className="h-100 d-flex flex-column">
                <div className="flex-fill overflow-auto">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-white d-flex flex-row pt-3 ps-4">
                            <span style={{ fontSize: '14px', fontFamily: 'Montserrat-SemiBold' }}>
                                {type === 'create' ? 'Nueva publicación' : 'Editar publicación'}
                            </span>
                        </div>
                        <div className="">
                            <Tabs
                                activeKey={active_key}
                                className="w-100 h-100"
                                onChange={callback}
                                tabBarStyle={{
                                    background: '#fff',
                                    paddingLeft: '20px',
                                    fontSize: '13px',
                                    marginBottom: 0,
                                }}
                            >
                                <TabPane tab="Información general" key="1">
                                    <GeneralInformation
                                        innerRef={steps[0].ref}
                                        onSubmit={steps[0].onSave}
                                        publication={publication}
                                    />
                                </TabPane>
                                <TabPane tab="Agregar Galería" key="2" disabled={max < 1}>
                                    <AddGallery
                                        images={publication.gallery}
                                        setImages={setPublication}
                                        publication={publication}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white d-flex flex-row justify-content-between  btn-responsive"
                    style={{ padding: 16, marginBottom: 60, borderTop: '1px solid #ccc' }}
                >
                    <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                        Atrás
                    </button>
                    <div className="flex-fill" />
                    {show_next && (
                        <button
                            type="button"
                            className="btn btn-outline-primary me-3"
                            onClick={() => {next_tab(false)}}
                            disabled={loading}
                        >
                            Guardar y continuar
                            {loading && (
                                <i
                                    className="fa fa-circle-o-notch fa-spin"
                                    style={{ fontSize: 12, marginLeft: 10, color: '#1D98D1' }}
                                />
                            )}
                        </button>
                    )}
                    {(publication.general_information.id || type === 'edit') && show_next && (
                        <button
                            type="button"
                            className="btn btn-primary me-3"
                            onClick={async() => {
                                next_tab(true);
                            }}
                        >
                            Continuar
                        </button>
                    )}
                    {!show_next && (
                        <button type="button" className="btn btn-primary" onClick={execute_save}>
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

const useInit = (
    type: 'create' | 'edit',
    publication_data?: IPublication,
): [string, any, any[], number, boolean, (edit?: boolean) => any, () => void, () => void, (key: string) => void, any, ] => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as {
        active_key_docs: Location;
        active_key: Location;
        publication: IPublication;
        max: number;
    };

    const active_key: any = state?.active_key || '1';
    const ls = state;

    const initial_values: IPublication = {
        general_information: {
            pub_title: '',
            pub_description: '',
            pub_author: '',
            ...publication_data,
        },
        gallery: [],
    };

    const [publication, setPublication] = useState<IPublication>(ls?.publication ? ls.publication : initial_values);
    const [max, set_max] = useState<number>(state?.max || 1);
    const [is_saving, set_is_saving] = useState<boolean>(false);
    const [go_next, set_go_next] = useState<string>('');

    const steps = [
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async (back: boolean) => {
                set_is_saving(true);
                
                await steps[0].ref.current?.submitForm();
            },
            onSave: async (values: IGeneralInfo) => {
                if (!publication.general_information?.id && type === 'create') {
                    const result = await dispatch(actions.create_publication(values));
                    setPublication((data: IPublication) => {
                        return {
                            ...data,
                            general_information: {
                                ... result,
                                pub_imagen: values.pub_imagen,
                                pub_type: values.pub_type,

                            }
                        };
                    });
                } else {
                    
                    const result = await dispatch(actions.edit_publication(values));                    
                    setPublication((data: IPublication) => {
                        return {
                            ...data,
                            general_information: {
                                ...result,
                                pub_imagen: values.pub_imagen,
                                pub_type: values.pub_type,
                            },
                        };
                    });
                }

                set_is_saving(false);
            },
        },
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async (back: boolean, is_finish = false) => {
                if (back) {
                    set_is_saving(false);
                    return;
                }
                if (is_finish) {
                    await swal_success.fire({
                        title: 'Creación exitosa',
                        html:
                            '<div class="mysubtitle">¡Finalizó la creación del hecho noticioso!</div>' +
                            '<div class="mytext">Se ha guardado la información correctamente.</div>',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                    });
                    navigate('/publication/list');
                    return;
                }
                set_is_saving(true);
                await steps[1].ref.current?.submitForm();
            },
            onSave: async (values: IGalleryInfo) => {
                set_is_saving(false);
                if (publication.gallery.length >= 3) {
                    await swal_error.fire({
                        title: 'Ha llegado al máximo de elementos',
                        html:
                            '<div class="mysubtitle">Máximo de 3 fotos</div>' +
                            '<div class="mytext">Se debe eliminar alguno para que se pueda publicar uno nuevo.</div>',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                    });
                    return;
                }
                setPublication({
                    ...publication,
                    gallery: [...publication.gallery], //[...publication.gallery, values]
                });
            },
        },
    ];
    const limit = 2;
    const show_next = parseInt(active_key) < limit;
    const next_tab = (edit?: boolean) => {
        const next = parseInt(active_key) + 1;
        if (next <= limit) {
            if(edit) {
                set_go_next(`${next}`);
                set_is_saving(false);
                return;
            }
            callback(`${next}`);
        }
    };
    const prev_tab = () => {
        const key = parseInt(active_key);
        const prev = key - 1;
        const back = true;
        if (prev > 0) {
            callback(`${prev}`, back);
        }
    };

    const callback = (key: string, back = false) => {
        const int_key = parseInt(active_key);
        const save = steps[int_key - 1]?.save;
       
        save &&
            save(back).then(() => {
                set_go_next(key);
            });
    };

    const goBack = () => {
        if (active_key === '1') {
            navigate('/publication/list');
        } else {
            prev_tab();
        }
    };

    const execute_save = async () => {
        await steps[limit - 1].save(false, true);
    };

    useEffect(() => {
        
        if (!is_saving && go_next) {
            const key = parseInt(go_next);
            if (key > max) {
                set_max(key);
            }
            navigate(location.pathname, {
                state: {
                    active_key: go_next,
                    publication,
                    max,
                },
            });
            set_go_next('');
            console.groupEnd();
        }
    }, [is_saving, go_next]);

    useEffect(() => {
        if (publication_data) {
            setPublication((data: any) => {
                return {
                    ...data,
                    general_information: publication_data,
                };
            });
        }
    }, [publication_data]);

    return [
        active_key,
        publication,
        steps,
        max,
        show_next,
        next_tab,
        goBack,
        execute_save,
        callback,
        setPublication,
    ];
};

export default PublicationFormTags;
