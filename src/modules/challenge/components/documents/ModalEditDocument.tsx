import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pencil } from '../../../../utils/assets/img';
import { IChallenge, IDocument } from '../../custom_types';
import { actions } from '../../redux';
import FormAddDocument from './FormAddDocument';

interface ModalPros {
    typeDoc?: 'general' | 'admin' | 'technicians' | '';
    doc: IDocument;
    typesDocument: any[];
    onEdit: (values: IDocument) => void;
}
const ModalEditDocument: FC<ModalPros> = ({ typeDoc, doc, typesDocument, onEdit }) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => {
        set_is_visible(false);
        form_ref.current?.resetForm();
    };
    const form_ref = useRef<FormikProps<FormikValues>>();
    const loading_form: boolean = useSelector((store: any) => store.challenge.document_challenge.loading);

    const onEditDocument = async (values: IDocument) => {
        await onEdit(values);
        set_is_visible(false);
    };

    return (
        <>
            <img src={pencil} style={{ cursor: 'pointer' }} onClick={() => open()} className="img-pencil" alt="" />
            <Modal
                visible={is_visible}
                width={1000}
                onCancel={close}
                title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Editar documento</span>}
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                footer={[
                    <button
                        key="saveDoc"
                        type="button"
                        className="btn btn-primary"
                        disabled={loading_form}
                        onClick={() => {
                            form_ref.current?.submitForm();
                        }}
                    >
                        Guardar Cambios
                        {loading_form && (
                            <i
                                className="fa fa-circle-o-notch fa-spin"
                                style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                            />
                        )}
                    </button>,
                ]}
            >
                <FormAddDocument
                    innerRef={form_ref}
                    onSubmit={onEditDocument}
                    type="edit"
                    typeDoc={typeDoc}
                    doc={doc}
                    typesDocument={typesDocument}
                />
            </Modal>
        </>
    );
};

export default ModalEditDocument;
