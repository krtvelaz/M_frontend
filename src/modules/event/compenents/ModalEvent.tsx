import { Modal } from 'antd';
import { FormikProps, FormikValues } from 'formik';
import { useRef, useState } from 'react';

const ModalEvent = () => {
    const form_ref = useRef<FormikProps<FormikValues>>();
    const [visible, setvisible] = useState<boolean>(false);
    const open = () => setvisible(true);
    const close = () => setvisible(false);
    return (
        <>
        <button className="btn btn-landing-primary me-3" onClick={open}>Asistiré</button>
        <Modal
            visible={visible}
            width={1000}
            onCancel={() => {
                form_ref.current?.resetForm();
                close();
            }}
            title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Formulario de asisitencia</span>}

            footer={[

            ]}
        >
            <iframe src="https://forms.office.com/r/qBLYjsgrm8" width="100%" height="350" >Cargando…</iframe>
        </Modal>
        </>
    );
};

export default ModalEvent;
