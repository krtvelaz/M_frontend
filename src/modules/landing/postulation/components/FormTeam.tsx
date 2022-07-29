import { Field, Form, Formik } from 'formik'
import { FC } from 'react';
import { ErrorMessage, Select } from '../../../../utils/ui';
import * as Yup from "yup";
import { IPostulationTeam } from '../custom_types';
import { Radio } from 'antd';

interface PostulationTeamFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    postulationTeam?: IPostulationTeam
}
const FormTeam: FC<PostulationTeamFormPros> = ({ innerRef, onSubmit, postulationTeam }) => {
    const initial_values = {
        name_last_name: "",
        document_type: null,
        number_document: "",
        type_sex: null,
        gender_identity: null,
        sexual_orientation: null,
        ethnicity: null,
        radiogroup_victim: "",
        radiogroup_disability:"",
        ...postulationTeam
    };

    const schema = Yup.object().shape({
        name_last_name: Yup.string().required("Campo obligatorio").min(3,"Mínimo 3 caracteres"),
        document_type: Yup.string().nullable().required("Campo obligatorio"),
        number_document: Yup.string().required("Campo obligatorio").min(7,"Mínimo 7 caracteres"),
        type_sex: Yup.string().nullable().required("Campo obligatorio"),
        gender_identity: Yup.string().nullable().required("Campo obligatorio"),
        sexual_orientation: Yup.string().nullable().required("Campo obligatorio"),
        ethnicity: Yup.string().nullable().required("Campo obligatorio"),
        radiogroup_victim: Yup.string().required("Campo obligatorio"),
        radiogroup_disability: Yup.string().required("Campo obligatorio"),
    });
    const submit = (values: any, form: any) => {
        onSubmit(values);

    };

    return (
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

                            <div className='row'>
                                <div className="col-6">
                                    <label htmlFor="name_last_name_id" className="form-label" >
                                        Nombre y apellidos
                                    </label>
                                    <Field
                                        type="text"
                                        id="name_last_name_id"
                                        name="name_last_name"
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder="Nombre y apellidos "
                                        minLength={3}
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
                                    <ErrorMessage name="name_last_name" withCount max={50} />
                                </div>

                                <div className="col-3">
                                    <label htmlFor="document_type_id" className="form-label ">
                                        Tipo de Documento
                                    </label>
                                    <div className="row">
                                        <div className="col-4">
                                            <Field
                                                component={Select}
                                                id="document_type_id"
                                                name="document_type"
                                                dropdownStyle={{
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                    minWidth: 300,
                                                }}
                                                options={[
                                                    { name: "C.C - Cédula de ciudadania", id: "C.C" },
                                                    { name: "C.E.", id: "C.E." },
                                                    { name: "C.D.", id: "C.D." },
                                                    { name: "P.A.", id: "P.A." },
                                                    { name: "S.C.", id: "S.C." },
                                                    { name: "P.E.", id: "P.E." },

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

                                        </div>
                                        <div className="col">
                                            <Field
                                                type="text"
                                                name="number_document"
                                                id="number_document_id"
                                                className="form-control"
                                                autoComplete="off"
                                                placeholder="No. Número de documento"
                                                minLength={7}
                                                maxLength={20}
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
                                            <ErrorMessage name="number_document"  withCount max={20} />
                                        </div>
                                    </div>

                                </div>


                                <div className="col-3 ">
                                    <label htmlFor="type_sex_id" className="form-label">
                                        Sexo
                                    </label>
                                    <Field
                                        component={Select}
                                        id="type_sex_id"
                                        name="type_sex"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Femenino", id: "Femenino" },
                                            { name: "Masculino", id: "Masculino" },
                                            { name: "Intersexual", id: "Intersexual" },
                                            { name: "Indefinido", id: "Indefinido" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="type_sex" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3 ">
                                    <label htmlFor="gender_identity_id" className="form-label">
                                        Identidad de género
                                    </label>
                                    <Field
                                        component={Select}
                                        id="gender_identity_id"
                                        name="gender_identity"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Mujer trans", id: "Mujer trans" },
                                            { name: "Hombre trans", id: "Hombre trans" },
                                            { name: "Fluido no binario", id: "Fluido no binario" },
                                            { name: "Mujer Cls", id: "Mujer Cls" },
                                            { name: "Hombre Cls", id: "Hombre Cls" },
                                            { name: "Sin dato", id: "Sin dato" },
                                            { name: "No sabe no responde", id: "No sabe no responde" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="gender_identity" />
                                </div>

                                <div className="col-3 ">
                                    <label htmlFor="sexual_orientation_id" className="form-label">
                                        Orientación sexual
                                    </label>
                                    <Field
                                        component={Select}
                                        id="sexual_orientation_id"
                                        name="sexual_orientation"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Lesbiana", id: "Lesbiana" },
                                            { name: "Bisexual", id: "Bisexual" },
                                            { name: "Gay", id: "Gay" },
                                            { name: "Asexual", id: "Asexual" },
                                            { name: "Pansexual", id: "Pansexual" },
                                            { name: "Sin dato", id: "Sin dato" },
                                            { name: "No sabe no responde", id: "No sabe no responde" },


                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="sexual_orientation" />
                                </div>

                                <div className="col-3 ">
                                    <label htmlFor="ethnicity_id" className="form-label">
                                        Etnia
                                    </label>
                                    <Field
                                        component={Select}
                                        id="ethnicity_id"
                                        name="ethnicity"
                                        style={{ height: "38px" }}

                                        options={[

                                            { name: "Afrocolombiano", id: "Afrocolombiano" },
                                            { name: "Palenquero", id: "Palenquero" },
                                            { name: "Raizal", id: "Raizal" },
                                            { name: "Indígena", id: "Indígena" },
                                            { name: "Rom gitano", id: "Rom gitano" },
                                            { name: "Ninguno", id: "Ninguno" },

                                        ]}
                                        placeholder="Seleccione…"
                                        filterOption={(input: any, option: any) => {
                                            return (
                                                option?.children
                                                    ?.toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="ethnicity" />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-3 ">
                                    <label htmlFor="radiogrou_victim_id" className="form-label mb-4">
                                        ¿Es víctima del conflicto?
                                    </label>
                                    <Radio.Group name="radiogroup_victim" id="radiogrou_victim_id"    >
                                        <Radio value={"si"}>Si</Radio>
                                        <Radio value={"no"}>No</Radio>
                                    </Radio.Group>

                                    <ErrorMessage name="radiogrou_victim_id" />
                                </div>

                                <div className="col-3 ">
                                    <label htmlFor="radiogrou_disability_id" className="form-label mb-4">
                                        ¿Presenta algún tipo de discapacidad?
                                    </label>
                                    <Radio.Group name="radiogroup_disability" id="radiogrou_disability_id"    >
                                        <Radio value={"si"}>Si</Radio>
                                        <Radio value={"no"}>No</Radio>
                                    </Radio.Group>
                                    <ErrorMessage name="radiogrou_disability_id" />
                                </div>
                            </div>

                           
                        </Form>
                    
                );
            }}

        </Formik>

    );
}

export default FormTeam