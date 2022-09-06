import { FormikProps, FormikValues } from 'formik';
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../../utils/ui';
import { IDocument } from '../../custom_types';
import FormAddDocument from './FormAddDocument';
import TableDocs from './TableDocs';

interface DocsFormPros {
    typesDocument: any[];
    onAddDocument: (values: IDocument) => void;
    onDelete: (index: number) => void;
    onEditDocument: (values: IDocument) => void;
    typeDoc: 'general' | 'admin' | 'technicians' | '';
    title: string;
}
const AddDocument: FC<DocsFormPros> = ({ typesDocument, onAddDocument, onDelete, onEditDocument, typeDoc, title }) => {
    const documents: any = useSelector((store: any) => store.challenge.documents_challenge.value);

    const loading: boolean = useSelector((store: any) => store.challenge.documents_challenge.loading);
    const loading_form: boolean = useSelector((store: any) => store.challenge.document_challenge.loading);
    const form_ref = useRef<FormikProps<FormikValues>>();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <Card
                        title={
                            <>
                                <span style={{ fontSize: '14px' }}>{title}</span>
                            </>
                        }
                        actions={[
                            <div className="d-flex justify-content-end" style={{ padding: '20px' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    disabled={loading_form}
                                    onClick={() => {
                                        form_ref.current?.submitForm();
                                    }}
                                >
                                    Agregar documento
                                    {loading_form && (
                                        <i
                                            className="fa fa-circle-o-notch fa-spin"
                                            style={{ fontSize: 12, marginLeft: 4, color: '#603CE6' }}
                                        />
                                    )}
                                </button>
                            </div>,
                        ]}
                    >
                        <FormAddDocument
                            innerRef={form_ref}
                            onSubmit={onAddDocument}
                            typeDoc={typeDoc}
                            type="create"
                            typesDocument={typesDocument}
                        />
                    </Card>
                    {documents.length > 0 && (
                        <Card>
                            <span className="my-3" style={{ fontSize: '14px' }}>
                                Documentos agregados
                            </span>
                            <TableDocs
                                documents={documents}
                                onDelete={onDelete}
                                onEdit={onEditDocument}
                                typeDoc={typeDoc}
                                typesDocument={typesDocument}
                                loading={loading}
                            />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddDocument;
