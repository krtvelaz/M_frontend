import { Field, Form, Formik } from 'formik';
import { ErrorMessage, Select } from '../../../utils/ui';
import * as Yup from 'yup';
import { FC } from 'react';
import { useSelector } from 'react-redux';

interface IPros {
    disabled?: boolean;
    type?: 'assign' | 'change' | 'filter';
    innerRef?: any;
    onSubmit: (values: any) => any;
    setUserInfoId?: any;
    infoUser?: any;
    setRoleUser?: any;
}

const FormFilterUser: FC<IPros> = ({ innerRef, onSubmit, type, setUserInfoId, infoUser, setRoleUser }) => {
    const users1: any[] = useSelector((store: any) => store.user.list_users.value);
    const initialValues = {
        role: null,
        document: '',
        ...infoUser,
    };

    const schema = Yup.object().shape({
        // role: Yup.string().nullable().required('Campo obligatorio').min(1, 'Mínimo es 1').max(9999, 'Máximo es 9999'),
    });

    const submit = async (values: any, actions: any) => {
        if (type === 'filter') {
            await onSubmit(values);
            return;
        }
        const filterInfoUsersList = users1.find((item: any) => item?.use_id === values.document);
        setUserInfoId(filterInfoUsersList);
        actions.setSubmitting(false);
    };

    return (
        <Formik
            {...((type === 'filter' || type === 'change' || type === 'assign') && (innerRef = { innerRef }))}
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
        >
            {({ handleChange, values, setFieldValue }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className={`col-12 col-md-${type === 'assign' ? 10 : 6} `}>
                                <label htmlFor="ret_nombre_id" className="form-label">
                                    {type === 'assign'
                                        ? 'Buscar usuario'
                                        : type === 'change'
                                        ? 'Datos del usuario'
                                        : 'Usuario'}
                                </label>
                                <Field
                                    type="text"
                                    id="ret_nombre_id"
                                    name="document"
                                    className="form-control"
                                    aria-describedby="nombre del reto"
                                    autoComplete="off"
                                    maxLength={80}
                                    disabled={type === 'change'}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="document" withCount max={80} />
                            </div>

                            {type !== 'assign' ? (
                                <div className="col-12 col-md-6 col-lg-6">
                                    <label htmlFor="role_id" className="form-label">
                                        {type === 'change' ? 'Seleccionar rol' : 'Rol'}
                                    </label>
                                    <Field
                                        component={Select}
                                        maxTagCount="responsive"
                                        dropdownMatchSelectWidth={false}
                                        id="role_id"
                                        name="role"
                                        extra_on_change={(role: number) => {
                                            setRoleUser(role);
                                        }}
                                        options={[
                                            {
                                                id: 1,
                                                name: 'Super administrador',
                                            },
                                            {
                                                id: 2,
                                                name: 'Administrador',
                                            },
                                            {
                                                id: 3,
                                                name: 'Invitado',
                                            },
                                            {
                                                id: 4,
                                                name: 'Ciudadano',
                                            },
                                        ]}
                                        placeholder="Seleccione uno o más perfiles…"
                                        filterOption={(input: any, option: any) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="role" />
                                </div>
                            ) : (
                                <div className="col-12 col-md-2" style={{ marginTop: '25px' }}>
                                    <button type="submit" className="btn btn-primary">
                                        Buscar
                                    </button>
                                </div>
                            )}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormFilterUser;
