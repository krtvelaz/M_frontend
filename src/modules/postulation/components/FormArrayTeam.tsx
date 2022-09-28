import { FieldArray, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import FormTeam from './FormTeam';

interface FormIProps {
    postulation?: any
    innerRef: any;
    onSubmit: (values: any, actions: any) => any;
}

const FormArrayTeam: FC<FormIProps> = ({innerRef, onSubmit, postulation }) => {

    const [buttonVisible, setButtonVisible] = useState<boolean>(true);

    const initial_values = {
        membersPostulations: postulation ? postulation : [
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
            {
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            },
        ],
    };
    const schema = Yup.object().shape({
        membersPostulations: Yup.array().of(
            Yup.object().shape({
                gruint_names: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres'),
                gruint_type_document: Yup.string().nullable().required('Campo obligatorio'),
                gruint_document: Yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres'),
                gruint_sex: Yup.string().nullable().required('Campo obligatorio'),
                gruint_identity: Yup.string().nullable().required('Campo obligatorio'),
                gruint_orientation_sexual: Yup.string().nullable().required('Campo obligatorio'),
                gruint_ethnicity: Yup.string().nullable().required('Campo obligatorio'),
                gruint_victim: Yup.string().required('Campo obligatorio'),
                gruint_disability: Yup.string().required('Campo obligatorio'),
            })
        ),
    });

    
    function onChangeTickets(values: any, setValues: any) {
        if (values.membersPostulations.length <= 4) {
            const membersPostulations = [...values.membersPostulations];
            membersPostulations.push({
                gruint_names: '',
                gruint_type_document: '',
                gruint_document: '',
                gruint_sex: '',
                gruint_identity: '',
                gruint_orientation_sexual: '',
                gruint_ethnicity: '',
                gruint_victim: '',
                gruint_disability: '',
            });
            setValues({ ...values, membersPostulations });
            values.membersPostulations.length === 4 && setButtonVisible(false);
        }
    }
    return (
        <Formik
            enableReinitialize
            // onSubmit={submit}
            onSubmit={onSubmit}
            innerRef={innerRef}
            validationSchema={schema}
            initialValues={initial_values}
        >
            {({ handleChange, values, setValues }) => {
                return (
                    <Form>
                        <FieldArray name="membersPostulations">
                            {() =>
                                values.membersPostulations.map((data: any, i: number) => (
                                    <>
                                    <div style={{fontFamily: 'Montserrat-SemiBold', fontSize: '14px'}}>{`Participante ${i+1}`}</div>
                                    <hr />
                                    <FormTeam key={i} handleChange={handleChange} i={i} />
                                    </>
                                    
                                ))
                            }
                        </FieldArray>
                        {buttonVisible && (
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <span style={{ padding: '2%', color: '#FF8403' }}>Agegar otro participante</span>
                                <button
                                    type="button"
                                    onClick={() => onChangeTickets(values, setValues)}
                                    style={{
                                        borderRadius: '50%',
                                        color: 'white',
                                        backgroundColor: '#FF8403',
                                        border: 'aliceblue',
                                        width: '3%',
                                        height: '0%',
                                        marginTop: '1%',
                                        fontFamily: 'Monserrat',
                                        fontSize: '19px',
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormArrayTeam;
