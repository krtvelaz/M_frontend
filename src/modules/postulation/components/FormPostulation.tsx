import { Field, Form, Formik,} from 'formik';
import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { IPostulation } from '../custom_types';
import { ErrorMessage, Select } from '../../../utils/ui';
import ModalAddress from '../../challenge/components/ModalAddress';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import { useLocation } from 'react-router-dom';

interface PostulationFormPros {
    id_challenge: string | number;
    postulation?: IPostulation;
    innerRef: any;
    onSubmit: (values: any, actions: any) => any;
}
const FormPostulation: FC<PostulationFormPros> = ({ postulation,   id_challenge, innerRef, onSubmit }) => {
    const location = useLocation();    
    const [profiles, setProfiles] = useState<any>([]);
    const typeDocumentsForm = useSelector((store: any) => store.postulation.documentType.value);
    const typeNumberContact = useSelector((store: any) => store.postulation.numberContact.value);
    const typePorfile = useSelector((store: any) => store.postulation.profile.value);
    const dispatch = useDispatch<any>(); 
    
    
    useEffect(() => {
        if (typePorfile) {
            const profiles_list = location?.state?.challenge?.cha_profiles?.map((profile: any) => profile.id)
            const arraysFilter: any = profiles_list?.map((profile: number) => {
                const newProfiles = typePorfile.find((x: any) => profile === x.id);
                return newProfiles;
            });
            setProfiles(arraysFilter);
        } else {
            setProfiles(typePorfile);
        }
    }, [typePorfile]);

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
        document_type: Yup.number().nullable().required('Campo obligatorio'),
        number_document: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        type_profiles: Yup.string().nullable().required('Campo obligatorio'),
        email: Yup.string().email('Correo inválido ejemplo: correo@gmail.com').required('Campo obligatorio'),
        type_contact: Yup.string().nullable().required('Campo obligatorio'),
        number_contact: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
        direction: Yup.string().required('Campo obligatorio'),
    });

    const submit = async (values: any, actions: any) => {
        const newValues = {
            pos_id_challenge: id_challenge,
            pos_business_name: values.name,
            pos_contact: values.type_contact,
            pos_number_contact: values.number_contact,
            pos_id_type_competitor: values.type_profiles,
            pos_email: values.email,
            pos_type_document_id: values.document_type,
            pos_documentid: values.number_document,
            pos_address: values.direction,
            pos_id_user: 1,
        };
        await onSubmit(newValues, actions);
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
        <Formik enableReinitialize onSubmit={submit} innerRef={innerRef} initialValues={initial_values} validationSchema={schema}>
            {({ handleChange, values, errors, touched}) => {
                
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="name_id" className="form-label label-landing">
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
                                        En caso de equipo de innovadores elija un responsable y escriba su nombre
                                    </span>
                                </label>
                                <ErrorMessage name="name" />
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="document_type_id" className="form-label label-landing">
                                    Tipo de Documento
                                </label>
                                <div className="row">
                                    <div className="col col-md-3">
                                        <Field
                                            component={Select}
                                            id="document_type_id"
                                            name="document_type"
                                            className=""
                                            type_select='document'
                                            dropdownMatchSelectWidth={false}
                                            options={typeDocumentsForm?.map((document: any) => ({ id: document.id, name: `${document.type} - ${document.name}`, type: document.type }))}
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
                                <label htmlFor="type_profiles_id" className="form-label label-landing">
                                    Tipo de persona
                                </label>
                                <Field
                                    component={Select}
                                    id="type_profiles_id"
                                    name="type_profiles"
                                    className=""
                                    options={profiles}
                                    placeholder="Seleccione…"
                                />
                                <ErrorMessage name="type_profiles" />
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
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
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="type_contact_id" className="form-label label-landing">
                                    Número de contacto
                                </label>
                                <div className="row">
                                    <div className="col col-md-4">
                                        <Field
                                            component={Select}
                                            id="type_contact_id"
                                            name="type_contact"
                                            placeholder='Seleccione...'
                                            className="select-landing"
                                            dropdownMatchSelectWidth={false}
                                            options={typeNumberContact.map((typeNumber: any) => ({
                                                id: typeNumber.name,
                                                name: typeNumber.name,
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
                                        <ErrorMessage name="number_contact" withCount max={10} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="direction_id" className="form-label label-landing">
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
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormPostulation;
