import { Field, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage, Select } from '../../../utils/ui';
import ModalAddress from '../../challenge/components/ModalAddress';
import { IRegisterPersonaNatural } from '../custom_types';
import { actions } from '../redux';
import { actions as actionsChallenge } from '../../challenge/redux';
import RadioMedeinn from '../../../utils/ui/Radio';

interface RegisterFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    register?: IRegisterPersonaNatural;
    type: 'natural' | 'legal';
}
const FormRegister: FC<RegisterFormPros> = ({ register, innerRef, onSubmit, type }) => {
    const dispatch = useDispatch<any>();
    const [typeDocs, setTypeDocs] = useState([]);
    const countries: any[] = useSelector((store: any) => store.auth.countries.value);
    const states: any[] = useSelector((store: any) => store.auth.states.value);
    const cities: any[] = useSelector((store: any) => store.auth.cities.value);
    const neighborhoods: any = useSelector((store: any) => store.challenge.neighborhoods.value);
    const communes: any = useSelector((store: any) => store.challenge.communes.value);
    const types_docuemnts: any = useSelector((store: any) => store.postulation.documentType.value);

    const initial_values = {
        names: '',
        surnames: '',
        document_type: type === 'legal' ? 4 : null,
        document_number: '',
        gender: type === 'legal' ? 'O' : null,
        email: '',
        address: '',
        contact_type: null,
        contact_number: '',
        radioPolitica: '',
        country: null,
        state: null,
        city: null,
        commune: null,
        neighborhood: null,
        entity_type: null,
        ...register,
    };

    useEffect(() => {
        setTypeDocs(types_docuemnts?.filter((doc: { id: number; type: string; name: string }) => doc?.id !== 4));
    }, [types_docuemnts]);

    const schema = Yup.object().shape({
        names: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
        document_number: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        email: Yup.string().email('Ingrese un correo electrónico valido').required('Campo obligatorio'),
        address: Yup.string().required('Campo obligatorio'),
        contact_type: Yup.string().nullable().required('Campo obligatorio'),
        contact_number: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        country: Yup.string().nullable().required('Campo obligatorio'),
        state: Yup.string()
            .nullable()
            .when('country', {
                is: 'CO',
                then: Yup.string().nullable().required('Campo obligatorio'),
            }),
        city: Yup.string()
            .nullable()
            .when('country', {
                is: 'CO',
                then: Yup.string().nullable().required('Campo obligatorio'),
            }),
        commune: Yup.string()
            .nullable()
            .when('city', {
                is: '05001-MEDELLÍN',
                then: Yup.string().nullable().required('Campo obligatorio'),
            }),
        neighborhood: Yup.string()
            .nullable()
            .when('city', {
                is: '05001-MEDELLÍN',
                then: Yup.string().nullable().required('Campo obligatorio'),
            }),
        // state: Yup.string().nullable().required('Campo obligatorio'),
        // city: Yup.string().nullable().required('Campo obligatorio'),
        radioPolitica: Yup.boolean().required('Debes aceptar las politicas para continuar'),
        ...(type === 'legal'
            ? {
                  entity_type: Yup.string().nullable().required('Campo obligatorio'),
              }
            : {
                  document_type: Yup.string().nullable().required('Campo obligatorio'),
                  surnames: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
                  gender: Yup.string().nullable().required('Campo obligatorio'),
              }),
    });
    const submit = async (values: any, form: any) => {
        await onSubmit(values, form);
    };
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange, values, setFieldValue, errors, touched }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="name_id" className="form-label label-landing">
                                    {type === 'natural' ? 'Nombre(s)' : 'Nombre o razón social'}
                                </label>
                                <Field
                                    type="text"
                                    id="name_id"
                                    name="names"
                                    className={`form-control ${errors.names && touched.names && 'error-input'}`}
                                    autoComplete="off"
                                    placeholder="Nombres"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z\s\\áéíóúüÁÉÍÓÚÜÑñ]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />

                                <ErrorMessage name="names" withCount max={50} />
                            </div>
                            {type === 'natural' && (
                                <div className="col-12 col-md-6 col-lg-3">
                                    <label htmlFor="last_name_id" className="form-label label-landing">
                                        Apellido(s)
                                    </label>
                                    <Field
                                        type="text"
                                        id="last_name_id"
                                        name="surnames"
                                        className={`form-control ${
                                            errors.surnames && touched.surnames && 'error-input'
                                        }`}
                                        autoComplete="off"
                                        placeholder="Apellidos"
                                        maxLength={50}
                                        onChange={(e: any) => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = new RegExp(/^[A-Za-z\s\\áéíóúüÁÉÍÓÚÜÑñ]*$/g);
                                            if (regex.test(value.toString())) {
                                                handleChange(e);
                                            }
                                        }}
                                    />

                                    <ErrorMessage name="surnames" withCount max={50} />
                                </div>
                            )}

                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="document_type_id" className="form-label label-landing">
                                    {type === 'natural' ? 'Tipo de Documento' : 'NIT'}
                                </label>
                                <div className="row">
                                    {type === 'natural' && (
                                        <div className="col-4" style={{ paddingRight: 0 }}>
                                            <Field
                                                component={Select}
                                                id="document_type_id"
                                                name="document_type"
                                                color="#603CE6"
                                                status={
                                                    errors?.document_type && touched.document_type ? 'error' : 'success'
                                                }
                                                dropdownStyle={{
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                    minWidth: 300,
                                                }}
                                                type_select="document"
                                                options={typeDocs?.map((document: any) => ({
                                                    id: document.id,
                                                    name: `${document.type} - ${document.name}`,
                                                    type: document.type,
                                                }))}
                                                placeholder="C.C."
                                                filterOption={(input: any, option: any) => {
                                                    return (
                                                        option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                                                        0
                                                    );
                                                }}
                                            />
                                            <ErrorMessage name="document_type" />
                                        </div>
                                    )}

                                    <div className="col">
                                        <Field
                                            type="text"
                                            name="document_number"
                                            id="number_document_id"
                                            className={`form-control ${
                                                errors.document_number && touched.document_number && 'error-input'
                                            }`}
                                            autoComplete="off"
                                            placeholder="No."
                                            min={7}
                                            max={99999999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^\d{0,14}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="document_number" withCount max={14} />
                                    </div>
                                </div>
                            </div>

                            {type === 'natural' ? (
                                <div className="col-12 col-md-6 col-lg-3">
                                    <label htmlFor="gender_id" className="form-label label-landing">
                                        Género
                                    </label>
                                    <Field
                                        component={Select}
                                        id="gender_id"
                                        name="gender"
                                        status={errors?.gender && touched.gender ? 'error' : 'success'}
                                        color="#603CE6"
                                        style={{ height: '38px' }}
                                        options={[
                                            { name: 'Femenino', id: 'F' },
                                            { name: 'Másculino', id: 'M' },
                                            { name: 'Otro', id: 'O' },
                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="gender" />
                                </div>
                            ) : (
                                <div className="col-12 col-md-6 col-lg-3">
                                    <label htmlFor="entity_type_id" className="form-label label-landing">
                                        Tipo de entidad
                                    </label>
                                    <Field
                                        component={Select}
                                        id="entity_type_id"
                                        name="entity_type"
                                        status={errors?.entity_type && touched.entity_type ? 'error' : 'success'}
                                        style={{ height: '38px' }}
                                        options={[
                                            { name: 'Otro', id: 'Otro' },
                                            { name: 'Privada', id: 'Privada' },
                                            { name: 'Pública', id: 'Pública' },
                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="entity_type" />
                                </div>
                            )}
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="email_id" className="form-label label-landing">
                                    Correo electrónico
                                </label>
                                <Field
                                    type="email"
                                    id="email_id"
                                    name="email"
                                    className={`form-control ${errors.email && touched.email && 'error-input'}`}
                                    autoComplete="off"
                                    style={{ height: '38px' }}
                                    placeholder="Correo electrónico"
                                />
                                <ErrorMessage name="email" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="direccion_residencia_id" className="form-label label-landing">
                                    Dirección de residencia
                                </label>
                                <Field
                                    component={ModalAddress}
                                    type="text"
                                    className={`form-control ${errors.address && touched.address && 'error-input'}`}
                                    autoComplete="off"
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="Ingrese una dirección..."
                                    id="direccion_residencia_id"
                                    name="address"
                                />
                                <ErrorMessage name="address" withCount max={100} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="type_contact_id" className="form-label label-landing">
                                    Número de contacto
                                </label>
                                <div className="row">
                                    <div className="col-4">
                                        <Field
                                            component={Select}
                                            status={errors?.contact_type && touched.contact_type ? 'error' : 'success'}
                                            id="type_contact_id"
                                            name="contact_type"
                                            color="#603CE6"
                                            options={[
                                                {
                                                    name: 'Fijo',
                                                    id: 'F',
                                                },
                                                { name: 'Celular', id: 'M' },
                                            ]}
                                            placeholder="Seleccione..."
                                            filterOption={(input: any, option: any) => {
                                                return (
                                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                        <ErrorMessage name="contact_type" />
                                    </div>
                                    <div className="col">
                                        <Field
                                            type="text"
                                            id="number_contact_id"
                                            name="contact_number"
                                            className={`form-control ${
                                                errors.contact_number && touched.contact_number && 'error-input'
                                            }`}
                                            autoComplete="off"
                                            placeholder="No. Digita tu número de contacto."
                                            min={7}
                                            max={9999999999}
                                            onChange={(e: any) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = /^\d{0,10}$/;
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="contact_number" withCount max={10} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="country_id" className="form-label label-landing">
                                    País
                                </label>
                                <Field
                                    showSearch
                                    component={Select}
                                    color="#603CE6"
                                    id="country_id"
                                    name="country"
                                    status={errors?.country && touched.country ? 'error' : 'success'}
                                    style={{ height: '38px' }}
                                    options={countries.map((country: any) => ({
                                        name: country.name,
                                        id: country.code,
                                    }))}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                    extra_on_change={async (value: any) => {
                                        if (value === 'CO') {
                                            await dispatch(actions.get_states());
                                        } else {
                                            setFieldValue('state', null, false);
                                            setFieldValue('city', null, false);
                                        }
                                    }}
                                />
                                <ErrorMessage name="country" />
                            </div>
                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="state_id" className="form-label label-landing">
                                    Departamento
                                </label>
                                <Field
                                    showSearch
                                    component={Select}
                                    status={errors?.state && touched.state ? 'error' : 'success'}
                                    id="country_id"
                                    color="#603CE6"
                                    name="state"
                                    style={{ height: '38px' }}
                                    disabled={values.country !== 'CO'}
                                    options={states.map((state: any) => ({ name: state.name, id: state.id }))}
                                    placeholder="Seleccione…"
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                    extra_on_change={async (value: any) => {
                                        setFieldValue('city', null, false);
                                        await dispatch(actions.get_cities(value));
                                    }}
                                />
                                <ErrorMessage name="state" />
                            </div>

                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="city_id" className="form-label label-landing">
                                    Ciudad
                                </label>
                                <Field
                                    showSearch
                                    component={Select}
                                    id="city_id"
                                    color="#603CE6"
                                    name="city"
                                    status={errors?.city && touched.city ? 'error' : 'success'}
                                    style={{ height: '38px' }}
                                    disabled={!values.state}
                                    options={cities.map((city: any) => ({ name: city.name, id: city.id }))}
                                    placeholder="Seleccione…"
                                    extra_on_change={async (value: string) => {
                                        if (value === '05001-MEDELLÍN') {
                                            dispatch(actionsChallenge.get_communes());
                                            return;
                                        }
                                        setFieldValue('commune', null, false);
                                    }}
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="city" />
                            </div>
                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="comuna_id" className="form-label label-landing">
                                    Comuna
                                </label>
                                <Field
                                    style={{ height: '38px' }}
                                    component={Select}
                                    color="#603CE6"
                                    disabled={values.city !== '05001-MEDELLÍN'}
                                    id="comuna_id"
                                    name="commune"
                                    status={errors?.commune && touched.commune ? 'error' : 'success'}
                                    options={communes?.map((commune: any) => ({
                                        id: commune?.id,
                                        name: commune?.commune,
                                    }))}
                                    extra_on_change={(id_commune: number) => {
                                        console.log('Id comuna: ', id_commune);

                                        setFieldValue('neighborhood', null, false);
                                        dispatch(actionsChallenge.get_neighborhoods(id_commune));
                                    }}
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="commune" />
                            </div>
                            <div className="col-6 col-md-6 col-lg-3">
                                <label htmlFor="neighborhood_id" className="form-label label-landing">
                                    Barrio
                                </label>
                                <Field
                                    showSearch
                                    component={Select}
                                    disabled={!values.commune}
                                    id="neighborhood_id"
                                    name="neighborhood"
                                    status={errors?.neighborhood && touched.neighborhood ? 'error' : 'success'}
                                    color="#603CE6"
                                    options={neighborhoods?.map((neighborhood: any) => ({
                                        id: neighborhood?.neighborhood,
                                        name: neighborhood?.neighborhood,
                                    }))}
                                    placeholder={`${neighborhoods.length > 0 ? 'Seleccionar…' : '------'}`}
                                />
                                <ErrorMessage name="neighborhood" />
                            </div>
                        </div>

                        <div className="row">
                            <div className=" ">
                                <Field
                                    component={RadioMedeinn}
                                    options={[
                                        {
                                            value: true,
                                            name: 'Acepto Políticas de uso y los Términos y Condiciones',
                                        },
                                    ]}
                                    name="radioPolitica"
                                    id="radioPolitica"
                                />

                                <ErrorMessage name="radioPolitica" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormRegister;
