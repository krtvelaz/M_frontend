import { Field } from 'formik';
import { ErrorMessage } from '../../../utils/ui';
import CardDocsPostulation from './CardDocsPostulation';
import { FC } from 'react';
interface PostulationTeamFormPros {
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void;
    };
    i: number;
    postulation?: any;
    setPostulation?: any;
}

const FormDocumentsPostulation: FC<PostulationTeamFormPros> = ({ i, postulation, setPostulation }) => {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <Field
                    component={CardDocsPostulation}
                    postulation={postulation}
                    setPostulation={setPostulation}
                    id="name_id"
                    name={`documents.${i}`}
                />
                <ErrorMessage name={`documents.${i}.docPostulation.name`} />
            </div>
        </>
    );
};

export default FormDocumentsPostulation;
