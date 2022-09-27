import { TimeRangePickerProps } from 'antd';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { FC } from 'react';
import * as Yup from 'yup';
import { ErrorMessage } from '../../../../utils/ui';
import DateInput from '../../../../utils/ui/DateInput';

interface IPros {
    disabled?: boolean;
    innerRef: any;
    onSubmit: (values: any) => any;
}

const FormExport: FC<IPros> = ({ onSubmit, innerRef, disabled }) => {
    const initialValues = {
        start_date: '',
        end_date: '',
    };

    const schema = Yup.object().shape({
        start_date: Yup.string().required('Campo obligatorio'),
        end_date: Yup.string().required('Campo obligatorio'),
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
            {({ values }) => {
                const disabledDate: TimeRangePickerProps['disabledDate'] = (current) => {
                    return current && current < moment(values?.start_date).endOf('day');
                };
                const disabledDateStart: TimeRangePickerProps['disabledDate'] = (current) => {
                    return current && current > moment(values?.end_date).endOf('day');
                };
                return (
                    <Form>
                        <div className="row w-100">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="fecha_inicio_id" className="form-label">
                                    Desde
                                </label>
                                <Field
                                    component={DateInput}
                                    name="start_date"
                                    id="fecha_inicio_id"
                                    disabledDate={disabledDateStart}
                                />

                                <ErrorMessage name="start_date" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="fecha_final_id" className="form-label">
                                    Hasta
                                </label>
                                <Field
                                    component={DateInput}
                                    name="end_date"
                                    id="fecha_final_id"
                                    disabledDate={disabledDate}
                                />
                                <ErrorMessage name="end_date" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormExport;
