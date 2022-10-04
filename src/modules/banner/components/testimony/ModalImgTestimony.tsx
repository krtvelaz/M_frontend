import { Dropdown, Menu } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { actions } from '../../redux';
import WatchComponent from '../../../../utils/assets/img/WatchComponent';

interface IModalImage {
    id: number;
}
const ModalImgTestimony: FC<IModalImage> = ({ id }) => {
    const [img, setImg] = useState('');
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    const dispatch = useDispatch<any>();

    const menu = (
        <Menu
            onClick={async (e) => {
                if (e.key === 'image_0') {
                    const res = await dispatch(actions.get_document_testimonial(id, 'image'));
                    if (res) {
                        let _img = Buffer.from(res).toString('base64');
                        setImg(_img);
                        open();
                    }
                    return;
                }
                const res = await dispatch(actions.get_document_testimonial(id, 'logo'));
                if (res) {
                    let _img = Buffer.from(res).toString('base64');
                    setImg(_img);
                    open();
                }
            }}
            items={[
                {
                    label: 'Imagen Empresario',
                    key: 'image_0',
                },
                {
                    label: 'Imagen Logo',
                    key: 'image_1',
                },
            ]}
        />
    );

    return (
        <>
            <Dropdown overlay={menu} trigger={['click']}>
                <div>
                    <WatchComponent />
                </div>
            </Dropdown>

            <Modal
                visible={is_visible}
                width={751}
                onCancel={close}
                title={
                    <span style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '16px' }}>Previsualizar documento</span>
                }
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
                    <img src={`data:image/jpeg;charset=utf-8;base64,${img}`} alt="img" />
                </div>
            </Modal>
        </>
    );
};

export default ModalImgTestimony;
