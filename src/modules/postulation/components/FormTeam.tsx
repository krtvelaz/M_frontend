import { Field } from 'formik';
import { FC, useEffect } from 'react';
import { ErrorMessage, Select } from '../../../utils/ui';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux';
import RadioButton from '../../../utils/ui/RadioButton';

interface PostulationTeamFormPros {
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void;
    };
    errors: any;
    touched: any;
    i: number;
}
const FormTeam: FC<PostulationTeamFormPros> = ({ handleChange, errors, touched, i }) => {
    const typeDocumentsForm = useSelector((store: any) => store.postulation.documentType.value);
    const typeListSexForm = useSelector((store: any) => store.postulation.listSexs.value);
    const TypeDocMember = useSelector((store: any) => store.postulation.loading_typeDocumentsMembers.value);
    const SexualOrientations = useSelector((store: any) => store.postulation.sexual_orientation.value);
    const dispatch = useDispatch<any>();

    const ListSextype = async () => {
        await dispatch(actions.get__listSexs());
    };
    const DocumentTypeMemberPos = async () => {
        await dispatch(actions.get__documentMembers());
    };
    const listSex_orientation = async () => {
        await dispatch(actions.get__sexual_orientation());
    };
    useEffect(() => {
        ListSextype();
        DocumentTypeMemberPos();
        listSex_orientation();
    }, []);

    
    
// console.log( );


    return (
        <div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_names_id" className="form-label label-landing">
                        Nombre y apellidos
                    </label>
                    
                    <Field
                        type="text"
                        id="gruint_names_id"
                        name={`membersPostulations.${i}.gruint_names`}
                        className={`form-control ${( errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_names && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_names  ) &&  'error-input'}`}
                        autoComplete="off"
                        placeholder="Nombre y apellidos"
                        minLength={3}
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
                    <ErrorMessage name={`membersPostulations.${i}.gruint_names`} withCount max={50} />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_type_document_id" className="form-label label-landing">
                        Tipo de Documento
                    </label>
                    <div className="row">
                        <div className="col-4">
                            <Field
                                component={Select}
                                color='#603CE6'
                                id="gruint_type_document_id"
                                name={`membersPostulations.${i}.gruint_type_document`}
                                status={(errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_type_document && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_type_document) ? 'error' : 'success'}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                    minWidth: 300,
                                }}
                                options={TypeDocMember?.map((docuemnt: any) => ({
                                    id: `${docuemnt.id}`,
                                    name: docuemnt.name,
                                }))}
                                placeholder="C.C."
                                filterOption={(input: any, option: any) => {
                                    return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                }}
                            />
                        </div>
                        <div className="col">
                            <Field
                                type="number"
                                name={`membersPostulations.${i}.gruint_document`}
                                id="gruint_document_id"
                                className={`form-control ${( errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_document && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_document  ) &&  'error-input'}`}
                                autoComplete="off"
                                placeholder="No. Número de documento"
                                minLength={7}
                                maxLength={20}
                                onChange={(e: any) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = /^[0-9]{0,14}$/;
                                    if (regex.test(value.toString())) {
                                        handleChange(e);
                                    }
                                }}
                            />
                        </div>

                        <ErrorMessage name={`membersPostulations.${i}.gruint_document`} withCount max={20} />
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_sex_id" className="form-label label-landing">
                        Sexo
                    </label>
                    <Field
                        component={Select}
                        color='#603CE6'
                        id="gruint_sex_id"
                        name={`membersPostulations.${i}.gruint_sex`}
                        status={(errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_sex && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_sex) ? 'error' : 'success'}
                        style={{ height: '38px' }}
                        options={typeListSexForm}
                        placeholder="Seleccione…"
                        filterOption={(input: any, option: any) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name={`membersPostulations.${i}.gruint_sex`} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_identity_id" className="form-label label-landing">
                        Identidad de género
                    </label>
                    <Field
                        component={Select}
                        color='#603CE6'
                        id="gruint_identity_id"
                        name={`membersPostulations.${i}.gruint_identity`}
                        status={(errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_identity && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_identity) ? 'error' : 'success'}
                        style={{ height: '38px' }}
                        options={[
                            {
                                name: 'Mujer trans',
                                id: 1,
                            },
                            {
                                name: 'Hombre trans',
                                id: 2,
                            },
                            {
                                name: 'Fluido no binario',
                                id: 3,
                            },
                            { name: 'Mujer cis', id: 4 },
                            {
                                name: 'Hombre cis',
                                id: 5,
                            },
                            { name: 'Sin dato', id: 6 },
                            {
                                name: 'No sabe no responde',
                                id: 7,
                            },
                        ]}
                        placeholder="Seleccione…"
                        filterOption={(input: any, option: any) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name={`membersPostulations.${i}.gruint_identity`} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_orientation_sexual_id" className="form-label label-landing">
                        Orientación sexual
                    </label>
                    <Field
                        component={Select}
                        color='#603CE6'
                        id="gruint_orientation_sexual_id"
                        name={`membersPostulations.${i}.gruint_orientation_sexual`}
                        status={(errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_orientation_sexual && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_orientation_sexual) ? 'error' : 'success'}
                        style={{ height: '38px' }}
                        options={SexualOrientations}
                        placeholder="Seleccione…"
                        filterOption={(input: any, option: any) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name={`membersPostulations.${i}.gruint_orientation_sexual`} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="gruint_ethnicity_id" className="form-label label-landing">
                        Etnia
                    </label>
                    <Field
                        component={Select}
                        color='#603CE6'
                        id="gruint_ethnicity_id"
                        name={`membersPostulations.${i}.gruint_ethnicity`}
                        status={(errors?.membersPostulations && errors?.membersPostulations[i]?.gruint_ethnicity && touched?.membersPostulations && touched?.membersPostulations[i]?.gruint_ethnicity) ? 'error' : 'success'}
                        style={{ height: '38px' }}
                        options={[
                            {
                                name: 'Afrocolombiano',
                                id: 1,
                            },
                            {
                                name: 'Palenquero',
                                id: 2,
                            },
                            { name: 'Raizal', id: 3 },
                            { name: 'Indígena', id: 4 },
                            {
                                name: 'Rom gitano',
                                id: 5,
                            },
                            { name: 'Ninguno', id: 6 },
                        ]}
                        placeholder="Seleccione…"
                        filterOption={(input: any, option: any) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name={`membersPostulations.${i}.gruint_ethnicity`} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="radiogrou_victim_id" className="form-label mb-4 label-landing">
                        ¿Es víctima del conflicto?
                    </label>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '50%',
                        }}
                    >
                        <Field
                            component={RadioButton}
                            name={`membersPostulations.${i}.gruint_victim`}
                            id="si"
                            label="Si"
                        />

                        <Field
                            component={RadioButton}
                            name={`membersPostulations.${i}.gruint_victim`}
                            id="no"
                            label="No"
                        />
                    </div>
                    <ErrorMessage name={`membersPostulations.${i}.gruint_victim`} />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="radiogrou_disability_id" className="form-label mb-4 label-landing">
                        ¿Presenta algún tipo de discapacidad?
                    </label>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '50%',
                        }}
                    >
                        <Field
                            component={RadioButton}
                            name={`membersPostulations.${i}.gruint_disability`}
                            id="si"
                            label="Si"
                        />
                        <Field
                            component={RadioButton}
                            name={`membersPostulations.${i}.gruint_disability`}
                            id="no"
                            label="No"
                        />
                    </div>

                    <ErrorMessage name={`membersPostulations.${i}.gruint_disability`} />
                </div>
            </div>
        </div>
    );
};

export default FormTeam;
