import { FieldArray, Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { LinkButton } from '../../../utils/ui/Link';
import FormTeam from './FormTeam';

interface FormIProps {
    postulation?: any;
    innerRef: any;
    onSubmit: (values: any, actions: any) => any;
}

const FormArrayTeam: FC<FormIProps> = ({ innerRef, onSubmit, postulation }) => {
    const initial_values = {
        membersPostulations: postulation
            ? postulation
            : [
                  {
                      gruint_names: '',
                      gruint_type_document: null,
                      gruint_document: '',
                      gruint_sex: null,
                      gruint_identity: null,
                      gruint_orientation_sexual: null,
                      gruint_ethnicity: null,
                      gruint_victim: '',
                      gruint_disability: '',
                  },
                  {
                      gruint_names: '',
                      gruint_type_document: null,
                      gruint_document: '',
                      gruint_sex: null,
                      gruint_identity: null,
                      gruint_orientation_sexual: null,
                      gruint_ethnicity: null,
                      gruint_victim: '',
                      gruint_disability: '',
                  },
                  {
                      gruint_names: '',
                      gruint_type_document: null,
                      gruint_document: '',
                      gruint_sex: null,
                      gruint_identity: null,
                      gruint_orientation_sexual: null,
                      gruint_ethnicity: null,
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
        }
    }

    const removeForm = (setValues: any, index_remove: number) => {
        setValues((data: any) => {
            return {
                membersPostulations: data?.membersPostulations?.filter(
                    (value: any, index: number) => index !== index_remove
                ),
            };
        });
    };
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
                                        <div className="row">
                                            <div
                                                className="col"
                                                style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14px' }}
                                            >{`Participante ${i + 1}`}</div>
                                            {i > 1 && (
                                                <div
                                                    className="col"
                                                    style={{ textAlign: 'end', color: 'rgb(173, 8, 8)' }}
                                                    onClick={() => removeForm(setValues, i)}
                                                >
                                                    <i className="fa fa-times" aria-hidden="true" />
                                                    <span> eliminar </span>
                                                </div>
                                            )}
                                        </div>
                                        <hr />

                                        <FormTeam key={i} handleChange={handleChange} i={i} />
                                    </>
                                ))
                            }
                        </FieldArray>
                        {values?.membersPostulations?.length < 5 && (
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <LinkButton
                                    className="my-5"
                                    color="#FF8403"
                                    onClick={() => onChangeTickets(values, setValues)}
                                    name="Agegar otro participante"
                                    iconText="+"
                                    avatar
                                />
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormArrayTeam;
