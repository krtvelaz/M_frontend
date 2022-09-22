import { Field, Form, Formik } from 'formik';
import { ErrorMessage, Select } from '../../../utils/ui';
import * as Yup from 'yup';
import { FC } from 'react';

interface IPros {
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    innerRef: any;
    onSubmit: (values: any) => any;
}

const FormFilterUser: FC<IPros> = ({ innerRef, onSubmit }) => {
    const initialValues = {
        cha_announcement: '',
        cha_name: '',
    };

    const schema = Yup.object().shape({
        cha_announcement: Yup.number().required('Campo obligatorio').min(1, 'Mínimo es 1').max(9999, 'Máximo es 9999'),
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
            {({ handleChange, values, setFieldValue }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_nombre_id" className="form-label">
                                    Usuario
                                </label>
                                <Field
                                    type="text"
                                    id="ret_nombre_id"
                                    name="cha_name"
                                    className="form-control"
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
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="ret_perfil_id" className="form-label">
                                    Rol
                                </label>
                                <Field
                                    component={Select}
                                    maxTagCount="responsive"
                                    showArrow
                                    dropdownMatchSelectWidth={false}
                                    id="ret_perfil_id"
                                    name="cha_profiles"
                                    className=""
                                    options={[
                                        {
                                            id: 1,
                                            name: 'Super administrador',
                                        },
                                        {
                                            id: 1,
                                            name: 'Administrador',
                                        },
                                        {
                                            id: 1,
                                            name: 'Invitado',
                                        },
                                    ]}
                                    placeholder="Seleccione uno o más perfiles…"
                                    mode="multiple"
                                    showSearch
                                    filterOption={(input: any, option: any) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="cha_profiles" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormFilterUser;
