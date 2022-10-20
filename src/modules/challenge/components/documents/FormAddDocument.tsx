import { Field, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { DocumentInput, ErrorMessage, Select } from '../../../../utils/ui';
import { IChallenge, IDocument, IMasters } from '../../custom_types';
import { actions } from '../../redux';

interface DocsFormPros {
    disabled?: boolean;
    type: 'create' | 'edit';
    typeDoc?: 'general' | 'admin' | 'technicians' | '';
    innerRef: any;
    doc?: IDocument;
    onSubmit: (values: IDocument) => void;
    typesDocument: any[];
    challenge?: IChallenge;
}

const FormAddDocument: FC<DocsFormPros> = ({
    disabled,
    type,
    typeDoc,
    innerRef,
    doc,
    onSubmit,
    typesDocument,
    challenge,
}) => {
    const dispatch = useDispatch<any>();
    const [profiles, setProfiles] = useState<any>([]);
    const [type_document, set_type_document] = useState<number | null>();
    useEffect(() => {
        if (typeDoc) {
            if (doc?.chafil_document_type?.profile) {
                dispatch(actions.get_types_documents(typeDoc, doc?.chafil_document_type?.profile?.id));
            } else {
                dispatch(actions.get_types_documents(typeDoc));
            }
        }
    }, []);

    useEffect(() => {
        const profiles = [
            { name: 'Persona jurídica', id: 1 },
            { name: 'Grupo de investigación', id: 2 },
            { name: 'Equipo de innovadores', id: 3 },
        ];

        if (challenge?.general_information.cha_profiles) {
            const arraysFilter: any = challenge?.general_information.cha_profiles?.map((profile: number) => {
                const newProfiles = profiles.find((x: any) => profile === x.id);
                return newProfiles;
            });

            setProfiles(arraysFilter);
        } else {
            setProfiles(profiles);
        }
    }, [challenge?.general_information.cha_profiles]);

    const initialValues = {
        chafil_id_tipo_documento: '',
        chafil_nombre_tipo_documento: '',
        chafil_perfiles: '',
        chafil_plantilla: {
            name: doc?.chafil_nombre_plantilla || '',
            id: doc?.id || -1,
        },
        ...doc,
        ...(doc && {
            // chafil_id_tipo_documento: doc?.chafil_id_tipo_documento,
            chafil_perfiles: Number(doc?.chafil_document_type.profile?.id) || '',
        }),
    };

    const schema = Yup.object().shape({
        chafil_id_tipo_documento: Yup.number().nullable().required('Campo obligatorio'),
        ...(type_document && {
            chafil_nombre_tipo_documento: Yup.string().required('Campo obligatorio'),
        }),
        ...(typeDoc &&
            typeDoc !== 'general' && {
                chafil_perfiles: Yup.string().nullable().required('Campo obligatorio'),
            }),
        ...(typeDoc !== 'technicians' &&
            typeDoc !== 'admin' && {
                chafil_plantilla: Yup.object({
                    name: Yup.string().required('Campo obligatorio'),
                }).nullable(),
            }),
    });

    const submit = async (values: any, actions: any) => {
        await onSubmit(values);
        actions.setSubmitting(false);
        if (type === 'create') {
            actions.resetForm();
        }
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange, values, setFieldValue, errors }) => {
                
                return (
                    <Form>
                        <div className="row">
                            {typeDoc && typeDoc !== 'general' && (
                                <div className="col-12 col-md-3 col-lg-3">
                                    <label htmlFor="ret_perfiles_id" className="form-label">
                                        Perfil
                                    </label>
                                    <Field
                                        component={Select}
                                        id="ret_perfiles_id"
                                        name="chafil_perfiles"
                                        dropdownMatchSelectWidth={false}
                                        options={profiles}
                                        placeholder="Seleccionar…"
                                        extra_on_change={(value: number) => {
                                            if (typeDoc) {
                                                setFieldValue('chafil_id_tipo_documento', null, false);
                                                dispatch(actions.get_types_documents(typeDoc, value));
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="chafil_perfiles" />
                                </div>
                            )}
                            <div className={`col-12 col-md-${typeDoc && typeDoc !== 'general' ? 3 : 6} `}>
                                <label htmlFor="ret_tipo_documento_id" className="form-label">
                                    Tipo de documento
                                </label>
                                <Field
                                    component={Select}
                                    id="ret_tipo_documento_id"
                                    name="chafil_id_tipo_documento"
                                    // dropdownMatchSelectWidth={false}
                                    className=""
                                    disabled={!values.chafil_perfiles && typeDoc !== 'general' && typeDoc}
                                    options={typesDocument?.map((d) => ({
                                        id: d?.id,
                                        name: d?.rettipdoc_nombre,
                                    }))}
                                    placeholder="Seleccionar…"
                                    extra_on_change={(value: number) => {
                                        if (
                                            value === 47 ||
                                            value === 48 ||
                                            value === 49 ||
                                            value === 50 ||
                                            value === 51 ||
                                            value === 52
                                        ) {
                                            set_type_document(value);
                                        } else {
                                            set_type_document(null);
                                        }
                                    }}
                                />
                                <ErrorMessage name="chafil_id_tipo_documento" />
                            </div>

                            {(values.chafil_id_tipo_documento === 47 ||
                                values.chafil_id_tipo_documento === 48 ||
                                values.chafil_id_tipo_documento === 49 ||
                                values.chafil_id_tipo_documento === 50 ||
                                values.chafil_id_tipo_documento === 51 ||
                                values.chafil_id_tipo_documento === 52) && (
                                <div className="col-12 col-md-6 col-lg-6">
                                    <label htmlFor="ret_nombre_documento_id" className="form-label">
                                        Nombre
                                    </label>
                                    <Field
                                        type="text"
                                        id="ret_nombre_documento_id"
                                        name="chafil_nombre_tipo_documento"
                                        className="form-control"
                                        aria-describedby="nombre del documento"
                                        autoComplete="off"
                                        maxLength={80}
                                        onChange={(e: any) => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = new RegExp(
                                                /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                            );
                                            if (regex.test(value.toString())) {
                                                handleChange(e);
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="chafil_nombre_tipo_documento" withCount max={80} />
                                </div>
                            )}

                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_plantilla_id" className="form-label">
                                    <>
                                        Adjuntar plantilla{' '}
                                        {typeDoc && typeDoc !== 'general' && (
                                            <span style={{ fontSize: '10px' }}> - Opcional </span>
                                        )}
                                    </>
                                </label>
                                <Field
                                    component={DocumentInput}
                                    tipos_doc="PDF."
                                    maximum_size={5}
                                    type="text"
                                    id="ret_plantilla_id"
                                    name="chafil_plantilla"
                                    className="form-control"
                                    placeholder="Seleccionar…"
                                />
                                {errors?.chafil_plantilla && 
                                
                                <ErrorMessage name="chafil_plantilla.name" />
                                }
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormAddDocument;
