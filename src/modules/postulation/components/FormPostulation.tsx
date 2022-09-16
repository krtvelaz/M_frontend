import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useRef, useState } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import { ErrorMessage, Select } from '../../../utils/ui';
import ComponetCard from '../../../utils/ui/Card';
import ModalAddress from '../../challenge/components/ModalAddress';

interface PostulationFormPros {
    innerRef?: any;
    onSubmit: (values: any, form?: any) => any;
    postulation?: IPostulation;
}
const FormPostulation: FC<PostulationFormPros> = ({ innerRef, onSubmit, postulation }) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const form_ref = useRef<FormikProps<FormikValues>>();
    const validationDirection = () => {
        set_is_visible(!is_visible);
        console.log('estad', is_visible);
    };
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
    const submit = (values: any, form: any) => {
        onSubmit(values);
    };

    return (
        <div>
            <ComponetCard>
                <Formik
                    enableReinitialize
                    onSubmit={submit}
                    initialValues={initial_values}
                    validationSchema={schema}
                    innerRef={innerRef}
                >
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
                                                const regex = new RegExp(
                                                    /^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g
                                                );
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />

                                        <label className="form-label">
                                            <span>
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
                                                    dropdownStyle={{
                                                        maxHeight: 400,
                                                        overflow: 'auto',
                                                        minWidth: 300,
                                                    }}
                                                    options={[
                                                        {
                                                            name: 'C.C - Cédula de ciudadania',
                                                            id: 'C.C',
                                                        },
                                                        { name: 'C.G.I.', id: 'C.G.I.' },
                                                        {
                                                            name: 'NIT - Número de Identificación Tributaria',
                                                            id: 'NIT',
                                                        },
                                                    ]}
                                                    placeholder="C.C."
                                                    filterOption={(input: any, option: any) => {
                                                        return (
                                                            option?.children
                                                                ?.toLowerCase()
                                                                .indexOf(input.toLowerCase()) >= 0
                                                        );
                                                    }}
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
                                            style={{ height: '38px' }}
                                            options={[
                                                {
                                                    name: 'Grupo de investigación',
                                                    id: 'Grupo de investigación',
                                                },
                                                { name: 'Persona jurídica', id: 'Persona jurídica' },
                                                {
                                                    name: 'Equipo de innovadores',
                                                    id: 'Equipo de innovadores',
                                                },
                                            ]}
                                            placeholder="Seleccione…"
                                            filterOption={(input: any, option: any) => {
                                                return (
                                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
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
                                                    options={[
                                                        {
                                                            name: 'Fijo',
                                                            id: 'Fijo',
                                                        },
                                                        { name: 'Celular', id: 'Celular' },
                                                    ]}
                                                    placeholder="Seleccione..."
                                                    filterOption={(input: any, option: any) => {
                                                        return (
                                                            option?.children
                                                                ?.toLowerCase()
                                                                .indexOf(input.toLowerCase()) >= 0
                                                        );
                                                    }}
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
                                        <a onClick={validationDirection}>
                                            <Field
                                                type="text"
                                                id="direction_id"
                                                name="direction"
                                                className="form-control"
                                                autoComplete="off"
                                                minLength={3}
                                                maxLength={100}
                                                placeholder="Ingrese una dirección..."
                                            />
                                        </a>

                                        {/* <ErrorMessage name="direction" withCount max={100} /> */}
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                <ModalAddress is_visible={is_visible} id={10} onSubmit={validationDirection} />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    {/* <button
              key="saveDoc"
              type="button"
              className="btn btn-primary"
              style={{width:"17%"}}
              
            >
              Atrás
              {form_ref.current?.isSubmitting && (
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  style={{ fontSize: 12, marginLeft: 4, color: "#fff" }}
                />
              )}
          </button> */}
                    <button key="saveDoc" type="button" className="btn btn-primary" style={{ width: '17%' }}>
                        Registrarme
                        {form_ref.current?.isSubmitting && (
                            <i
                                className="fa fa-circle-o-notch fa-spin"
                                style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                            />
                        )}
                    </button>
                </div>
            </ComponetCard>
        </div>
    );
};

export default FormPostulation;
