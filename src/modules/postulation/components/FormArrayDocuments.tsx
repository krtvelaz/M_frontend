import { FieldArray, Form, Formik } from 'formik';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormDocumentsPostulation from './FormDocumentsPostulation';

interface IProps {
    postulation?: any;
    setPostulation?: any;
    innerRef: any;
    onSubmit: (values: any, actions: any) => any;
}

const FormArrayDocuments: FC<IProps> = ({ innerRef, onSubmit, postulation, setPostulation  }) => {
    const _documents: any[] = useSelector((store: any) => store.postulation.challenge.value);

    const initial_values = {
        documents: Array.isArray(_documents)
            ? _documents.map((doc) => {
                  return {
                      ...doc,
                      docPostulation: {
                          name: '',
                      },
                  };
              })
            : [],
    };

    const submit = async (values: any, actions: any) => {
        await onSubmit(values, actions);
    };

    const schema = Yup.object().shape({
        documents: Yup.array().of(
            Yup.object().shape({
                docPostulation: Yup.object({
                    name: Yup.string().required('Documento requerido'),
                }).nullable(),
            })
        ),
    });

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            innerRef={innerRef}
            validationSchema={schema}
            initialValues={initial_values}
        >
            {({ handleChange, values, setValues, errors, touched }) => {
                return (
                    <Form>
                        <div className="row">
                            <FieldArray name="membersPostulations">
                                {() => (
                                    <>
                                        <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>
                                            Documentos técnicos
                                        </span>
                                        <hr />
                                        {values.documents?.map((data: any, i: number) => {
                                            if (data.retdoc_tipo_formulario === 2) {
                                                return (
                                                    <FormDocumentsPostulation
                                                        key={`documents-postulation-tecnic-${i}`}
                                                        postulation={postulation}
                                                        handleChange={handleChange}
                                                        setPostulation={setPostulation}
                                                        i={i}
                                                    />
                                                );
                                            }
                                        })}
                                        <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '15px' }}>
                                            Documentos administrativos
                                        </span>
                                        <hr />
                                        {values.documents?.map((data: any, i: number) => {
                                            if (data.retdoc_tipo_formulario === 3) {
                                                return (
                                                    <FormDocumentsPostulation
                                                        key={`documents-postulation-admin-${i}`}
                                                        postulation={postulation}
                                                        handleChange={handleChange}
                                                        setPostulation={setPostulation}
                                                        i={i}
                                                    />
                                                );
                                            }
                                        })}
                                    </>
                                )}
                            </FieldArray>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormArrayDocuments;
