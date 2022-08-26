import { Modal } from 'antd';
import { FC } from 'react';

interface DocumetFormProps {
    url: string;
    open: boolean;
    setOpen: any;
    fileType?: 'pdf' | 'img';
}

const ModalDetailDocument: FC<DocumetFormProps> = ({ url, open, setOpen, fileType }) => {
    const close = () => setOpen(false);
    return (
        <Modal
            visible={open}
            width={751}
            onCancel={close}
            title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Previsualizar documento</span>}
            maskStyle={{
                backgroundColor: 'rgba(6, 100, 144 ,0.71)',
            }}
            footer={[
                <button
                    key="saveDoc"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        close();
                    }}
                >
                    Aceptar
                </button>,
            ]}
        >
            <div>
                {fileType === 'pdf' ? (
                    <embed src={`${url}#toolbar=0`} width="100%" height="375px" />
                ) : (
                    <img src={`data:image/jpeg;charset=utf-8;base64,${url}`} alt="img" />
                )}
            </div>
        </Modal>
    );
};

ModalDetailDocument.defaultProps = {
    fileType: 'pdf',
};

export default ModalDetailDocument;
