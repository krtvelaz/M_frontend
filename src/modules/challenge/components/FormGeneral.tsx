import { Field, Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import Input from '../../../utils/ui/CurrencyInput';
import DateInput from '../../../utils/ui/DateInput';
import DocumentInput from '../../../utils/ui/DocumentInput';
import ErrorMessage from '../../../utils/ui/ErrorMessage';
import Select from '../../../utils/ui/Select';
import * as Yup from 'yup';
import { IGeneralInformation } from '../custom_types';
import moment from 'moment';
import { TimeRangePickerProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';

interface GeneralInformationFormPros {
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    general_?: IGeneralInformation;
    innerRef: any;
    onSubmit: (values: any) => void;
    communes: any;
    dimensions: any;
    dependencies: any;
    profiles: any;
}

const FormGeneral: FC<GeneralInformationFormPros> = ({
    disabled,
    general_,
    innerRef,
    onSubmit,
    communes,
    dimensions,
    dependencies,
    profiles,
}) => {
    const initialValues = {
        cha_announcement: '',
        cha_name: '',
        cha_profiles: [],
        cha_id_dimension: '',
        cha_id_dependency: '',
        cha_start_date: '',
        cha_end_date: '',
        cha_details_population_impact: '',
        cha_id_commune: '',
        cha_id_neighborhood: '',
        cha_details: '',
        cha_imagen_principal: {
            id: general_?.id || -1,
            name: general_?.cha_name_image || '',
        },
        cha_video_url: '',
        cha_important_data: '',
        cha_expected_results: '',
        cha_amount: '',
        cha_description: '',
        cha_impact_type: '',
        ...general_,
    };
    const neighborhoods: any = useSelector((store: any) => store.challenge.neighborhoods.value);

    useEffect(() => {
        if (general_?.cha_id_commune) {
            dispatch(actions.get_neighborhoods(general_?.cha_id_commune));
        }
    }, [general_?.cha_id_commune]);

    const dispatch = useDispatch<any>();
    const schema = Yup.object().shape({
        cha_announcement: Yup.number().required('Campo obligatorio').min(1, 'Mínimo es 1').max(9999, 'Máximo es 9999'),
        cha_name: Yup.string().trim().required('Campo obligatorio'),
        cha_profiles: Yup.array().min(1, 'Campo obligatorio'),
        cha_id_dimension: Yup.string().trim().nullable().required('Campo obligatorio'),
        cha_id_dependency: Yup.number().nullable().required('Campo obligatorio'),
        cha_start_date: Yup.string().trim().required('Campo obligatorio'),
        cha_end_date: Yup.string().trim().required('Campo obligatorio'),
        cha_description: Yup.string().trim().required('Campo obligatorio'),
        cha_id_commune: Yup.string().trim().nullable().required('Campo obligatorio'),
        cha_id_neighborhood: Yup.string().trim().nullable().required('Campo obligatorio'),
        cha_imagen_principal: Yup.object({
            name: Yup.string().required('Campo obligatorio'),
        }).nullable(),
        cha_details_population_impact: Yup.string().trim().required('Campo obligatorio'),
        cha_important_data: Yup.string().trim().required('Campo obligatorio'),
        cha_expected_results: Yup.string().trim().required('Campo obligatorio'),
        cha_details: Yup.string().trim().required('Campo obligatorio'),
        cha_video_url: Yup.string().trim().url('Por favor ingrese una url'),
        cha_amount: Yup.number().nullable().max(10000000000, 'El máximo es $10.000.000.000'),
    });

    const submit = async (values: any, actions: any) => {
        await onSubmit(values);
        actions.setSubmitting(false);
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ handleChange, values, setFieldValue, errors, touched }) => {
                const disabledDate: TimeRangePickerProps['disabledDate'] = (current) => {
                    return current && current < moment(values?.cha_start_date).endOf('day');
                };
                const disabledDateStart: TimeRangePickerProps['disabledDate'] = (current) => {
                    return current && current > moment(values?.cha_end_date).endOf('day');
                };
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="cha_announcement_id" className="form-label">
                                    No. Convocatoría
                                </label>
                                <Field
                                    type="number"
                                    id="cha_announcement_id"
                                    name="cha_announcement"
                                    className={`form-control ${errors.cha_announcement && 'error-input'}`}
                                    aria-describedby="nombre del reto"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="cha_announcement" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-9">
                                <label htmlFor="ret_nombre_id" className="form-label">
                                    Nombre
                                </label>
                                <Field
                                    autoFocus={false}
                                    type="text"
                                    id="ret_nombre_id"
                                    name="cha_name"
                                    className={`form-control ${errors.cha_name && 'error-input'}`}
                                    aria-describedby="nombre del reto"
                                    autoComplete="off"
                                    maxLength={80}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_name" withCount max={80} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_perfil_id" className="form-label">
                                    Perfiles
                                </label>
                                <Field
                                    component={Select}
                                    maxTagCount="responsive"
                                    status={errors?.cha_profiles ? 'error' : 'success'}
                                    showArrow
                                    dropdownMatchSelectWidth={false}
                                    id="ret_perfil_id"
                                    name="cha_profiles"
                                    options={profiles?.map((profile: any) => ({
                                        id: profile?.id,
                                        name: profile?.name,
                                    }))}
                                    placeholder="Seleccione uno o más perfiles…"
                                    mode="multiple"
                                    showSearch
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="cha_profiles" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="ret_dimension_id" className="form-label">
                                    Dimensión
                                </label>
                                <Field
                                    component={Select}
                                    id="ret_dimension_id"
                                    name="cha_id_dimension"
                                    status={errors?.cha_id_dimension ? 'error' : 'success'}
                                    options={dimensions?.map((dimension: any) => ({
                                        id: dimension?.id,
                                        name: dimension?.maedim_nombre,
                                    }))}
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="cha_id_dimension" />
                            </div>
                            <div className="col-12 col-md-12 col-lg-3">
                                <label htmlFor="ret_dependencia_id" className="form-label">
                                    Dependencia
                                </label>
                                <Field
                                    component={Select}
                                    id="ret_dependencia_id"
                                    name="cha_id_dependency"
                                    status={errors?.cha_id_dependency ? 'error' : 'success'}
                                    options={dependencies.map((dependency: any) => ({
                                        id: dependency?.id,
                                        name: dependency?.maedep_nombre,
                                    }))}
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="cha_id_dependency" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="ret_fecha_inicio_id" className="form-label">
                                    Fecha de inicio
                                </label>
                                <Field
                                    className={`${errors.cha_start_date && 'error-input'}`}
                                    component={DateInput}
                                    name="cha_start_date"
                                    id="ret_fecha_inicio_id"
                                    disabledDate={disabledDateStart}
                                />

                                <ErrorMessage name="cha_start_date" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="ret_fecha_final_id" className="form-label">
                                    Fecha de cierre
                                </label>
                                <Field
                                    className={`${errors.cha_end_date && 'error-input'}`}
                                    component={DateInput}
                                    name="cha_end_date"
                                    id="ret_fecha_final_id"
                                    disabledDate={disabledDate}
                                />
                                <ErrorMessage name="cha_end_date" />
                            </div>
                            <div className="col-12 col-md-12 col-lg-6">
                                <label htmlFor="ret_descripcion_id" className="form-label">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_description && 'error-input'}`}
                                    id="ret_descripcion_id"
                                    name="cha_description"
                                    autoComplete="off"
                                    maxLength={250}
                                    style={{ height: '38px' }}
                                />
                                <ErrorMessage name="cha_description" withCount max={250} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_detalle_postulacion_id" className="form-label">
                                    Detalles del reto
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_details && 'error-input'}`}
                                    id="ret_detalles_id"
                                    name="cha_details"
                                    autoComplete="off"
                                    maxLength={100}
                                    style={{ height: '38px' }}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_details" withCount max={100} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_comuna_id" className="form-label">
                                    Lugar del reto
                                </label>
                                <div className="row">
                                    <div className="col-6">
                                        <Field
                                            style={{ height: '38px' }}
                                            component={Select}
                                            id="ret_comuna_id"
                                            name="cha_id_commune"
                                            status={errors?.cha_id_commune ? 'error' : 'success'}
                                            options={communes?.map((commune: any) => ({
                                                id: commune?.id,
                                                name: commune?.commune,
                                            }))}
                                            extra_on_change={(id_commune: number) => {
                                                setFieldValue('cha_id_neighborhood', null, false);
                                                dispatch(actions.get_neighborhoods(id_commune));
                                            }}
                                            placeholder="Seleccionar…"
                                        />
                                        <ErrorMessage name="cha_id_commune" />
                                    </div>
                                    <div className="col-6">
                                        <Field
                                            component={Select}
                                            disabled={neighborhoods.length === 0}
                                            id="ret_barrio_id"
                                            name="cha_id_neighborhood"
                                            status={errors?.cha_id_neighborhood ? 'error' : 'success'}
                                            options={neighborhoods?.map((neighborhood: any) => ({
                                                id: neighborhood?.id,
                                                name: neighborhood?.neighborhood,
                                            }))}
                                            placeholder={`${neighborhoods.length > 0 ? 'Seleccionar…' : '------'}`}
                                        />
                                        <ErrorMessage name="cha_id_neighborhood" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_detalles_poblacion_impactar_id" className="form-label">
                                    Detalle población a impactar{' '}
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_details_population_impact && 'error-input'}`}
                                    id="ret_detalles_poblacion_impactar_id"
                                    name="cha_details_population_impact"
                                    autoComplete="off"
                                    style={{ height: '38px' }}
                                    maxLength={200}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_details_population_impact" withCount max={200} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_imagen_principal_id" className="form-label">
                                    Imagen principal
                                </label>
                                <Field
                                    component={DocumentInput}
                                    file_type="img"
                                    type_image="JPG"
                                    maximum_size={2}
                                    type="text"
                                    id="ret_imagen_principal_id"
                                    name="cha_imagen_principal"
                                    className="form-control"
                                    placeholder="Seleccionar…"
                                />
                                <ErrorMessage name="cha_imagen_principal.name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_video_id" className="form-label">
                                    Video <span style={{ fontSize: '10px' }}> - Opcional </span>
                                </label>
                                <Field
                                    type="text"
                                    id="ret_video_id"
                                    name="cha_video_url"
                                    className={`form-control ${errors.cha_video_url && 'error-input'}`}
                                    autoComplete="off"
                                />
                                <div style={{ fontSize: '10px', marginTop: '5px' }}>URL embebida (YouTube, Video)</div>
                                <ErrorMessage name="cha_video_url" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_dato_importante_id" className="form-label">
                                    Datos importantes{' '}
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_important_data && 'error-input'}`}
                                    style={{ height: '38px' }}
                                    id="ret_dato_importante_id"
                                    name="cha_important_data"
                                    autoComplete="off"
                                    maxLength={500}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_important_data" withCount max={500} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_resultado_esperado_id" className="form-label">
                                    Resultados esperados{' '}
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_expected_results && 'error-input'}`}
                                    style={{ height: '38px' }}
                                    id="ret_resultado_esperado_id"
                                    name="cha_expected_results"
                                    autoComplete="off"
                                    maxLength={500}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_expected_results" withCount max={500} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="cha_impact_type_id" className="form-label">
                                    Tipo de impacto
                                    <span style={{ fontSize: '10px' }}> - Opcional </span>
                                </label>
                                <Field
                                    as="textarea"
                                    className={`form-control ${errors.cha_impact_type && 'error-input'}`}
                                    id="cha_impact_type_id"
                                    name="cha_impact_type"
                                    autoComplete="off"
                                    maxLength={100}
                                    style={{ height: '38px' }}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="cha_impact_type" withCount max={100} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_monto_id" className="form-label">
                                    Monto económico
                                    <span style={{ fontSize: '10px' }}> - Opcional </span>
                                </label>
                                <Field
                                    // type="number"
                                    component={Input}
                                    status={errors?.cha_amount ? 'error' : 'success'}
                                    name="cha_amount"
                                    id="ret_monto_id"
                                    min={0}
                                    // max={10000000000}
                                    maxLength={14}
                                />
                                <div style={{ fontSize: '10px', marginTop: '5px' }}>Máx: $10.000.000.000</div>
                                <ErrorMessage name="cha_amount" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormGeneral;
