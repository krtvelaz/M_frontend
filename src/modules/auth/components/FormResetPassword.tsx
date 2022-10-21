import { CheckOutlined } from '@ant-design/icons';
import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../utils/ui';
import { IResetPassword } from '../custom_types';

interface ResetPasswordFormPros {
    innerRef: any;
    onSubmit: (values: any, form?: any) => any;
    disabled?: boolean;
    resetPassword?: IResetPassword;
}
const FormResetPassword: FC<ResetPasswordFormPros> = ({ innerRef, disabled, resetPassword, onSubmit }) => {
    const [minuscula, setMinuscula] = useState(/^(?=.*[a-z])/);
    const [mayuscula, setMayuscula] = useState(/^(?=.*[A-Z])/);
    const [numero, setNumero] = useState(/^(?=.*[0-9])/);
    const [caracteres, setCaracteres] = useState(/^(?=.{8,})/);

    const navigate = useNavigate();
    const passwordType = ['password', 'text'];
    const [type, setType] = useState(0);
    const [type2, setType2] = useState(0);
    const initialValues = {
        user: '',
        password: '',
        confirmPassword: '',
        ...resetPassword,
    };
    const submit = async (values: any) => {
        await onSubmit(values);
    };

    const schema = Yup.object().shape({
        user: Yup.string().required('Campo obligatorio'),
        password: Yup.string().required('Campo obligatorio'),
        confirmPassword: Yup.string().required('Campo obligatorio'),
    });
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ isSubmitting, values, handleChange }) => {
                return (
                    <Form>
                        <div className="row ">
                            <div className="col-12 col-md-4 col-lg-4">
                                <label htmlFor="user_id" className="form-label">
                                    {/* Número de identificación */}
                                    Digita tu usuario
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="user_id"
                                    name="user"
                                    placeholder="ingresa tu usuario, cédula o NIT"
                                    disabled={true}
                                    autoComplete="off"
                                    min={0}
                                    max={999999}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,6}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="user" />
                            </div>

                            <div className="col-12 col-md-4 col-lg-4">
                                <label htmlFor="password_id" className="form-label">
                                    Nueva contraseña
                                </label>
                                <div className="input-group ">
                                    <Field
                                        type={passwordType[type]}
                                        className="form-control border-end-0"
                                        id="password_id"
                                        name="password"
                                        autoComplete="on"
                                        disabled={disabled}
                                    />

                                    <span
                                        className="input-group-text bg-white border-start-0"
                                        onClick={() => {
                                            if (type === 0) {
                                                setType(1);
                                            } else {
                                                setType(0);
                                            }
                                        }}
                                        style={{ cursor: 'pointer', borderRadius: '0px 6px 6px 0px' }}
                                    >
                                        {type === 0 && <span style={{ color: '#1FAEEF' }}>VER</span>}
                                        {type === 1 && <span style={{ color: '#1FAEEF' }}>OCULTAR</span>}
                                    </span>
                                    <ErrorMessage name="password" />
                                </div>
                            </div>

                            <div className="col-12 col-md-4 col-lg-4">
                                <label htmlFor="confirmPassword_id" className="form-label">
                                    Confirme su nueva contraseña
                                </label>
                                <div className="input-group ">
                                    <Field
                                        type={passwordType[type2]}
                                        className="form-control border-end-0"
                                        id="confirmPassword_id"
                                        name="confirmPassword"
                                        autoComplete="on"
                                        disabled={disabled}
                                    />

                                    <span
                                        className="input-group-text bg-white border-start-0"
                                        onClick={() => {
                                            if (type2 === 0) {
                                                setType2(1);
                                            } else {
                                                setType2(0);
                                            }
                                        }}
                                        style={{ cursor: 'pointer', borderRadius: '0px 6px 6px 0px' }}
                                    >
                                        {type2 === 0 && <span style={{ color: '#1FAEEF' }}>VER</span>}
                                        {type2 === 1 && <span style={{ color: '#1FAEEF' }}>OCULTAR</span>}
                                    </span>
                                    <ErrorMessage name="confirmPassword" />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 mb-4">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="row">
                                    {minuscula.test(values.password) === true ? (
                                        <span>
                                            <CheckOutlined style={{ color: '#FF8403' }} /> Un carácter en minúscula
                                        </span>
                                    ) : (
                                        <span>
                                            <CheckOutlined style={{ color: '#C7C7C7' }} /> Un carácter en minúscula
                                        </span>
                                    )}
                                </div>
                                <div className="row">
                                    {mayuscula.test(values.password) === true ? (
                                        <span>
                                            <CheckOutlined style={{ color: '#FF8403' }} /> Un carácter en mayúscula
                                        </span>
                                    ) : (
                                        <span>
                                            <CheckOutlined style={{ color: '#C7C7C7' }} /> Un carácter en mayúscula
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="row">
                                    {numero.test(values.password) === true ? (
                                        <span>
                                            <CheckOutlined style={{ color: '#FF8403' }} /> Un número
                                        </span>
                                    ) : (
                                        <span>
                                            <CheckOutlined style={{ color: '#C7C7C7' }} /> Un número
                                        </span>
                                    )}
                                </div>
                                <div className="row">
                                    {caracteres.test(values.password) === true ? (
                                        <span>
                                            <CheckOutlined style={{ color: '#FF8403' }} /> 8 caracteres como mínimo
                                        </span>
                                    ) : (
                                        <span>
                                            <CheckOutlined style={{ color: '#C7C7C7' }} /> 8 caracteres como mínimo
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormResetPassword;
