import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import { ErrorMessage, Select } from '../../../utils/ui';
import ComponetCard from '../../../utils/ui/Card';
import ModalAddress from '../../challenge/components/ModalAddress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';

interface PostulationFormPros {
    postulation?: IPostulation;
}
const FormPostulation: FC<PostulationFormPros> = ({ postulation }) => {
    const typeDocumentsForm = useSelector((store: any) => store.postulation.documentType.value);
    const typeNumberContact = useSelector((store: any) => store.postulation.numberContact.value);
    const typeProfile = useSelector((store: any) => store.postulation.profile.value);

    const dispatch = useDispatch<any>();

    const initial_values = {
        name: '',
        document_type: null,
        number_document: '',
        type_profiles: null,
        email: '',
        type_contact: null,
        number_contact: '',
        direction: '',
        ...postulation,
    };

    const schema = Yup.object().shape({
        name: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
        document_type: Yup.string().nullable().required('Campo obligatorio'),
        number_document: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        type_profiles: Yup.string().nullable().required('Campo obligatorio'),
        email: Yup.string().email('Correo invalido ejemplo: correo@gmail.com').required('Campo obligatorio'),
        type_contact: Yup.string().nullable().required('Campo obligatorio'),
        number_contact: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        direction: Yup.string().required('Campo obligatorio'),
    });

    const submit = async (values: any, form: any) => {
        await dispatch(
            actions.create_main_postulation({
                pos_id_challenge: 1,
                pos_business_name: values.name,
                pos_contact: values.type_contact,
                pos_number_contact: values.number_contact,
                pos_id_type_competitor: values.type_profiles,
                pos_email: values.email,
                pos_type_document_id: values.document_type,
                pos_documentid: values.number_document,
                pos_address: values.direction,
                pos_id_user: 1,
            })
        );
    };

    const typeDocument = async () => {
        await dispatch(actions.get__document());
    };
    const typeNumContact = async () => {
        await dispatch(actions.get__typeNumberContact());
    };
    const typeProfilePerson = async () => {
        await dispatch(actions.get__profiles());
    };
    useEffect(() => {
        typeDocument();
        typeNumContact();
        typeProfilePerson();
    }, []);

    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initial_values} validationSchema={schema}>
            {({ handleChange, values }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="name_id" className="form-label">
                                    Nombre o razón social
                                </label>
                                <Field
                                    type="text"
                                    id="name_id"
                                    name="name"
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Nombre o razón social"
                                    minLength={3}
                                    maxLength={100}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                                <label className="form-label">
                                    <span
                                        style={{
                                            fontSize: '10px',
                                            fontFamily: 'Montserrat',
                                        }}
                                    >
                                        En caso de eqipo de innovadores elija un responsable y escriba su nombre
                                    </span>
                                </label>
                                <ErrorMessage name="name" />
                            </div>

                            <div className="col-6">
                                <label htmlFor="document_type_id" className="form-label ">
                                    Tipo de Documento
                                </label>
                                <div className="row">
                                    <div className="col-2">
                                        <Field
                                            component={Select}
                                            id="document_type_id"
                                            name="document_type"
                                            className=""
                                            options={typeDocumentsForm?.map((item: any) => ({
                                                name: item.name,
                                                id: item.id,
                                            }))}
                                            placeholder="C.C."
                                        />
                                        <ErrorMessage name="document_type" />
                                    </div>
                                    <div className="col">
                                        <Field
                                            type="text"
                                            name="number_document"
                                            id="number_document_id"
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="No."
                                            min={7}
                                            max={99999999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,14}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="number_document" withCount max={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="type_profiles_id" className="form-label">
                                    Tipo de persona
                                </label>
                                <Field
                                    component={Select}
                                    id="type_profiles_id"
                                    name="type_profiles"
                                    className=""
                                    options={typeProfile?.map((item: any) => ({
                                        name: item.name,
                                        id: item.id,
                                    }))}
                                    placeholder="Seleccione…"
                                />
                                <ErrorMessage name="type_profiles" />
                            </div>

                            <div className="col-6 col-md-6 col-lg-6">
                                <label htmlFor="email_id" className="form-label">
                                    Correo electrónico
                                </label>
                                <Field
                                    type="email"
                                    id="email_id"
                                    name="email"
                                    className="form-control"
                                    autoComplete="off"
                                    style={{ height: '38px' }}
                                    placeholder="Correo electrónico"
                                />
                                <ErrorMessage name="email" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="type_contact_id" className="form-label ">
                                    Número de contacto
                                </label>
                                <div className="row">
                                    <div className="col-3">
                                        <Field
                                            component={Select}
                                            id="type_contact_id"
                                            name="type_contact"
                                            className=""
                                            dropdownMatchSelectWidth={false}
                                            options={typeNumberContact?.map((item: any) => ({
                                                name: item.name,
                                                id: item.id,
                                            }))}
                                        />
                                        <ErrorMessage name="type_contact" />
                                    </div>
                                    <div className="col">
                                        <Field
                                            type="text"
                                            id="number_contact_id"
                                            name="number_contact"
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="No. Digite el número de contacto."
                                            min={7}
                                            max={9999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^[0-9]{0,10}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="number_contact" withCount max={10} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-md-6 col-lg-6">
                                <label htmlFor="direction_id" className="form-label">
                                    Dirección de contacto o sede del postulante
                                </label>
                                <Field
                                    component={ModalAddress}
                                    type="text"
                                    id="direction_id"
                                    name="direction"
                                    className="form-control"
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="Ingrese una dirección..."
                                />

                                <ErrorMessage name="direction" withCount max={100} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <button key="saveDoc" type="submit" className="btn btn-primary" style={{ width: '17%' }}>
                                Continuar
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormPostulation;
