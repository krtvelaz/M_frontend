import { Modal } from 'antd';
import { useRef, useState } from 'react';
import FormExport from './FormExport';

const ModalExport = () => {
    const [visible, setvisible] = useState<boolean>(false);
    const form_ref = useRef<any>();
    const open = () => setvisible(true);
    const close = () => setvisible(false);
    return (
        <>
            <button type="button" className="btn btn-outline-primary" onClick={open}>
                Exportar Datos
            </button>
            <Modal
                visible={visible}
                width={'660px'}
                onCancel={() => {
                    close();
                }}
                title={<span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Exportar Datos</span>}
                maskStyle={{
                    backgroundColor: 'rgba(6, 100, 144 ,0.71)',
                }}
                footer={[
                    <button disabled={true} key="saveDoc" type="button" className="btn btn-primary">
                        Exportar datos
                    </button>,
                ]}
            >

                <div className='mb-3' style={{fontFamily: 'Work-Sans-Regular', fontSize: '14px'}}>Seleccione un rango de fechas para exportar los datos</div>
                <FormExport innerRef={form_ref} onSubmit={()=>{}} />
            </Modal>
        </>
    );
};

export default ModalExport;
