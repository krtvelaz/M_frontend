import { Radio } from 'antd';
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
const FormRegisterPersonaNatural: FC<RegisterFormPros> = ({ register, innerRef, onSubmit, type }) => {
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
        document_type: type === 'legal' ? 4 :  null,
        document_number: '',
        gender: type === 'legal' ? 'O' :  null,
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
        setTypeDocs(types_docuemnts?.filter((doc: {id:number; type: string; name: string}) => doc?.id !== 4))
    },[types_docuemnts])
    

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
        ...(type === 'legal' ? {
            entity_type: Yup.string().nullable().required('Campo obligatorio'),
        } :
        { 
            document_type: Yup.string().nullable().required('Campo obligatorio'),
            surnames: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
            gender: Yup.string().nullable().required('Campo obligatorio'),
        }
        
        ),
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
            {({ handleChange, values, setFieldValue, errors, touched}) => {
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
                                    className="form-control"
                                    autoComplete="off"
                                    placeholder="Nombres"
                                    maxLength={50}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
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
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder="Apellidos"
                                        maxLength={50}
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

                                    <ErrorMessage name="surnames" withCount max={50} />
                                </div>
                            )}

                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="document_type_id" className="form-label label-landing">
                                    {type === 'natural' ? 'Tipo de Documento' : 'NIT'}
                                </label>
                                <div className="row">
                                    {type === 'natural' && (
                                        <div className="col-4" style={{paddingRight: 0,}}>
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
                                                type_select='document'
                                                options={typeDocs?.map((document: any) => ({ id: document.id, name: `${document.type} - ${document.name}`, type: document.type }))}
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
                                    className="form-control"
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
                                    className="form-control"
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
                                            id="type_contact_id"
                                            name="contact_type"
                                            className=""
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
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="No. Digita tu número de contacto."
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
                                        <ErrorMessage name="contact_number" withCount max={10} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="country_id" className="form-label label-landing">
                                    País
                                </label>
                                <Field
                                    component={Select}
                                    id="country_id"
                                    name="country"
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
                                    component={Select}
                                    id="country_id"
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
                                    component={Select}
                                    id="city_id"
                                    name="city"
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
                                    disabled={values.city !== '05001-MEDELLÍN'}
                                    id="comuna_id"
                                    name="commune"
                                    className=""
                                    options={communes?.map((commune: any) => ({
                                        id: commune?.id,
                                        name: commune?.commune,
                                    }))}
                                    extra_on_change={(id_commune: number) => {
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
                                    component={Select}
                                    disabled={!values.commune}
                                    id="neighborhood_id"
                                    name="neighborhood"
                                    className=""
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

// interface IRadioPros{
//     className?: string;
//     extra_on_change?: (value: any, prev_value?: any) => void;
//     field:any;
//     form:any;
// }

// const RadioMedeinn: FC<IRadioPros> = ({
//     field, form, className, extra_on_change, ...props
// }) => {
//     const on_change = (value: any) =>{
//         form.setFieldValue(field.name, value.target.value, false);
//         extra_on_change && extra_on_change(value.target.value, field.value);
//     }

//     return (
//         <Radio.Group {...props} onChange={on_change} value={field.value} >
//             <Radio value={true}> Acepto Políticas de uso y los Términos y Condiciones</Radio>
//         </Radio.Group>
//     )
// }

export default FormRegisterPersonaNatural;
